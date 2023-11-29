import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeStack from './HomeStack';
import SettingStack from './SettingStack';
import LoginWebViewStack from './LoginWebViewStack';

import {RootStackParamsList, BottomTabParamList} from './types';

import {SignProvider} from '../store/SignProvider';

const Tab = createBottomTabNavigator<BottomTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamsList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeTab" component={HomeStack} />
      <Tab.Screen name="SettingTab" component={SettingStack} />
    </Tab.Navigator>
  );
};

const TabStack = () => {
  return (
    <SignProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="TabStack"
            component={TabNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LoginWebViewStack"
            component={LoginWebViewStack}
            options={{headerShown: false}}
          />

          {/* <Stack.Screen
            name="LoginWebViewScreen"
            component={LoginWebViewScreen}
          /> */}
          {/* <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="Setting" component={SettingStack} />
        </Tab.Navigator> */}
        </Stack.Navigator>
      </NavigationContainer>
    </SignProvider>
  );
};

export default TabStack;
