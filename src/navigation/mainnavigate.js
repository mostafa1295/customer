import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/login';
import OTPscreen from '../screens/otp';
import Register1 from '../screens/register1';
import Register2 from '../screens/register2';
import ActiveOrder from '../screens/activeorder';
import Comments from '../screens/comment';
import Dashboard from '../screens/dashboard';
import Stor from '../screens/stor';
import Cart from '../screens/cart';
import CheckOut from '../screens/checkout';
import Orders from '../screens/orders';
import StorMore from '../screens/store-more';
import Address from '../screens/address';
import ProfileTab from '../screens/profiletab';
import Wallet from '../screens/wallet';
import Splash from '../screens/splash';
import Stors from '../screens/stors';










const MainNavigate = (props) => {
  const Stack = createNativeStackNavigator();


  return (


    <Stack.Navigator initialRouteName="splash">
   <Stack.Screen name="splash" component={Splash} options={{ headerShown: false }} /> 
     <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
     <Stack.Screen name="otp" component={OTPscreen} options={{ headerShown: false }} />
     <Stack.Screen name="register1" component={Register1} options={{ headerShown: false }} />
     <Stack.Screen name="register2" component={Register2} options={{ headerShown: false }} />
     <Stack.Screen name="activeorder" component={ActiveOrder} options={{ headerShown: false }} />
     <Stack.Screen name="comments" component={Comments} options={{ headerShown: false }} />
     <Stack.Screen name="dashboard" component={Dashboard} options={{ headerShown: false }} />
     <Stack.Screen name="stor" component={Stor} options={{ headerShown: false }} />


     <Stack.Screen name="stors" component={Stors} options={{ headerShown: false }} />


     <Stack.Screen name="cart" component={Cart} options={{ headerShown: false }} />
     <Stack.Screen name="checkout" component={CheckOut} options={{ headerShown: false }} />
     <Stack.Screen name="orders" component={Orders} options={{ headerShown: false }} />
     <Stack.Screen name="storemore" component={StorMore} options={{ headerShown: false }} />
     <Stack.Screen name="address" component={Address} options={{ headerShown: false }} />
     <Stack.Screen name="profiletab" component={ProfileTab} options={{ headerShown: false }} />
     <Stack.Screen name="wallet" component={Wallet} options={{ headerShown: false }} />
      
      
     
      
     
   
     
   
      
     
      
      
     

    </Stack.Navigator>

  );

}
export default MainNavigate