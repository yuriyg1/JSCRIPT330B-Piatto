import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const GroupsPage = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [viewMode, setViewMode] = useState('all');

useEffect(() => {
  fetchNotFollowing();
}, []);

const fetchFollowing = async () => {
  try {
    const response = await axios.get('http://localhost:3000/users/following/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { users } = response.data;
    setUsers(users);
  } catch (error) {
    console.error('Failed to fetch following users', error);
  }
};

const fetchNotFollowing = async () => {
  try {
    const response = await axios.get('http://localhost:3000/users/not-following/',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { users } = response.data;
    setUsers(users);
  } catch (error) {
    console.error('Failed to fetch not following users', error);
  }
};

const handleFollow = async (userId) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/users/follow/',
        { userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { users } = response.data;
      //setUsers(users);
      setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Failed to fetch user information', error);
    }
};

const handleUnfollow = async (userId) => {
  try {
    await axios.post('http://localhost:3000/users/unfollow/', { userId }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    // Remove the unfollowed user from the users state
    setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
  } catch (error) {
    console.error('Failed to unfollow user', error);
  }
};

const toggleViewMode = async (userId) => {
  const newMode = viewMode === 'all' ? 'following' : 'all';
  setViewMode(newMode);

  if (newMode === 'following') {
    fetchFollowing();
  } else {
    fetchNotFollowing();
  }
};

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.viewModeContainer}>
        <TouchableOpacity onPress={toggleViewMode} style={styles.viewModeButton}>
          <Text style={styles.viewModeButtonText}>{viewMode === 'all' ? 'All' : 'Following'}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {users.map((user) => (
          <TouchableWithoutFeedback key={user._id}>
            <View style={styles.card}>
              <Text style={styles.nameText}>
                {user.firstName} {user.lastName}
              </Text>
              <View style={styles.buttonContainer}>
                {viewMode === 'all' ? (
                  <TouchableOpacity
                    onPress={() => handleFollow(user._id)}
                    style={[styles.button, { borderColor: 'blue' }]}
                  >
                    <Text style={[styles.buttonText, { color: 'blue' }]}>Follow</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => handleUnfollow(user._id)}
                    style={[styles.button, { borderColor: 'black' }]}
                  >
                    <Text style={[styles.buttonText, { color: 'black' }]}>Unfollow</Text>
                  </TouchableOpacity>
                )}
                
              </View>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
  
};

const styles = StyleSheet.create({
  viewModeContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  viewModeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#999',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    marginVertical: 10,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  uncard: {
    width: '90%',
    marginVertical: 10,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#fff',
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 6,
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default GroupsPage;
