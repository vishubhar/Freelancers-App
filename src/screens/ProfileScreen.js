import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import {actionIcons} from '../Constant/constants';

const ProfileScreen = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [image, setImage] = useState(null);
  const navigation = useNavigation();

  const handleImageChange = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorCode);
        } else {
          setImage(response.assets[0].uri);
        }
      },
    );
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  if (!loggedIn) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.message}>No Account Logged In</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setLoggedIn(true)}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleImageChange}
        style={styles.imageContainer}>
        <Image
          source={image ? {uri: image} : require('../assets/icons/Profile.png')}
          style={styles.profileImage}
        />
      </TouchableOpacity>

      <Text style={styles.infoText}>vishubhardwaj1922@gmail.com</Text>
      <Text style={styles.infoText}>+91-8373930017</Text>
      <Text style={styles.infoText}>Ghaziabad, India, 201002</Text>

      <View style={styles.premiumBanner}>
        <Image source={actionIcons.Crown} style={styles.crownIcon} />
        <Text style={styles.premiumText}>Go Premium! Unlock New Offers</Text>
        <TouchableOpacity
          style={styles.premiumButton}
          onPress={() => navigation.navigate('GoPremium')}>
          <Text style={styles.premiumButtonText}>View</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.accountTab}
        onPress={() => navigation.navigate('Account Activity')}>
        <Image source={actionIcons.AccountDetails} style={styles.tabIcon} />
        <Text style={styles.tabText}>Account Activity</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.accountTab}
        onPress={() => navigation.navigate('Account Privacy')}>
        <Image source={actionIcons.AccountPrivacy} style={styles.tabIcon} />
        <Text style={styles.tabText}>Account Privacy</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.accountTab}
        onPress={() => navigation.navigate('Professional Details')}>
        <Image
          source={actionIcons.ProfessionalDetails}
          style={styles.tabIcon}
        />
        <Text style={styles.tabText}>Professional Details</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.settingsTab}
        onPress={() => navigation.navigate('Settings')}>
        <Image source={actionIcons.Settings} style={styles.tabIcon} />
        <Text style={styles.tabText}>Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingsTab} onPress={handleLogout}>
        <Image source={actionIcons.LogOut} style={styles.tabIcon} />
        <Text style={styles.tabText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  message: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#001f3f',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginVertical: 5,
  },
  premiumBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#001f3f',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  crownIcon: {
    width: 20,
    height: 20,
    tintColor: '#FFD700',
  },
  premiumText: {
    color: '#ffffff',
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
    marginLeft: -15,
  },
  premiumButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  premiumButtonText: {
    color: '#001f3f',
    fontWeight: 'bold',
  },
  accountTab: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsTab: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  tabText: {
    fontSize: 16,
    color: '#333',
  },
});

export default ProfileScreen;
