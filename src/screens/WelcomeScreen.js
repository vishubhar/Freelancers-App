import React from 'react';
import {View, Text, StyleSheet, ImageBackground, Button} from 'react-native';
import {iconMap} from '../Constant/constants';

const WelcomeScreen = ({navigation}) => {
  return (
    <ImageBackground
      source={iconMap.Background}
      style={styles.background}
      blurRadius={5}>
      <View style={styles.overlay}>
        <Text style={styles.text}>Welcome Freelancers!</Text>
        <Button
          title="Get Started"
          onPress={() => navigation.navigate(' ')}
          color="#1E90FF"
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  text: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default WelcomeScreen;
