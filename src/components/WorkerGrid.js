import React from 'react';
import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
import workers from '../data/workers.json';
import {flagMap, imageMap} from '../Constant/constants';

const WorkerGrid = ({workers, numColumns}) => {
  const renderWorkerItem = ({item}) => (
    <View style={styles.workerContainer}>
      <Image source={imageMap[item.name]} style={styles.profileImage} />
      <Image source={flagMap[item.country]} style={styles.countryFlag} />
      <Text style={styles.workerName}>{item.name}</Text>
    </View>
  );

  return (
    <FlatList
      data={workers}
      renderItem={renderWorkerItem}
      keyExtractor={item => item.id}
      numColumns={numColumns}
      key={numColumns}
      contentContainerStyle={styles.grid}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  grid: {
    padding: 10,
  },
  workerContainer: {
    marginTop: 10,
    width: '33%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 5,
  },
  countryFlag: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: 2,
    right: 7,
    borderRadius: 15,
  },
  workerName: {
    fontSize: 16,
  },
  workerCountry: {
    fontSize: 14,
    color: '#666',
  },
});

export default WorkerGrid;
