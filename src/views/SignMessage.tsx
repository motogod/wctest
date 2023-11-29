import React, {useEffect, useState, useContext} from 'react';
import {View} from 'react-native';
import {Button} from '@web3modal/ui-react-native';

import {useAccount, useSignMessage} from 'wagmi';
import {RequestModal} from '../components/RequestModal';

import {SignContext} from '../store/SignProvider';

export function SignMessage() {
  const [requestModalVisible, setRequetsModalVisible] = useState(false);
  const {isConnected} = useAccount();

  const signContext = useContext(SignContext);

  const {data, isError, isLoading, isSuccess, signMessage} = useSignMessage({
    message: 'hello web3modal + wagmi',
  });

  const onPress = () => {
    signMessage();
    setRequetsModalVisible(true);
  };

  console.log('Sign =>', {data, isError, isLoading, isSuccess, signMessage});

  useEffect(() => {
    data && signContext?.changeSignature(data);
  }, [data]);

  return isConnected ? (
    <View>
      <Button disabled={isLoading} onPress={onPress}>
        Sign message
      </Button>

      <RequestModal
        isVisible={requestModalVisible}
        isLoading={isLoading}
        rpcResponse={isSuccess ? data : undefined}
        rpcError={isError ? 'Error signing message' : undefined}
        onClose={() => setRequetsModalVisible(false)}
      />
    </View>
  ) : null;
}
