import React, { useState } from 'react';
import { TouchableOpacity, View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(){
    axios.post("http://127.0.0.1:5001/register",)
    const userData={
      name: name,
      email: email,
      password: password,
    };

    axios 
    .post("http://localhost:5001/register", userData)
    .then(res => console.log(res.data))
    .catch(e => console.log(e));
  }

  const handleSignUpPress = () => {
    navigation.navigate('signup');  // Navigate to the SignUp screen
  };

  return (
    <View style={styles.container}>
      <View style={{paddingVertical: 50}}>
        <Text style={styles.title}>Eureka Mart</Text>
      </View>
      <View style={styles.greenBox}>
      <Text style={[styles.title, {fontSize: 30, color: 'white', marginBottom: 50}]}>Sign Up</Text>
      <View style={styles.inputBox}>
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
        />
      </View>
      <View style={styles.inputBox}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      </View>
      <View style={styles.inputBox}>
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      </View>

      <View style={{backgroundColor: 'none', flexDirection: 'row', paddingVertical: 20}}>
      <Text style={[styles.inputText, {color: 'white'}]}>Don't have an account? </Text>
          <TouchableOpacity onPress={handleSignUpPress}>
            <Text style={[styles.inputText, { color: '#F9C784' }]}>Sign Up</Text>
          </TouchableOpacity>
      </View>

      <View style={[styles.inputBox, {backgroundColor: '#F9C784', borderWidth: 0, alignItems: 'center'}]}>
        <Button 
          title={isLoading ? "Loading..." : "Sign Up"} 
          onPress={handleSubmit} 
          disabled={isLoading}
          color={'white'}
        />
      </View>
      {message ? (
        <Text style={styles.message}>{message}</Text>
      ) : null}
      </View>
      
    </View>
  );
};

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
buttonContainer: {
    marginVertical: 10,
},
message: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    textAlign: 'center',
}
});


export default SignUpScreen;