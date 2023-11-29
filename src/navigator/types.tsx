import {NavigatorScreenParams} from '@react-navigation/native';

export type RootStackParamsList = {
  TabStack: NavigatorScreenParams<BottomTabParamList>;
  HomeScreen: IHome; // on TabStack can navigate directly
  SettingSceen: ISetting; // on TabStack can navigate directly
  LoginWebViewStack: LoginWebViewStackParamsList;
};

// Bottom Tabs
export type BottomTabParamList = {
  HomeTab: IHome;
  SettingTab: ISetting;
};

// Home
interface IHome {
  homeId: string;
}

export type HomeStackParamsList = {
  HomeScreen: IHome;
};

// ISetting
interface ISetting {
  settingId: string;
}

export type ISettingStackParamsList = {
  SettingScreen: ISetting;
};

export type LoginWebViewStackParamsList = {
  screen: 'LoginWebViewScreen';
  params: {address: `0x${string}`; chainId: number | undefined};
};
