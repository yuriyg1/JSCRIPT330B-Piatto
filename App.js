import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import SignInPage from './Pages/SignInPage';
import CreateAccountPage from './Pages/CreateAccountPage';
import NavigationBar from './Pages/NavigationBar';
import UserPage from './Pages/UserPage';
import StarPage from './Pages/StarPage';
import FavPage from './Pages/FavPage';
import SearchPage from './Pages/SearchPage';

const App = () => {
  const [token, setToken] = useState(null);
  const [isSignInPage, setIsSignInPage] = useState(true);
  const [isSignUpPage, setIsSignUpPage] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [content, setContent] = useState(null);

  const handleSignIn = async (jwtToken) => {
    setToken(jwtToken);
    setIsSignInPage(false);
    setIsSignUpPage(false);
    setIsLoggedIn(true);
  };

  const handleSignOut = async () => {
    setToken(null);
    setIsSignInPage(true);
    setIsLoggedIn(false);
  };

  const handleGoToCreateAccount = () => {
    setIsSignInPage(false);
    setIsSignUpPage(true);
  };

  const handleGoBack = () => {
    setIsSignInPage(true);
    setIsSignUpPage(false);
  };

  const handleIconSelect = (selectedIcon) => {
    switch (selectedIcon) {
      case 'user':
        setContent(<UserPage token={token} onSignOut={handleSignOut} />);
        break;
      case 'star':
        setContent(<StarPage token={token} />);
        break;
      case 'heart':
        setContent(<FavPage token={token} />);
        break;
      case 'search':
        setContent(<SearchPage token={token} />);
        break;
      default:
        setContent(<UserPage token={token} onSignOut={handleSignOut} />);
        break;
    }
  };

  return (
    <View style={styles.container}>
      {isSignInPage && (
        <SignInPage onSignIn={handleSignIn} onCreateAccount={handleGoToCreateAccount} />
      )}
      {isSignUpPage && (
        <CreateAccountPage onSignIn={handleSignIn} onGoBack={handleGoBack} />
      )}

      <View style={styles.contentContainer}>
        {isLoggedIn && token && content}
      </View>
  
      {/* Absolute position the navigation bar at the bottom */}
      {isLoggedIn && token && <NavigationBar onIconSelect={handleIconSelect} style={styles.navigationBar} />}
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    paddingTop: 20,
  },
  contentContainer: {
    flex: 1,
    marginTop: 20,
  },
  navigationBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginTop: 20,
  },
});

export default App;