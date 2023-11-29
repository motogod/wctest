import React, {useEffect, useContext, useState} from 'react';
import {W3mButton} from '@web3modal/wagmi-react-native';
import {useWeb3Modal} from '@web3modal/wagmi-react-native';
import axios, {AxiosRequestConfig, AxiosRequestHeaders} from 'axios';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useDisconnect, useAccount, useSignMessage, useNetwork} from 'wagmi';
import {useFocusEffect} from '@react-navigation/native';
import {SiweMessage} from 'siwe';
import {useReactNavigation} from '../../hooks';
import {GetNonceFromServer, LoginWithSiwe, CheckAuth} from '../../api';
import {SignMessage} from '../../views/SignMessage';
import {SignContext} from '../../store/SignProvider';

const Home = () => {
  const {open} = useWeb3Modal();
  const [nonceData, setNonceData] = useState('');

  const {address, isConnected, isDisconnected, isReconnecting, isConnecting} =
    useAccount();

  const {disconnect} = useDisconnect();

  const {data, isError, isLoading, isSuccess, signMessage, signMessageAsync} =
    useSignMessage({
      message: 'gm wagmi frens',
    });

  const {navigation} = useReactNavigation();

  const {chain} = useNetwork();

  const signContext = useContext(SignContext);

  useEffect(() => {
    console.log('Hello');
    // const getMarkets = async () => {
    //   const resp = await GetMarkets({});
    // };
    // getMarkets();
  }, []);

  useEffect(() => {
    // Test iOS axios api undefined
    // testing post
    axios
      .post(
        'https://opentrust.staging.hongwangtec.com/testing',
        {
          data: 'This is a test from RN iOS Morton',
        },
        {
          headers: {'Content-Type': 'application/json'},
          // withCredentials: true,
        },
      )
      .then(response => {
        console.log('axios post test response', response);
      })
      .catch(error => {
        console.log('axios post test error:', error);
      });

    // testing put
    axios
      .put('https://opentrust.staging.hongwangtec.com/testing/123', {
        data: 'This is a put test from RN iOS Morton',
      })
      .then(response => {
        console.log('axios put response', response);
      })
      .catch(error => {
        console.log('axios put error:', error);
      });

    // auth/login/siwe
    axios
      .post(
        'https://opentrust.staging.hongwangtec.com/auth/login/siwe',
        {
          nonce: 'gDaDbSjosgGG8bVnA',
          message:
            'poly-ten-rho.vercel.app wants you to sign in with your Ethereum account:\n0x7cB59F3C39C1a1F1238888A651010a614D2ce8f7\n\nSign in with Ethereum to the native app.\n\nURI: https://poly-ten-rho.vercel.app\nVersion: 1\nChain ID: 1\nNonce: gDaDbSjosgGG8bVnA\nIssued At: 2023-11-28T09:28:58.883Z',
          signature:
            '0x08bb71cac528c8c293662682ada9e5e630113416b8416b0e32b6a12f50f110636e2c0b59852342e8a49f4e659723ff5135cb3755cbcadf663507498a2547069a1b',
          origin: 'metaMask',
        },
        {
          headers: {'Content-Type': 'application/json'},
          withCredentials: true,
        },
      )
      .then(response => {
        console.log('axios login response', response);
      })
      .catch(error => {
        console.log('axios login error:', error);
      });
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const resp = await CheckAuth({});

      console.log('CheckAuth resp', resp);
    };
    // checkAuth();
  }, []);

  const signInWithEthereum = async (message: string) => {
    try {
      // const signer = await provider.getSigner();
      // const message = await createSiweMessage(
      // 	signer.address,
      // 	'Sign in with Ethereum to the app.'
      // );
      // const message = await createSiweMessage(
      //   address,
      //   'Sign in with Ethereum to the app.',
      //   chainId,
      // );
      // console.log('message is', message);

      const signatureSiwe = await signMessageAsync({message});
      // const resp = await GetNonceFromServer({});
      // console.log('resp nonce', resp);

      console.log(
        'login params',
        JSON.stringify({
          // nonce: resp?.data.nonce,
          nonce: nonceData,
          message,
          // signature: signContext?.value,
          signature: signatureSiwe,
          origin: 'metaMask',
        }),
      );
      const loginResp = await LoginWithSiwe({
        // nonce: resp?.data.nonce,
        nonce: nonceData,
        message,
        // signature: signContext?.value,
        signature: signatureSiwe,
        origin: 'metaMask',
      });
      console.log('loginResp', loginResp);
    } catch (error) {
      console.log('signInWithEthereum error', error);
      // disconnect();
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      console.log('useFocus');
      if (signContext?.value) {
        console.log('Test Test Test');
        signInWithEthereum(signContext?.value);
      }
    }, [signContext]),
  );

  useEffect(() => {
    console.log('useEffect isConnecting', isConnecting);
    console.log('useEffect address', address);
    if (!isConnecting && address) {
      // console.log('trigger login');
      // signMessage();
      // console.log('nothing happen');
    }
  }, [isConnecting, address, signMessage]);

  // useEffect(() => {
  //   const createSiweMessage = async (
  //     address: string,
  //     statement: string,
  //     chainId: number,
  //   ) => {
  //     const message = new SiweMessage({
  //       domain: 'poly-ten-rho.vercel.app',
  //       address,
  //       statement,
  //       uri: 'https://poly-ten-rho.vercel.app',
  //       version: '1',
  //       chainId,
  //     });
  //     return message.prepareMessage();
  //   };
  //   const signInWithEthereum = async (address: string, chainId: number) => {
  //     try {
  //       // const signer = await provider.getSigner();
  //       // const message = await createSiweMessage(
  //       // 	signer.address,
  //       // 	'Sign in with Ethereum to the app.'
  //       // );
  //       const message = await createSiweMessage(
  //         address,
  //         'Sign in with Ethereum to the app.',
  //         chainId,
  //       );
  //       console.log('message is', message);

  //       const signatureSiwe = await signMessageAsync({message});
  //       const resp = await GetNonceFromServer({});
  //       console.log('resp nonce', resp);

  //       console.log('login params', {
  //         nonce: resp?.data.nonce,
  //         message,
  //         // signature: signContext?.value,
  //         signature: signatureSiwe,
  //       });
  //       const loginResp = await LoginWithSiwe({
  //         nonce: resp?.data.nonce,
  //         message,
  //         // signature: signContext?.value,
  //         signature: signatureSiwe,
  //       });
  //       console.log('loginResp', loginResp);
  //     } catch (error) {
  //       console.log('signInWithEthereum error', error);
  //       // disconnect();
  //     }
  //   };

  //   // if (address && chain?.id) {
  //   //   signInWithEthereum(address, chain?.id);
  //   // }
  // }, [signMessageAsync, chain, address]);

  // const createSiweMessage = async (
  //   address: string,
  //   statement: string,
  //   chainId: number | undefined,
  // ) => {
  //   const message = new SiweMessage({
  //     domain: 'poly-ten-rho.vercel.app',
  //     address,
  //     statement,
  //     uri: 'https://poly-ten-rho.vercel.app',
  //     version: '1',
  //     chainId,
  //   });
  //   return message.prepareMessage();
  // };

  return (
    <View style={styles.container}>
      <Text>Hello Home</Text>
      <W3mButton balance="show" />
      <SignMessage />

      {/* <TouchableOpacity style={{marginTop: 30}} onPress={() => open()}>
        <Text>Connect</Text>
      </TouchableOpacity> */}

      {/* <TouchableOpacity style={{marginTop: 30}} onPress={() => disconnect()}>
        <Text>Disconnect</Text>
      </TouchableOpacity> */}

      <TouchableOpacity onPress={() => open()}>
        <Text>{`${address}`}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => signInWithEthereum(address as `0x${string}`, chain?.id)}>
        <Text>Sign with SIWE</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate('TabStack', {
            screen: 'SettingTab',
            params: {settingId: ''},
          })
        }>
        <Text>Go to Setting</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{marginTop: 30}}
        onPress={async () => {
          const resp = await GetNonceFromServer({});
          setNonceData(resp?.data.nonce);
          navigation.navigate('LoginWebViewStack', {
            screen: 'LoginWebViewScreen',
            params: {
              address: address as `0x${string}`,
              chainId: chain?.id,
              nonce: resp?.data.nonce,
            },
          });
        }}>
        <Text>Go To Login View</Text>
      </TouchableOpacity>

      <Text>{`Signature is ${signContext?.value}`}</Text>
      {/* <TouchableOpacity style={{marginTop: 30}} onPress={() => signMessage()}>
        <Text>{`Sign with ${data}`}</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
  },
});

export default Home;
