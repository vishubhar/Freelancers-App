import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Header from '../components/Header';
import WorkerGrid from '../components/WorkerGrid';
import workers from '../data/workers.json';
import categories from '../data/categories.json';
import MainHeader from '../components/MainHeader';

const CategoriesScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredWorkers, setFilteredWorkers] = useState(workers);

  useEffect(() => {
    const filtered = workers.filter(worker => {
      const category = categories.find(cat => cat.id === worker.id);
      const matchesSearch = worker.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory
        ? category && category.Worker_Role === selectedCategory
        : true;
      return matchesSearch && matchesCategory;
    });
    setFilteredWorkers(filtered);
  }, [searchQuery, selectedCategory]);

  const handleSearch = text => {
    setSearchQuery(text);
  };

  const handleSearchSubmit = () => {};

  const handleCategorySelect = category => {
    setSelectedCategory(prevCategory =>
      prevCategory === category ? null : category,
    );
  };

  return (
    <View style={styles.container}>
      <MainHeader />
      <Header
        searchQuery={searchQuery}
        onSearch={handleSearch}
        onSearchSubmit={handleSearchSubmit}
        onCategorySelect={handleCategorySelect}
      />
      <WorkerGrid workers={filteredWorkers} numColumns={3} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CategoriesScreen;
