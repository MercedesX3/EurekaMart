import React, { useState, useRef } from 'react';
import {
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  ViewStyle,
  Text,
  TextInput,
  Pressable
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

const Popup = ({ style, onSave }: PopupProps) => {
  const [isCircle, setIsCircle] = useState(true);
  const [itemName, setItemName] = useState("");
  const [quantity, setItemQuantity] = useState("");

  const borderRadius = useRef(new Animated.Value(50)).current;
  const popupHeight = useRef(new Animated.Value(55)).current;
  const popupWidth = useRef(new Animated.Value(55)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const toggleShape = () => {
    Animated.parallel([
      Animated.timing(borderRadius, {
        toValue: isCircle ? 50 : 50,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(popupHeight, {
        toValue: isCircle ? 197 : 55,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(popupWidth, {
        toValue: isCircle ? 339 : 55,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(translateY, {
        toValue: isCircle ? -200 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setIsCircle(!isCircle);
    });
  };

  async function saveItems() {
    const token = await AsyncStorage.getItem('token');

    try {
      const response = await axios.post("http://127.0.0.1:5001/add-item", {
        itemName,
        quantity,
      }, {
        headers: {
          Authorization: token,
        }
      });

      if (onSave) onSave();
      console.log("Item added:", response.data);
    } catch (error) {
      console.error("Add item error:", error.response?.data || error.message);
    }
  }

  return (
    <View style={[styles.container, style]}>
      <TouchableWithoutFeedback onPress={toggleShape}>
        <Animated.View
          style={[
            styles.button,
            {
              borderRadius,
              width: popupWidth,
              height: popupHeight,
              transform: [{ translateY }],
            },
          ]}
        >
          {isCircle && (
            <View style={styles.iconContainer}>
              <View style={styles.horizontal} />
              <View style={styles.vertical} />
            </View>
          )}
          {!isCircle && (
            <View>
                <TextInput style={{color: 'white', fontFamily: "Inter_600SemiBold", fontSize: 24}} onChangeText={setItemName}>Item Name</TextInput>
                <TextInput style={{color: 'white', fontFamily: "Inter_600SemiBold", fontSize: 24}} onChangeText={setItemQuantity}>#</TextInput>
                <Pressable onPress={saveItems} style={{backgroundColor: Colors.light.gray, height: 40, width: 111, borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 24, fontFamily: "Inter_600SemiBold"}}>Save</Text>
                </Pressable>
            </View>
          )}
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Popup;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  iconContainer: {
    position: 'absolute',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  horizontal: {
    position: 'absolute',
    width: 24,
    height: 4,
    backgroundColor: 'white',
  },
  vertical: {
    position: 'absolute',
    width: 4,
    height: 24,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: Colors.light.lightSage,
    opacity: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
