import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';

const ProfessionalDetailTab = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [details, setDetails] = useState({
    name: 'Vishal Bhardwaj',
    email: 'Vishubhardwaj1922@gmail.com',
    phone: '+91-8373930017',
    address: {
      houseNo: '',
      street: '',
      city: '',
      state: '',
      pincode: '',
      country: '',
      currentLocation: '',
    },
    education: [],
    work: [],
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleChange = (section, field, index, value) => {
    setDetails(prevDetails => {
      if (section === 'address') {
        return {
          ...prevDetails,
          [section]: {
            ...prevDetails[section],
            [field]: value,
          },
        };
      }
      if (index !== undefined) {
        return {
          ...prevDetails,
          [section]: prevDetails[section].map((item, i) =>
            i === index ? {...item, [field]: value} : item,
          ),
        };
      }
      return {
        ...prevDetails,
        [section]: {
          ...prevDetails[section],
          [field]: value,
        },
      };
    });
  };

  const addNewEntry = section => {
    if (section === 'education') {
      setDetails(prevDetails => ({
        ...prevDetails,
        education: [
          ...prevDetails.education,
          {
            degree: '',
            institute: '',
            course: '',
            fromYear: '',
            toYear: '',
          },
        ],
      }));
    } else if (section === 'work') {
      setDetails(prevDetails => ({
        ...prevDetails,
        work: [
          ...prevDetails.work,
          {
            orgName: '',
            designation: '',
            fromYear: '',
            toYear: '',
            location: '',
          },
        ],
      }));
    }
  };

  const handleDelete = (section, index) => {
    setDetails(prevDetails => ({
      ...prevDetails,
      [section]: prevDetails[section].filter((_, i) => i !== index),
    }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {isEditing ? (
        <View>
          {/* Editable Fields */}
          <View style={styles.editableField}>
            <Text style={styles.label}>Name:</Text>
            <TextInput
              style={styles.input}
              value={details.name}
              onChangeText={text => handleChange('name', null, null, text)}
              placeholder="Enter Name"
            />
          </View>
          <View style={styles.editableField}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              value={details.email}
              onChangeText={text => handleChange('email', null, null, text)}
              placeholder="Enter Email"
              keyboardType="email-address"
            />
          </View>
          <View style={styles.editableField}>
            <Text style={styles.label}>Phone:</Text>
            <TextInput
              style={styles.input}
              value={details.phone}
              onChangeText={text => handleChange('phone', null, null, text)}
              placeholder="Enter Phone Number"
              keyboardType="phone-pad"
            />
          </View>
          {/* Address Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Address</Text>
            {Object.keys(details.address).map(key => (
              <View key={key} style={styles.editableField}>
                <Text style={styles.label}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}:
                </Text>
                <TextInput
                  style={styles.input}
                  value={details.address[key]}
                  onChangeText={text =>
                    handleChange('address', key, null, text)
                  }
                  placeholder={`Enter ${
                    key.charAt(0).toUpperCase() + key.slice(1)
                  }`}
                />
              </View>
            ))}
          </View>
          {/* Education Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {details.education.map((edu, index) => (
              <View key={index} style={styles.entryContainer}>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete('education', index)}>
                  <Text style={styles.deleteButtonText}>×</Text>
                </TouchableOpacity>
                {Object.keys(edu).map(key => (
                  <View key={key} style={styles.editableField}>
                    <Text style={styles.label}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}:
                    </Text>
                    <TextInput
                      style={styles.input}
                      value={edu[key]}
                      onChangeText={text =>
                        handleChange('education', key, index, text)
                      }
                      placeholder={`Enter ${
                        key.charAt(0).toUpperCase() + key.slice(1)
                      }`}
                      keyboardType={
                        key.includes('Year') ? 'numeric' : 'default'
                      }
                    />
                  </View>
                ))}
              </View>
            ))}
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => addNewEntry('education')}>
              <Text style={styles.addButtonText}>Add New Education</Text>
            </TouchableOpacity>
          </View>
          {/* Work Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {details.work.map((wrk, index) => (
              <View key={index} style={styles.entryContainer}>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete('work', index)}>
                  <Text style={styles.deleteButtonText}>×</Text>
                </TouchableOpacity>
                {Object.keys(wrk).map(key => (
                  <View key={key} style={styles.editableField}>
                    <Text style={styles.label}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}:
                    </Text>
                    <TextInput
                      style={styles.input}
                      value={wrk[key]}
                      onChangeText={text =>
                        handleChange('work', key, index, text)
                      }
                      placeholder={`Enter ${
                        key.charAt(0).toUpperCase() + key.slice(1)
                      }`}
                      keyboardType={
                        key.includes('Year') ? 'numeric' : 'default'
                      }
                    />
                  </View>
                ))}
              </View>
            ))}
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => addNewEntry('work')}>
              <Text style={styles.addButtonText}>Add New Work Experience</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text style={styles.sectionTitle}>Personal Details</Text>
          <Text style={styles.detailText}>Name: {details.name}</Text>
          <Text style={styles.detailText}>Email: {details.email}</Text>
          <Text style={styles.detailText}>Phone: {details.phone}</Text>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Address</Text>
            {Object.keys(details.address).map(key => (
              <Text key={key} style={styles.detailText}>
                {key.charAt(0).toUpperCase() + key.slice(1)}:{' '}
                {details.address[key]}
              </Text>
            ))}
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {details.education.map((edu, index) => (
              <View key={index}>
                {Object.keys(edu).map(key => (
                  <Text key={key} style={styles.detailText}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}: {edu[key]}
                  </Text>
                ))}
              </View>
            ))}
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {details.work.map((wrk, index) => (
              <View key={index}>
                {Object.keys(wrk).map(key => (
                  <Text key={key} style={styles.detailText}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}: {wrk[key]}
                  </Text>
                ))}
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  editableField: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  entryContainer: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
  deleteButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#DC3545',
    padding: 5,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#001f3f',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#28A745',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: '#001f3f',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 'auto',
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  detailText: {
    fontSize: 15,
    marginBottom: 10,
  },
});

export default ProfessionalDetailTab;
