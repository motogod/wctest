import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../../navigator/types';

function useReactNavigation() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  return {navigation};
}

export default useReactNavigation;
