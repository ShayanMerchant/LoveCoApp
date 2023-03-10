/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Platform,
  Pressable,
  Alert,
} from 'react-native';

// Backend
import http from '../../../api/http';

const AppliedProperty = ({navigation}) => {
  const [title, setTitle] = useState();
  const [beds, setBeds] = useState();
  const [bathroom, setBathroom] = useState();
  const [parking, setParking] = useState();
  const [details, setDetails] = useState();
  const [price, setPrice] = useState();
  const [type, setType] = useState();
  const [agentName, setAgentName] = useState();
  const [agentPhoneNumber, setAgentPhoneNumber] = useState();
  const [agentEmailAddress, setAgentEmailAddress] = useState();
  const inputs = [
    title,
    beds,
    bathroom,
    parking,
    details,
    price,
    type,
    agentName,
    agentPhoneNumber,
    agentEmailAddress,
  ];
  const addProperty = async () => {
    function isEmailValid(value) {
      const regx = /^\S+@\S+$/;
      return regx.test(value);
    }
    if (inputs.includes('') || inputs.includes(undefined)) {
      Alert.alert('', 'All fields are required');
      return;
    }
    if (!isEmailValid(agentEmailAddress)) {
      Alert.alert('', 'Please enter a valid email');
      return;
    }
    if (agentPhoneNumber.length !== 10) {
      Alert.alert('', 'Please enter a valid phone number');
      return;
    }
    try {
      const res = await http.post('/api/properties/addProperty', {
        title,
        beds,
        bathroom,
        parking,
        details,
        price,
        type,
        agentName,
        agentPhoneNumber,
        agentEmailAddress,
      });
      if (res) {
        console.log('Property' + JSON.stringify(res.data));
      }
      Alert.alert('', 'Added Successfully');
      navigation.navigate('Home');
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
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>Title:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Address"
          placeholderTextColor={'grey'}
          value={title}
          onChangeText={setTitle}
        />
      </View>
      <View style={styles.view2}>
        <Text style={styles.label}>Beds:</Text>
        <TextInput
          style={[styles.textInput, {width: '25%'}]}
          placeholder="Beds"
          placeholderTextColor={'grey'}
          keyboardType={'number-pad'}
          value={beds}
          onChangeText={setBeds}
        />
        <Text style={styles.label}>Bathrooms:</Text>
        <TextInput
          style={[styles.textInput, {width: '25%'}]}
          placeholder="Bathrooms"
          placeholderTextColor={'grey'}
          keyboardType={'number-pad'}
          value={bathroom}
          onChangeText={setBathroom}
        />
      </View>
      <View style={styles.view2}>
        <Text style={styles.label}>Parkings:</Text>
        <TextInput
          style={[styles.textInput, {width: '25%'}]}
          placeholder="Parkings"
          placeholderTextColor={'grey'}
          keyboardType={'number-pad'}
          value={parking}
          onChangeText={setParking}
        />
        <Text style={styles.label}>Price:</Text>
        <TextInput
          style={[styles.textInput, {width: '25%'}]}
          placeholder="Price"
          placeholderTextColor={'grey'}
          keyboardType={'number-pad'}
          value={price}
          onChangeText={setPrice}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.label}>Type:</Text>
        <TextInput
          style={[styles.textInput, {width: '40%'}]}
          placeholder="Type"
          placeholderTextColor={'grey'}
          keyboardType={'number-pad'}
          value={type}
          onChangeText={setType}
        />
      </View>
      <View>
        <Text style={styles.label}>Details:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Details"
          placeholderTextColor={'grey'}
          multiline={true}
          value={details}
          onChangeText={setDetails}
        />
        <Text style={styles.label}>Agent Name:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Agent Name"
          placeholderTextColor={'grey'}
          value={agentName}
          onChangeText={setAgentName}
        />
        <Text style={styles.label}>Agent Contact No:</Text>
        <TextInput
          placeholder="Agent Contact No"
          placeholderTextColor={'grey'}
          style={styles.textInput}
          keyboardType={'number-pad'}
          value={agentPhoneNumber}
          onChangeText={setAgentPhoneNumber}
        />
        <Text style={styles.label}>Agent Email Address:</Text>
        <TextInput
          placeholder="Agent Email Address"
          placeholderTextColor={'grey'}
          style={styles.textInput}
          value={agentEmailAddress}
          onChangeText={setAgentEmailAddress}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable onPress={addProperty}>
          <Text style={styles.button}>Add</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingHorizontal: 15,
    backgroundColor: '#1f394a',
  },
  view2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  label: {
    paddingHorizontal: 5,
    margin: 5,
    fontSize: 18,
    fontWeight: '400',
    color: '#d2a8cc',
  },
  textInput: {
    width: '100%',
    maxWidth: 350,
    maxHeight: Platform.OS === 'android' ? 40 : 42,
    padding: 5,
    margin: 5,
    borderBottomWidth: 1,
    borderColor: '#d2a8cc',
    borderRadius: 10,
    fontSize: 16,
    color: 'white',
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

export default AppliedProperty;
