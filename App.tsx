/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Provider} from 'react-redux';
import store from './src/store';
import {RestaurantPage} from './src/containers/RestaurantPage';
import {MenuPage} from './src/containers/MenuPage';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator initialRouteName={'Restaurant'}>
          <Stack.Screen name="Restaurant" component={RestaurantPage} />
          <Stack.Screen name="Menu" component={MenuPage} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

export default App;
