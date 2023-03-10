import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const AppliedProperty = () => {
  return (
    <View style={styles.container}>
      <Text>Applied Properties</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AppliedProperty;
