import * as React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { View, Image, Text, StatusBar } from 'react-native';
import Colors from '../constants/Colors';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useDispatch } from 'react-redux';
import { setAccessToken } from '../store/actions/userLogin';


function Splash(props) {
  const dispatch = useDispatch();
  const [animating, setAnimating] = React.useState(true);


  const chivane =async () => {

try {
  const access_token = await AsyncStorage.getItem("access_token");
  if (access_token) {
    await dispatch(setAccessToken(access_token));
    props.navigation.replace('dashboard')
  }else{
    setAnimating(false);
     props.navigation.replace('login')
  }
} catch (error) {
  console.log(e)
}





  }
  React.useEffect(() => {
    const ac = new AbortController();
    setTimeout(() => {
      chivane()
    }, 3000);
    return () => ac.abort();
    
  }, []);


  // const getStorage = async () => {
  //   AsyncStorage.getItem("access_token")
  //     .then((Token) => {
  //       console.log(Token);
  //       if (Token != null) {
  //         setDone(true);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // React.useEffect(() => {
  //   if (done) {
  //     props.navigation.replace("dashboard");
  //   }else{
  //     props.navigation.replace("login");
  //   }
  // }, [done]);



  return (



    <View style={styles.viewContainer}>
      <StatusBar backgroundColor="white" />
      <Image source={require('../../assets/Logo-White-Transparent.png')} alt="image" style={styles.image} />
      {/* <Text style={styles.text}>
        چیوانه
      </Text > */}
      <ActivityIndicator color={Colors.background} size={40} animating={animating} />

    </View>

  );
}

const styles = StyleSheet.create({
  viewContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.primary,
    justifyContent: "flex-start",
    alignItems: 'center',
    justifyContent:"center"
  },
  text: {
    color: 'black',
    fontSize: 50,
    fontFamily: "Montserrat",
    bottom: 10
  },
  image: {
    width: 250,
    height: 250,
    marginTop: "10%"
  }

})
export default Splash
