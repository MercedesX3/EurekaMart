import React, { useState, useRef, useEffect} from 'react';
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

const IntoleranceDropDown = ({ style }: PopupProps) => {
    const [word, setWord] = useState("");
    const [open, setOpen] = useState(true);
    const [isEnabled, setIsEnabled] = useState(false);
    const [selectedIntolerances, setSelectedIntolerances] = useState<string[]>([]);
    const intolerances = ["Dairy", "Egg", "Gluten", "Grain", "Peanut", "Seafood", "Sesame", "Shellfish", "Soy", "Sulfite", "Tree Nut", "Wheat"];
    const [switchStates, setSwitchStates] = useState<boolean[]>(
        Array(intolerances.length).fill(false)
      );
    const popupHeight = useRef(new Animated.Value(55)).current;

    const toggleSwitch = (index: number) => {
        setSwitchStates(prevStates => {
          const newStates = [...prevStates];
          newStates[index] = !newStates[index];
      
          setSelectedIntolerances(prev => {
            if (newStates[index]) {
              return [...prev, intolerances[index]];
            } else {
              return prev.filter(d => d !== intolerances[index]);
            }
          });
      
          return newStates;
        });
      };
    
    const toggleShape = () => {
        Animated.parallel([
          Animated.timing(popupHeight, {
            toValue: open ? 490 : 50,
            duration: 300,
            useNativeDriver: false,
          }),
        ]).start(() => {
          setOpen(!open);
        });
    };

    const saveIntolerances = async () => {
      const token = await AsyncStorage.getItem('token');
      try {
        const response = await axios.post("http://127.0.0.1:5001/set-intolerances", {
          selectedIntolerances,
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
      saveIntolerances();
    }, [toggleSwitch]);

    return (
        <TouchableWithoutFeedback onPress={toggleShape}>
        <Animated.View style={[styles.boxContainer, {
              height: popupHeight,
              justifyContent: open ? 'center' : 'flex-start', // <== CONDITIONAL
              paddingTop: open ? 0 : 20,
            }]}>
            {open && <Text style={styles.boxText}>Edit Intolerances</Text>}
            {!open && 
            <View>
                {intolerances.map((intolerance, index) => (
                    <View key={index} style={{flexDirection: 'row', justifyContent: 'space-between', paddingRight: 20, marginBottom: 20, alignItems: 'center'}}>
                        <Text style={styles.boxText}>
                            {intolerance}
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

export default IntoleranceDropDown;

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