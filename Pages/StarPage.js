import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const StarPage = (token) => {
  const [quote, setQuote] = useState({});
  const [quoteExists, setquoteExists] = useState(false);

  const getQuote = () => {
    axios
      .get('https://api.quotable.io/random')
      .then((res) => {
        setQuote(res.data);
        setquoteExists(true)
      })
      .catch((e) => {
        console.log('Error:', e);
      });
  };

  const saveQuote = () => {
    axios
      .post('http://localhost:3000/quotes/', { quote }, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((res) => {
        setquoteExists(false); 
      })
      .catch((e) => {
        console.log('Save quote failed', e);
      });
  };

return (
  <View style={{ flex: 1 }}>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Get Quote" onPress={getQuote} />
      {quote.content && (
        <TouchableOpacity
          style={styles.card}
          onPress={saveQuote}
        >
          <Text style={styles.quoteText}>"{quote.content}"</Text>
          <Text style={styles.authorText}>- {quote.author}</Text>
        </TouchableOpacity>
      )}
      {quoteExists && <Button title="Save Quote" onPress={saveQuote} />}
    </View>
  </View>
);
};


const styles = StyleSheet.create({
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

export default StarPage;
