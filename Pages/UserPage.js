import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';

const UserPage = ({ token, onSignOut }) => {
  const [userName, setUserName] = useState('');
        console.log('userPage Token: ', token)

  useEffect(() => {
    fetchUserInformation();
  }, []);

  const fetchUserInformation = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const {user} = response.data;
      setUserName(user.firstName);
    } catch (error) {
      console.error('Failed to fetch user information', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Welcome, {userName}</Text>
        <Button title="Sign Out" onPress={onSignOut} />
      </View>
    </View>
  );
};

export default UserPage;
