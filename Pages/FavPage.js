import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import axios from 'axios';

const FavPage = ( token ) => {
  const [sQuote, setsQuote] = useState({});

  useEffect(() => {
    getSavedQuotes(); // Fetch saved quotes when the component mounts
  }, []);

  const getSavedQuotes = () => {
    axios
      .get('http://localhost:3000/quotes/', {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((res) => {
        setsQuote(res.data);
      })
      .catch((e) => {
        console.error('Save quote failed', e);
      });
  };

  const handleDeleteQuote = (quoteId) => {
    axios
      .delete(`http://localhost:3000/quotes/${quoteId}`, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((res) => {
        getSavedQuotes(); // Fetch the updated list of quotes
      })
      .catch((e) => {
        console.error('Failed to delete quote', e);
      });
  };
  

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {sQuote.allQuote && sQuote.allQuote.map((quote, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => handleDeleteQuote(quote._id)}
          >
            <Text style={styles.quoteText}>"{quote.content}"</Text>
            <Text style={styles.authorText}>- {quote.author}</Text>
            <TouchableOpacity
              style={styles.trashIcon}
              onPress={() => handleDeleteQuote(quote._id)}
            >
              <EvilIcons name="trash" size={24} color="#888" />
            </TouchableOpacity>
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

export default FavPage;
