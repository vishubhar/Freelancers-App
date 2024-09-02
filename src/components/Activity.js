import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {actionIcons, color} from '../Constant/constants'; // Importing custom icons

const AccountDetailTab = () => {
  return (
    <View style={styles.container}>
      {/* Greeting Section */}
      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>You're doing well!</Text>
      </View>
      {/* Activity Meter Section */}
      <View style={styles.activityMeterContainer}>
        <Text style={styles.activityMeterTitle}>Activity Meter</Text>
        <View style={styles.activityBar}>
          <View style={styles.activityProgress} />
        </View>
        <Text style={styles.activityMeterText}>70% Active</Text>
      </View>

      {/* Connections and Requests Section */}
      <View style={styles.infoContainer}>
        <View style={styles.infoBox}>
          <Image source={actionIcons.Profile} style={styles.iconStyle} />
          <Text style={styles.infoText}>Connections: 120</Text>
        </View>
        <View style={styles.infoBox}>
          <Image source={actionIcons.Adduser} style={styles.iconStyle} />
          <Text style={styles.infoText}>Friend Requests Sent: 45</Text>
        </View>
      </View>

      {/* Notifications Section */}
      <TouchableOpacity style={styles.notificationContainer}>
        <Image source={actionIcons.Notification} style={styles.NiconStyle} />
        <Text style={styles.notificationText}>5 New Notifications</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  greetingContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: color.Blue,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  infoBox: {
    alignItems: 'center',
  },
  iconStyle: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  NiconStyle: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    marginRight: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  notificationText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#555',
  },
  activityMeterContainer: {
    marginTop: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  activityMeterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#444',
  },
  activityBar: {
    width: '80%',
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  activityProgress: {
    width: '70%', // Adjust this value for the activity percentage
    height: '100%',
    backgroundColor: '#4caf50',
  },
  activityMeterText: {
    marginTop: 10,
    fontSize: 14,
    color: '#777',
  },
});

export default AccountDetailTab;
