import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainNavigate from './src/navigation/mainnavigate';
import {LogBox} from "react-native";
import {  Provider } from 'react-redux';
import { applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux'
import thunk from 'redux-thunk';
import userLogin from "./src/store/reducers/userLogin"
import product from "./src/store/reducers/product"

LogBox.ignoreLogs([
"exported from 'deprecated-react-native-prop-types'.",
])

export default function App() {

  const [loaded] = useFonts({
    Montserrat: require('./assets/font/IRANSansMobile.ttf'),
    Montserrat1: require('./assets/font/IRANSansMobile1.ttf'),
    MontserratBold: require('./assets/font/IRANSansMobileBold.ttf'),
    MontserratBold1: require('./assets/font/IRANSansMobileBold1.ttf'),
    MontserratLight: require('./assets/font/IRANSansMobileLight.ttf'),
  });
  if (!loaded) {
    return null;
  }



  const appReducer = combineReducers({
    userLogin,
    product
  
 })


//  const rootReducer = (state, action) => {
//   if (action.type === "USER_LOGOUT") {
//     return appReducer(undefined, action);
//   }
//   return appReducer(state, action);
// };

const store=createStore(appReducer,applyMiddleware(thunk))



  return (
    <Provider store={store}>
    <NavigationContainer>
    <StatusBar backgroundColor="white" />
    <MainNavigate/>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
