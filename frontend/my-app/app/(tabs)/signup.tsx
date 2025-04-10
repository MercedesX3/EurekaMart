import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet} from 'react-native';
import axios from 'axios';

const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/signup', {
        name,
        email,
        password,
      });
      setMessage('User signed up successfully!');
    } catch (err) {
      setMessage('Error signing up user');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{marginTop: 100}}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
      <Text>{message}</Text>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 30,
        marginVertical: 10,
    },
})
