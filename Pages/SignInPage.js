import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import styles from '../Stylesheet/SignInPageStyles';
import circleImage from '../assets/circle.png';

const SignInPage = ({ onSignIn, onCreateAccount }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    if (!email || !password) {
      alert('Please fill in all required fields');
      return;
    } else if(email.length > 20 || password.length > 20){
      alert('20 Characters Maximum!');
      return
    }
    axios
      .post('http://localhost:3000/signin', { email, password })
      .then(response => {
        const jwtToken = response.data.token
        onSignIn(jwtToken);
      })
      .catch(error => {
        console.error('Sign-in failed', error);
      });
  };

  const handleCreateAccount = () => {
    onCreateAccount();
  };

  return (
    <View style={styles.container}>
      <Image source={circleImage} style={styles.image} />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <Button title="Sign In" onPress={handleSignIn} />
      <Button title="Create an Account" onPress={handleCreateAccount} />
    </View>
  );
};

export default SignInPage;