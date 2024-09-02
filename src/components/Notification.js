import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const Notification = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>No notifications here</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  message: {
    fontSize: 18,
    color: '#333',
  },
});

export default Notification;
