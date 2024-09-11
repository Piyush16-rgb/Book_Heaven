import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from '../components/SignUpScreen';
import LoginScreen from '../components/LoginScreen';
import MainTabNavigator from './MainTabNavigator';
import Slider from '../components/Slider';
import BookDetailsScreen from '../components/BookDetailsScreen';
import { RootStackParamList } from '../components/types';

const Stack = createStackNavigator<RootStackParamList>();

const MainStackNavigator = () => {
  return (
      <Stack.Navigator
        initialRouteName="Slider"
        screenOptions={{
          headerShown: false, // Hide header if using custom headers
        }}
      >
        <Stack.Screen name='Slider' component={Slider}/>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="SignUp" component={SignUpScreen}/>
        <Stack.Screen name="HomeTabs" component={MainTabNavigator}/>
        <Stack.Screen name='ProfileTabs' component={MainTabNavigator}/>
        <Stack.Screen name='BookDetails' component={BookDetailsScreen} 
        options={{headerShown:true}}/>
        </Stack.Navigator>
  );
};

export default MainStackNavigator;
