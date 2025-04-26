import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Colors from '@/constants/Colors';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    useFonts,
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  } from '@expo-google-fonts/inter';
  import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from 'expo-router';

export default function ProfileScreen() {
    const [name, setName] = useState("");
    const [numberItems, setNumberItems] = useState(0);
    const navigation = useNavigation();

    let [fontsLoaded] = useFonts({
        Inter_100Thin,
        Inter_200ExtraLight,
        Inter_300Light,
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
        Inter_700Bold,
        Inter_800ExtraBold,
        Inter_900Black,
    });

    const fetchName = async () => {
        const token = await AsyncStorage.getItem('token');
        try {
          const response = await axios.post("http://127.0.0.1:5001/get-name", {}, {
            headers: {
              Authorization: token,
            },
          });
          setName(response.data.name);
        } catch (error) {
          console.error("Error fetching name:", error.response?.data || error.message);
        }
    };
    
    const fetchNumberOfItems = async () => {
      const token = await AsyncStorage.getItem('token');
      try {
        const response = await axios.post("http://127.0.0.1:5001/get-item", {}, {
          headers: {
            Authorization: token,
          },
        });
    
        let number = 0;
        const items = response.data.name;
    
        if (Array.isArray(items)) {
          for (let i = 0; i < items.length; i++) {
            const qty = items[i].quantity;
            if (typeof qty === 'number' && !isNaN(qty)) {
              number += qty;
            }
          }
        }
    
        setNumberItems(number);
      } catch (error) {
        console.error("Error fetching quantity:", error.response?.data || error.message);
      }
    }

    const handleSignOut = async () => {
        try {
            const response = await axios.post("http://127.0.0.1:5001/signout", {}, {
                headers: {
                    Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
                }
            });
            console.log(response.data);
            await AsyncStorage.removeItem('token');
            navigation.navigate('two')
        } catch (error) {
            console.error("Error fetching sign out:", error.response?.data || error.message);
        }
    }

    useEffect(() => {
        fetchName();
        fetchNumberOfItems();
    }, []);

    return (
        <View style={styles.container}>
        <View style={styles.profilePicture}/>
        <Text style={styles.profileText}>{name}</Text>
        <View style={styles.totalItemsBox}>
            <Text style={styles.totalItemsBoxText}>{numberItems}</Text>
            <Text style={[styles.totalItemsBoxText, {fontSize: 15}]}>Total Items</Text>
        </View>
        <View style={styles.boxContainer}>
            <Text style={styles.boxText}>Edit Profile</Text>
        </View>
        <View style={styles.boxContainer}>
            <Text style={styles.boxText}>History</Text>
        </View>
        <Pressable onPress={handleSignOut}>
            <View style={{
                marginTop: 20,
                borderRadius: 20,
                backgroundColor: Colors.light.sagegreen,
                justifyContent: 'center',
                alignItems: 'center',
                width: 320,
                height: 50,
            }}>
                <Text style={styles.boxText}>Logout</Text>
            </View>
        </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,           // Fills the whole screen
    justifyContent: 'center',  // Centers vertically
    alignItems: 'center',      // Centers horizontally
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    color: '#333',
  },
  profilePicture: {
    borderRadius: 100,
    height: 134,
    width: 134,
    backgroundColor: Colors.light.gray,
  },
  profileText: {
    marginTop: 20,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.light.sagegreen,
    fontSize: 30,
  },
  totalItemsBox: {
    backgroundColor: Colors.light.orangeyellow,
    width: 250,
    height: 76,
    borderRadius: 20,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  totalItemsBoxText: {
    color: 'white',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 30,
  },
  boxContainer: {
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: Colors.light.gray,
    justifyContent: 'center',
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
