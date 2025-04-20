import { StyleSheet, TextInput, TouchableOpacity, Button, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
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
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export default function TabTwoScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const handleSignUpPress = () => {
    navigation.navigate('signup');  // Navigate to the SignUp screen
  };

  async function handleLogin() {

    console.log("Bobby")
    try {
      const response = await axios.post("http://127.0.0.1:5001/login", {
        email,
        password,
      })
      
      if(response.data.status === "ok") {
          await AsyncStorage.setItem('token', response.data.token);
          console.log(response.data.token)
          navigation.navigate('(inside)');
        }
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
    }
  }
  

  return (
    <View style={styles.container}>
      <View style={{paddingVertical: 50}}>
        <Text style={styles.title}>Eureka Mart</Text>
      </View>
      <View style={styles.greenBox}>
        <Text style={[styles.title, {fontSize: 30, color: 'white', marginBottom: 50}]}>Sign In</Text>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.inputText}
            placeholder="Password"
            onChangeText={setPassword}
          />
        </View>
        <Text style={[styles.inputText, {color: '#F9C784'}]}>
          Forgot Password?
        </Text>
        <View style={{backgroundColor: 'none', flexDirection: 'row', paddingVertical: 20}}>
          <Text style={[styles.inputText, {color: 'white'}]}>Don't have an account? </Text>
          <TouchableOpacity onPress={handleSignUpPress}>
            <Text style={[styles.inputText, { color: '#F9C784' }]}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        
        <View style={[styles.inputBox, {backgroundColor: '#F9C784', borderWidth: 0, alignItems: 'center'}]}>
          <Pressable onPress={handleLogin}>
            <Text style={{color: 'white', fontFamily: 'Inter_600SemiBold'}}>Sign In</Text>
          </Pressable>
        </View>

        <View style={[styles.inputBox, {backgroundColor: 'white',alignItems: 'center'}]}>
          <Text style={{color: 'black', fontFamily: 'Inter_600SemiBold'}}> Log in with Google</Text>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',      // Aligns items to the bottom of the container
  },
  title: {
    fontSize: 40,
    fontFamily: "Inter_600SemiBold",
  },
  greenBox: {
    height: '70%',
    width: '100%',
    backgroundColor: '#588981',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: 'center',
    paddingVertical: 40,
  },
  inputBox: {
    height: 51,
    width: '80%',
    borderRadius: 15,
    backgroundColor: '#E4E4E4',
    justifyContent: 'center',
    borderWidth: 2,
    paddingHorizontal: 10,
    borderColor: 'white',
    marginBottom: 30,
  },
  inputText: {
    fontSize: 15,
  },
});
