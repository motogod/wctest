import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginWebViewScreen from '../screens/LoginWebView/LoginWebViewScreen';

const Stack = createNativeStackNavigator();

const LoginWebViewStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginWebViewScreen" component={LoginWebViewScreen} />
    </Stack.Navigator>
  );
};

export default LoginWebViewStack;
