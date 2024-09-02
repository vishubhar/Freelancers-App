import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {actionIcons, iconMap} from '../Constant/constants';

const GoPremiumTab = () => {
  return (
    <ImageBackground source={iconMap.Background} style={styles.background}>
      <View style={styles.container}>
        <Image source={actionIcons.Crown} style={styles.icon} />
        <Text style={styles.title}>Unlock All Features with Premium</Text>

        <View style={styles.plansContainer}>
          <View style={styles.plan}>
            <Text style={styles.planText}>Monthly</Text>
            <Text style={styles.planPrice}>$9.99</Text>
          </View>
          <View style={styles.plan}>
            <Text style={styles.planText}>Yearly</Text>
            <Text style={styles.planPrice}>$99.99</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.upgradeButton}>
          <Text style={styles.upgradeButtonText}>Upgrade Now</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    borderRadius: 8,
  },
  container: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 8,
    padding: 20,
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: '#FFD700',
  },
  title: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  plansContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  plan: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderColor: '#001f3f',
    borderWidth: 1,
    padding: 15,
    width: '40%',
    alignItems: 'center',
  },
  planText: {
    color: '#001f3f',
    fontWeight: 'bold',
  },
  planPrice: {
    color: '#001f3f',
    fontSize: 16,
    marginTop: 5,
  },
  upgradeButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  upgradeButtonText: {
    color: '#001f3f',
    fontWeight: 'bold',
  },
});

export default GoPremiumTab;
