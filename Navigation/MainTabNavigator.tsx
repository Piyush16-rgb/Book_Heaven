import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../components/HomeScreen';
import ProfileScreen from '../components/ProfileScreen';
import CartScreen from '../components/CartScreen';
import PaymentScreen from '../components/PaymentScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Image } from 'react-native-elements';

const Tab = createBottomTabNavigator();

const LogoTitle = () => {
  return (
    <Image 
    source={require('../assets/ecommerce-books.jpg')}
    style={{width:100 , height:60, borderRadius:35}}
    resizeMode='contain'
    />
  );
}

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Profile':
              iconName = 'person';
              break;
            case 'Cart':
              iconName = 'cart';
              break;
            case 'Payment':
              iconName = 'card';
              break;
            default:
              iconName = 'home';
              break;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} 
      options={{
        headerShown:true,
        headerTitle: () => <LogoTitle/>,
        headerLeft: () => null
      }}/>

      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Payment" component={PaymentScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
