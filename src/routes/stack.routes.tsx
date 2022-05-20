import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Home} from '../screens/Home';
import {Cart} from '../screens/Cart';
import {Confirmation} from '../screens/Confirmation';

import colors from '../styles/colors';

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
  <stackRoutes.Navigator
    screenOptions={{
      cardStyle: {
        backgroundColor: colors.purple,
      },
      headerShown: false,
    }}>
    <stackRoutes.Screen name="Home" component={Home} />
    <stackRoutes.Screen name="Cart" component={Cart} />
    <stackRoutes.Screen name="Confirmation" component={Confirmation} />
  </stackRoutes.Navigator>
);

export default AppRoutes;
