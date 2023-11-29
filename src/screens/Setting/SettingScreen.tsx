import React from 'react';
import {View, Text} from 'react-native';
import {useRoute} from '@react-navigation/native';
import type {RouteProp} from '@react-navigation/native';
import {RootStackParamsList} from '../../navigator/types';

type SettingScreenRouteProp = RouteProp<RootStackParamsList, 'SettingSceen'>;

const Setting = () => {
  // const route = useRoute<SettingScreenRouteProp>();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'pink',
      }}>
      <Text>Settings!</Text>
    </View>
  );
};

export default Setting;
