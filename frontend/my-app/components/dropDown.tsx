import React, { useState, useRef, useEffect } from 'react';
import {
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  ViewStyle,
  Text,
  Switch,
  SafeAreaView,
} from 'react-native';
import Colors from '@/constants/Colors';
import { Circle } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import {
    Inter_600SemiBold,
  } from '@expo-google-fonts/inter';

type PopupProps = {
  style?: ViewStyle | ViewStyle[];
};

const DropDown = ({ style }: PopupProps) => {
    const [word, setWord] = useState("");
    const [open, setOpen] = useState(true);
    const [isEnabled, setIsEnabled] = useState(false);
    const [selectedDiets, setSelectedDiets] = useState<string[]>([]);
    const diets = ["Gluten Free", "Ketogenic", "Vegetarian", "Lacto-Vegetarian", "Ovo-Vegetarian", "Vegan", "Pescetarian", "Paleo", "Primal", "Low FODAPP", "Whole30"];
    const popupHeight = useRef(new Animated.Value(55)).current;
    const [switchStates, setSwitchStates] = useState<boolean[]>(
      Array(diets.length).fill(false)
    ); 

    const toggleSwitch = (index: number) => {
      setSwitchStates(prevStates => {
        const newStates = [...prevStates];
        newStates[index] = !newStates[index];
    
        setSelectedDiets(prevDiets => {
          if (newStates[index]) {
            return [...prevDiets, diets[index]];
          } else {
            return prevDiets.filter(d => d !== diets[index]);
          }
        });
    
        return newStates;
      });
    };
    
    const toggleShape = () => {
        Animated.parallel([
          Animated.timing(popupHeight, {
            toValue: open ? 450 : 50,
            duration: 300,
            useNativeDriver: false,
          }),
        ]).start(() => {
          setOpen(!open);
        });
    };

    const saveDiets = async () => {
      const token = await AsyncStorage.getItem('token');
      try {
        const response = await axios.post("http://127.0.0.1:5001/set-diet", {
          selectedDiets,
        }, {
          headers: {
            Authorization: token,
          }
        });
        console.log(response.data)
      } catch (err) {
        console.log(err);
      }
    };

    useEffect(() => {
      saveDiets();
    }, [toggleSwitch]);

    return (
        <TouchableWithoutFeedback onPress={toggleShape}>
        <Animated.View style={[styles.boxContainer, {
              height: popupHeight,
              justifyContent: open ? 'center' : 'flex-start', // <== CONDITIONAL
              paddingTop: open ? 0 : 20,
            }]}>
            {open && <Text style={styles.boxText}>Edit Diet</Text>}
            {!open && 
            <View>
                {diets.map((diet, index) => (
                    <View key={index} style={{flexDirection: 'row', justifyContent: 'space-between', paddingRight: 20, marginBottom: 20, alignItems: 'center'}}>
                        <Text style={styles.boxText}>
                            {diet}
                        </Text>
                        <View>
                            <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                              <Switch
                                trackColor={{ false: '#767577', true: '#81b0ff' }}
                                thumbColor={switchStates[index] ? '#f5dd4b' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() => toggleSwitch(index)}
                                value={switchStates[index]}
                              />
                            </SafeAreaView>
                        </View>
                    </View>
                ))}
            </View>
            }

        </Animated.View>
        </TouchableWithoutFeedback>
    )
}

export default DropDown;

const styles = StyleSheet.create({
    boxContainer: {
        marginTop: 20,
        borderRadius: 20,
        backgroundColor: Colors.light.gray,
        paddingLeft: 20,
        width: 320,
        height: 50,
    },
    boxText: {
        color: 'white',
        fontFamily: 'Inter_600SemiBold',
        fontSize: 15,
      }
});