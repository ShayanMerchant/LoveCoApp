import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, StyleSheet, ImageBackground, Pressable} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

//Icons
import Icon from 'react-native-vector-icons/Ionicons';

const Card = ({image, title, price}) => {
  const [isSelected, setIsSelected] = useState(false);
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.container}
      onPress={() => navigation.navigate('PropertiesDetail')}>
      <ImageBackground source={image} style={styles.imageContainer}>
        <View style={styles.addressTextContainer}>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View style={styles.priceTextContainer}>
          <Text style={styles.text}>${price} PW</Text>
        </View>
        <View style={styles.favoriateContainer}>
          <TouchableOpacity>
            <Icon
              name={'heart'}
              size={30}
              color={'#1f394a'}
              onPress={() => setIsSelected(isSelected)}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 345,
    height: 200,
    paddingBottom: 25,
    margin: 5,
  },
  addressTextContainer: {
    width: '100%',
    position: 'absolute',
    left: 0,
    bottom: 0,
    backgroundColor: '#1f394a',
  },
  priceTextContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: '#1f394a',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 14,
    padding: 15,
    color: 'white',
    fontWeight: '600',
  },
  favoriateContainer: {
    padding: 10,
    position: 'absolute',
    left: 0,
    top: 0,
  },
});

export default Card;
