import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import NavigationBar from './NavigationBar';
import axios from 'axios';
import {JWT_SECRET} from '@env';

const secretKey = process.env.JWT_SECRET;

const UserPage = ({ token, onSignOut }) => {

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Welcome to the User Page!</Text>
        <Button title="Sign Out" onPress={onSignOut} />
      </View>
    </View>
  );
};

export default UserPage;