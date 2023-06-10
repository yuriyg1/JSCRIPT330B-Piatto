import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const GroupsPage = ({ token, onSignOut }) => {
    const [users, setUsers] = useState([]);
        console.log('userPage Token: ', token)

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users/all/', {
      });
      const {users} = response.data;
        setUsers(users);
    } catch (error) {
      console.error('Failed to fetch user information', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {users.map((user) => (
          <TouchableOpacity key={user._id}>
            <Text style={styles.quoteText}>{user.firstName}</Text>
            <Text style={styles.authorText}>{user.lastName}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    scrollView: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {
      width: '80%',
      marginVertical: 10,
      padding: 20,
      borderRadius: 10,
      backgroundColor: '#f5f5f5',
    },
    quoteText: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    authorText: {
      fontSize: 14,
      color: '#888',
    },
    trashIcon: {
      position: 'absolute',
      bottom: 10,
      right: 10,
    },
  });

export default GroupsPage;