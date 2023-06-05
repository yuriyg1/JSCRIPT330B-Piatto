import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, ScrollView, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [noneFound, setNoneFound] = useState(false);

  const handleSearch = () => {
    setNoneFound(true)
    axios
      .get(`http://localhost:3000/search/?q=${searchTerm}`)
      .then((response) => {
        setSearchResults(response.data);
      })
      .catch((error) => {
        console.error('Search failed', error);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter search term"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <Button title="Search" onPress={handleSearch} />
  
      <ScrollView style={styles.resultsContainer}>
        {searchResults && searchResults.map((result) => (
          <View key={result._id} style={styles.card}>
            <Text style={styles.quoteText}>{result.content}</Text>
            <Text style={styles.authorText}>- {result.author}</Text>
          </View>
        ))}

        {searchResults.length === 0 && noneFound && (
          <View style={styles.noMatchesContainer}>
            <Text style={styles.noMatchesText}>No Matches Found in Your List</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
  

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  resultsContainer: {
    flex: 1,
  },
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
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
  noMatchesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMatchesText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'grey',
  },
});

export default SearchPage;
