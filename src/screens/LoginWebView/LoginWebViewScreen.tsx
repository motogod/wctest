import React, {useRef, useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigatorParamsList} from '../../navigator/types';
import {SignContext} from '../../store/SignProvider';
import {WebView} from 'react-native-webview';
import {GetNonceFromServer} from '../../api';

const LoginWebViewScreen = ({route, navigation}: any) => {
  const webViewRef = useRef(null);

  const signContext = useContext(SignContext);
  // const navigation =
  //   useNavigation<NativeStackNavigationProp<RootStackNavigatorParamsList>>();

  const handleMessage = (message: any) => {
    alert(JSON.stringify(message?.nativeEvent?.data));
    signContext?.changeSignature(message?.nativeEvent?.data);
    // navigation.goBack();
  };

  const sendMsgToPWA = async () => {
    const resp = await GetNonceFromServer({});
    console.log('resp nonce', resp);
    if (webViewRef?.current) {
      console.log('Trigger send to React');
      const {address, chainId, nonce} = route.params;
      webViewRef?.current?.postMessage(
        JSON.stringify({
          address,
          statement: 'Sign in with Ethereum to the native app.',
          chainId,
          nonce,
        }),
      );
      // webViewRef?.current?.postMessage({address, chainId});
    }
  };

  return (
    <WebView
      ref={webViewRef}
      // source={{
      //   uri: 'https://stackoverflow.com/questions/49826920/how-to-navigate-between-different-nested-stacks-in-react-navigation',
      // }}
      source={{uri: 'https://poly-ten-rho.vercel.app/siweMessageFromMobile'}}
      style={{flex: 1}}
      javaScriptEnabled
      cacheEnabled
      thirdPartyCookiesEnabled
      allowsProtectedMedia
      allowUniversalAccessFromFileURLs
      allowsInlineMediaPlayback
      onMessage={handleMessage}
      onLoadEnd={sendMsgToPWA}
    />
  );
};

export default LoginWebViewScreen;
