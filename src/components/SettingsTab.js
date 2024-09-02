import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import {actionIcons} from '../Constant/constants';

const SettingsTab = ({navigation}) => {
  // State to manage toggle switches
  const [isNotificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isDarkModeEnabled, setDarkModeEnabled] = useState(false);
  const [isLocationEnabled, setLocationEnabled] = useState(false);

  // Functions to handle toggling switches
  const toggleNotifications = () =>
    setNotificationsEnabled(!isNotificationsEnabled);
  const toggleDarkMode = () => setDarkModeEnabled(!isDarkModeEnabled);
  const toggleLocation = () => setLocationEnabled(!isLocationEnabled);

  return (
    <View style={styles.container}>
      {/* Dark Mode */}
      <View style={styles.settingItem}>
        <Image source={actionIcons.Darkmode} style={styles.icon} />
        <View style={styles.info}>
          <Text style={styles.title}>Dark Mode</Text>
          <Text style={styles.description}>
            Toggle between light and dark themes.
          </Text>
        </View>
        <Switch
          value={isDarkModeEnabled}
          onValueChange={toggleDarkMode}
          style={styles.switch}
        />
      </View>

      {/* Notifications */}
      <View style={styles.settingItem}>
        <Image source={actionIcons.Notification} style={styles.icon} />
        <View style={styles.info}>
          <Text style={styles.title}>Notifications</Text>
          <Text style={styles.description}>
            Enable or disable push notifications.
          </Text>
        </View>
        <Switch
          value={isNotificationsEnabled}
          onValueChange={toggleNotifications}
          style={styles.switch}
        />
      </View>

      {/* Privacy Policy */}
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => navigation.navigate('PrivacyPolicy')}>
        <Image source={actionIcons.pPolicy} style={styles.icon} />
        <View style={styles.info}>
          <Text style={styles.title}>Privacy Policy</Text>
          <Text style={styles.description}>
            Read our privacy policy and terms.
          </Text>
        </View>
      </TouchableOpacity>

      {/* Language Settings */}
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => navigation.navigate('LanguageSettings')}>
        <Image source={actionIcons.language} style={styles.icon} />
        <View style={styles.info}>
          <Text style={styles.title}>Language</Text>
          <Text style={styles.description}>Change the app's language.</Text>
        </View>
      </TouchableOpacity>

      {/* Location Services */}
      <View style={styles.settingItem}>
        <Image source={actionIcons.location} style={styles.icon} />
        <View style={styles.info}>
          <Text style={styles.title}>Location Services</Text>
          <Text style={styles.description}>
            Allow access to location for better experience.
          </Text>
        </View>
        <Switch
          value={isLocationEnabled}
          onValueChange={toggleLocation}
          style={styles.switch}
        />
      </View>

      {/* Data Usage */}
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => navigation.navigate('DataUsage')}>
        <Image source={actionIcons.DataUsage} style={styles.icon} />
        <View style={styles.info}>
          <Text style={styles.title}>Data Usage</Text>
          <Text style={styles.description}>
            Manage your data usage preferences.
          </Text>
        </View>
      </TouchableOpacity>

      {/* Help & Support */}
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => navigation.navigate('HelpSupport')}>
        <Image source={actionIcons.customerservice} style={styles.icon} />
        <View style={styles.info}>
          <Text style={styles.title}>Help & Support</Text>
          <Text style={styles.description}>Get help or contact support.</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  settingItem: {
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
  switch: {
    marginLeft: 'auto',
  },
});

export default SettingsTab;
