import React, {useState} from 'react';
import {View, StyleSheet, Text, Alert} from 'react-native';

//components
import CustomTextInput from '../../components/TextInputs/CustomTextInput';
import CustomButton from '../../components/Buttons/CustomButton';
import Logo from '../../components/Logo/Logo';

const ForgetPassword = ({navigation}) => {
  const [email, setEmail] = useState('');

  const onForgetPasswordPressed = () => {
    if (!email.trim()) {
      Alert.alert('', 'Please Enter Email');
      return;
    }
  };

  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.text}>
        Enter your Email Address and we will send you a code
      </Text>
      <CustomTextInput
        placeholder="Email"
        placeholderTextColor={'#1f394a'}
        autoCapitalize="none"
        value={email}
        setValue={setEmail}
      />
      <CustomButton title="Submit" onPress={onForgetPasswordPressed} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 40,
    backgroundColor: '#1f394a',
    height: '100%',
  },
  text: {
    fontSize: 20,
    padding: 10,
    marginBottom: 10,
    color: '#d2a8cc',
  },
});

export default ForgetPassword;
