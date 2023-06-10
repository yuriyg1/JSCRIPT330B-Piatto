import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { EvilIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';

const NavigationBar = ({ onIconSelect }) => {
  const [selectedIcon, setSelectedIcon] = useState('user');

  const handleIconPress = (iconName) => {
    setSelectedIcon(iconName);
    onIconSelect(iconName); //
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleIconPress('search')}>
        <EvilIcons
          name="search"
          size={40}
          color={selectedIcon === 'search' ? 'blue' : 'black'}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleIconPress('heart')}>
        <Ionicons
          name="heart"
          size={30}
          color={selectedIcon === 'heart' ? 'blue' : 'black'}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleIconPress('star')}>
        <MaterialIcons
          name="star"
          size={34}
          color={selectedIcon === 'star' ? 'blue' : 'black'}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleIconPress('groups')}>
        <MaterialIcons
          name="groups"
          size={40}
          color={selectedIcon === 'groups' ? 'blue' : 'black'}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleIconPress('user')}>
        <EvilIcons
          name="user"
          size={40}
          color={selectedIcon === 'user' ? 'blue' : 'black'}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    height: '10%',
  }
});


export default NavigationBar;
