import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const CreateAccountPage = ({ onSignIn, onGoBack }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const handleCreateAccount = async () => {
    try {
      if(!firstName || !lastName || !email || !password || !passwordRepeat ){
        alert('All Fields are Required');
        return
      } else if(firstName.length > 20 || lastName.length > 20 || email.length > 20 || password.length > 20 || passwordRepeat.length > 20 ){
        alert('20 Characters Maximum!');
        return
      } else{
        if (password !== passwordRepeat) {
          alert('Passwords do not match!');
          return;
        } else if(!password || password === ' '){
          alert('No Password, or empty!');
          return;
        }
      }
      // Make API call to create account endpoint
      const response = await axios.post('http://localhost:3000/signup', {
        firstName,
        lastName,
        email,
        password
      });
          // console.log('Response: ', response);
      if (response.status === 200) {
        const jwtToken = response.data.jwToken
              console.log('Create Account successful, jwtToken: ', jwtToken);
        onSignIn(jwtToken);
      } else {
        console.log('Create Account failed', response.status);
      }

    } catch (error) {
        if(error.response.status === 409){
          alert('Email Already Exists!');
        } else{
          console.log(error);
        }
    }
  };

  const handleGoBack = () => {
    onGoBack(); // Navigate back to the sign-up page
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        onChangeText={(text) => setFirstName(text)}
        value={firstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        onChangeText={(text) => setLastName(text)}
        value={lastName}
      />
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
      <TextInput
        style={styles.input}
        placeholder="Retype Password"
        onChangeText={(text) => setPasswordRepeat(text)}
        value={passwordRepeat}
        secureTextEntry
      />
      <Button title="Create Account" onPress={handleCreateAccount} />
      <Button title="Back" onPress={handleGoBack} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    marginTop: 20
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 8,
  },
});

export default CreateAccountPage;

