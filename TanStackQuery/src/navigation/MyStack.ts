import {
  createStaticNavigation
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ReposScreen from '../screens/ReposScreen';

const Stack = createNativeStackNavigator({
  screens: {
    Home: {
      screen: HomeScreen, options: {
        headerShown: false,
      }
    },
    Repos: ReposScreen,
  },
});

const Navigation = createStaticNavigation(Stack);

export default Navigation;