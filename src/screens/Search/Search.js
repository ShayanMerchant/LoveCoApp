import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, Alert} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {Searchbar} from 'react-native-paper';

// Tab Navigation
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

// Components
import PropertyCard from '../../components/Card/PropertyCard';

// Backend
import http from '../../../api/http';

function renderProperties(itemData) {
  return (
    <PropertyCard
      title={itemData.item.title}
      price={itemData.item.price}
      image={{uri: `http://localhost:8000/${itemData.item.images[0]}`}}
    />
  );
}

const Search = () => {
  const [property, setProperty] = useState([]);
  const isFocused = useIsFocused();
  const [searchQuery, setSearchQuery] = React.useState('');
  const tabBarheight = useBottomTabBarHeight();

  useEffect(() => {
    if (isFocused) {
      try {
        http
          .get('api/properties/getProperties')
          .then(response => {
            JSON.stringify(response.data);
            setProperty(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      } catch (error) {
        if (error.response) {
          // Request made and server responded
          Alert.alert('', error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.log('Request Error' + error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error Message', error.message);
        }
      }
    }
  });
  return (
    <View style={[styles.container, {paddingBottom: tabBarheight}]}>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
        selectionColor={'#1f394a'}
      />
      <FlatList
        data={property}
        keyExtractor={item => item._id}
        renderItem={renderProperties}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    width: '95%',
    borderRadius: 20,
    margin: 10,
    fontSize: 18,
  },
});

export default Search;
