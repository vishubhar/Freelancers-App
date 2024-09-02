// AccountPrivacyTab.js
import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {actionIcons} from '../Constant/constants';

const AccountPrivacyTab = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={actionIcons.AccountPrivacy} style={styles.icon} />
      <View style={styles.info}>
        <Text style={styles.title}>Account Privacy</Text>
        <Text style={styles.description}>
          Manage your privacy settings and preferences.
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});

export default AccountPrivacyTab;
