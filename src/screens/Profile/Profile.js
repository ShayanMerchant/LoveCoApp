import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, StatusBar, Image} from 'react-native';

// Components
import CustomBoxButton from '../../components/Buttons/CustomBoxButton';

// Storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';

const Profile = ({navigation}) => {
  const isFocused = useIsFocused();
  const [user, setUser] = useState('');
  StatusBar.setBarStyle('light-content', true);

  useEffect(() => {
    if (isFocused) {
      AsyncStorage.getItem('user')
        .then(value => {
          setUser(JSON.parse(value));
        })
        .catch(err => console.log('Error Message' + err));
    }
  }, [isFocused]);

  return (
    <View>
      <View style={styles.container} />
      <View style={styles.profileContainer}>
        <View style={styles.imageContainer}>
          <Image source={{uri: user.image}} style={styles.image} />
        </View>
        <Text style={styles.nameText}>
          {user.firstName} {user.lastName}
        </Text>
        <Text style={styles.emailText}>{user.email}</Text>
      </View>
      <View style={styles.buttonComtainer}>
        <CustomBoxButton
          title={'Update Information'}
          iconName={'person-circle-outline'}
          iconColor={'green'}
          size={30}
          onPress={() => navigation.navigate('UpdateInfo')}
        />
        <CustomBoxButton
          title={'Favouriates'}
          iconName={'heart'}
          iconColor={'red'}
          size={30}
          onPress={() => navigation.navigate('Favouriate')}
        />
        <CustomBoxButton
          title={
            user.isAdmin === true ? 'Add Properties' : 'Applied Properties'
          }
          iconName={
            user.isAdmin === true ? 'add-circle' : 'checkmark-done-circle'
          }
          iconColor={'#4b8ab4'}
          size={30}
          onPress={() =>
            navigation.navigate(
              user.isAdmin === true ? 'AddProperties' : 'AppliedProperty',
            )
          }
        />
        <CustomBoxButton
          title={'View and Pay Bills'}
          iconName={'wallet'}
          iconColor={'black'}
          size={30}
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
    backgroundColor: '#1f394a',
    borderBottomEndRadius: 40,
    borderBottomStartRadius: 40,
    position: 'relative',
    bottom: 220,
  },
  imageContainer: {
    margin: 25,
    height: 175,
    width: 175,
    backgroundColor: '#e5e5e5',
    borderRadius: 999,
  },
  image: {
    width: 175,
    height: 175,
    borderRadius: 999,
  },
  nameText: {
    fontSize: 22,
    fontWeight: '400',
    color: '#d2a8cc',
  },
  emailText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#d2a8cc',
  },
  container: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d2a8cc',

    padding: 50,
    borderBottomEndRadius: 40,
    borderBottomStartRadius: 40,
    position: 'relative',
    top: 200,
  },
  buttonComtainer: {
    position: 'relative',
    bottom: 120,
  },
});

export default Profile;
