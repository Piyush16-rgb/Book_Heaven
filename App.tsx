import React from 'react';
import { View , StyleSheet} from 'react-native';
import MainStackNavigator from './Navigation/MainStackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './redux/store';

function App(): React.JSX.Element {
  
  return(
    <View style={styles.container}>
      <Provider store={store}>
      <NavigationContainer>
        <MainStackNavigator/>
      </NavigationContainer>
      </Provider>
    </View>
       );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  }
});

export default App;
