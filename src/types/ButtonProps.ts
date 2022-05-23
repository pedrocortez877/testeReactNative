import {RootStackParamsList} from '../types/RootStackParamsList';
import {StackNavigationProp} from '@react-navigation/stack';

export interface ButtonProps {
  title: String;
  destination: keyof RootStackParamsList;
  light: Boolean;
  onPress?: () => void;
  navigation: StackNavigationProp<
    RootStackParamsList,
    keyof RootStackParamsList
  >;
}
