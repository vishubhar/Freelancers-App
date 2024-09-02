import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Text,
} from 'react-native';
import Voice from '@react-native-community/voice';
import categories from '../data/categories.json';
import {iconMap, actionIcons} from '../Constant/constants';

const uniqueCategories = Array.from(
  new Map(categories.map(item => [item.Worker_Role, item])).values(),
);

const Header = ({onSearch, onCategorySelect}) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    Voice.onSpeechStart = () => setIsListening(true);
    Voice.onSpeechEnd = () => setIsListening(false);
    Voice.onSpeechResults = e => {
      setSearchQuery(e.value[0]);
      onSearch(e.value[0]);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const handleCategorySelect = category => {
    setActiveCategory(prevCategory => {
      const newCategory =
        prevCategory === category.Worker_Role ? null : category.Worker_Role;
      onCategorySelect(newCategory);
      return newCategory;
    });
  };

  const handleSearchSubmit = () => {};

  const handleSearchChange = text => {
    setSearchQuery(text);
    onSearch(text);
  };

  const startListening = async () => {
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  const renderCategoryItem = ({item}) => {
    const isActive = activeCategory === item.Worker_Role;

    return (
      <TouchableOpacity
        style={styles.categoryItem}
        onPress={() => handleCategorySelect(item)}>
        <View style={styles.imageContainer}>
          <Image
            source={iconMap[item.Worker_Role]}
            style={[
              styles.categoryImage,
              isActive && styles.activeCategoryImage,
            ]}
          />
          <Text style={styles.categoryText}>{item.Worker_Role}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.headerContainer}>
      <FlatList
        data={uniqueCategories}
        renderItem={renderCategoryItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.flatList}
      />
      <View style={styles.searchRow}>
        <View style={styles.searchContainer}>
          <Image source={actionIcons.magnifierIcon} style={styles.icon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchQuery}
            onChangeText={handleSearchChange}
            onSubmitEditing={handleSearchSubmit}
          />
          <TouchableOpacity
            style={styles.iconButton}
            onPress={isListening ? stopListening : startListening}>
            <Image
              source={actionIcons.Mic}
              style={[styles.icon, isListening && styles.activeMicIcon]}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.listButton}>
          <Image source={actionIcons.listIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
  },
  flatList: {
    marginBottom: 10,
    margin: 0,
  },
  categoryItem: {
    marginRight: 6,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    alignItems: 'center',
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  activeCategoryImage: {
    borderColor: '#007BFF',
  },
  categoryText: {
    marginTop: 5,
    fontSize: 10,
    textAlign: 'center',
    color: '#333',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
  },
  searchInput: {
    height: 40,
    flex: 1,
    paddingHorizontal: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  iconButton: {
    marginLeft: 10,
  },
  listButton: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  activeMicIcon: {
    tintColor: '#007BFF',
  },
});

export default Header;
