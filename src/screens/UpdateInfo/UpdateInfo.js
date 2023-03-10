import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Platform,
  Pressable,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {useIsFocused} from '@react-navigation/native';

// Components
import UploadImage from '../../components/Image/UploadImage';

// Backend
import http from '../../../api/http';

// Storage
import AsyncStorage from '@react-native-async-storage/async-storage';

const UpdateInfo = () => {
  StatusBar.setBarStyle('light-content', true);
  const [user, setUser] = useState('');
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [image, setImage] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      AsyncStorage.getItem('user')
        .then(value => {
          setUser(JSON.parse(value));
          console.log(JSON.parse(value));
        })
        .catch(err => console.log('Error Message' + err));
    }
  }, [isFocused]);

  const addImage = async () => {
    let _image = await launchImageLibrary({
      mediaTypes: 'photo',
      maxHeight: 200,
      maxWidth: 200,
      quality: 1,
    });
    console.log(JSON.stringify(_image));
    if (!_image.didCancel) {
      setImage(_image.assets[0].uri);
    }
  };

  const updatingUser = async () => {
    try {
      const res = await http.put(`/api/users/updateUser/${user._id}`, {
        firstName,
        lastName,
        email,
        phoneNumber,
      });
      if (res) {
        console.log('Update' + JSON.stringify(res.data));
        AsyncStorage.setItem('user', JSON.stringify(res.data));
      }
      Alert.alert('', 'Updated Successfully');
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        Alert.alert('Response Error', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.log('Request Error' + error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error Message', error.message);
      }
    }
    if (image !== null) {
      try {
        const res = await http.post(`/api/users/userImage/${user._id}`, {
          image,
        });
        if (res) {
          console.log('User Image ' + JSON.stringify(res.data.image));
          AsyncStorage.setItem('user', JSON.stringify(res.data));
        }
      } catch (error) {
        if (error.response) {
          // Request made and server responded
          Alert.alert('', error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <UploadImage
          image={image ? {uri: image} : {uri: user.image}}
          addImage={addImage}
        />
      </View>
      <Text style={styles.label}>First Name</Text>
      <TextInput
        style={styles.textInput}
        placeholder="First Name"
        placeholderTextColor={'grey'}
        autoCapitalize="none"
        defaultValue={user.firstName}
        onChangeText={setFirstName}
      />
      <Text style={styles.label}>Last Name</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Last Name"
        placeholderTextColor={'grey'}
        autoCapitalize="none"
        defaultValue={user.lastName}
        onChangeText={setLastName}
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        placeholderTextColor={'grey'}
        autoCapitalize="none"
        defaultValue={user.email}
        onChangeText={setEmail}
      />
      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Phone Number"
        placeholderTextColor={'grey'}
        autoCapitalize="none"
        keyboardType="number-pad"
        defaultValue={JSON.stringify(user.phoneNumber)}
        onChangeText={setPhoneNumber}
      />
      <View style={styles.buttonContainer}>
        <Pressable onPress={updatingUser}>
          <Text style={styles.button}>Save</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default UpdateInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1f394a',
  },
  textInput: {
    width: '100%',
    maxWidth: 300,
    maxHeight: Platform.OS === 'android' ? 40 : 42,
    padding: 5,
    margin: 5,
    borderBottomWidth: 1,
    borderColor: '#d2a8cc',
    borderRadius: 10,
    fontSize: 16,
    color: 'white',
  },
  imageContainer: {
    alignItems: 'center',
  },
  label: {
    paddingTop: 10,
    paddingHorizontal: 10,
    fontSize: 18,
    fontWeight: '400',
    color: '#d2a8cc',
  },
  buttonContainer: {
    alignItems: 'center',
    padding: 20,
    margin: 20,
  },
  button: {
    fontSize: 20,
    color: '#d2a8cc',
    fontWeight: '500',
  },
});
