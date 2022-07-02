import React, { useEffect, useState } from 'react';
import { Image, NativeBaseProvider, } from 'native-base';
import { View, Text, Keyboard, TouchableWithoutFeedback, StyleSheet, TouchableOpacity, Alert ,ActivityIndicator} from 'react-native';



import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OTPTextInput from 'react-native-otp-textinput'
import { MaterialCommunityIcons } from "@expo/vector-icons"
import Btn from '../components/btn';
import Colors from '../constants/Colors';
import { login, sendOtp } from '../store/actions/userLogin';


function OTPscreen(props) {
   const dispatch = useDispatch();
  const [otp, setotp] = useState("")
  const [login_msg, setlogin_msg] = useState("");
  const [mytime, setmyTime] = useState(60);
   const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (mytime !== 0) {
        setmyTime(mytime - 1);
      }
    }, 1000);
    return () => {
      clearTimeout(timer);
    };

  });


  const loginHandler = async () => {
    try {
      setLoading(true)
      const respo = await dispatch(login(
        props.route.params.number,
        otp
      )
      );

      console.log(respo);
      if (respo.success == false) {
        setlogin_msg(respo.data.msg)
       
      }
      if (respo.success == true) {
        await AsyncStorage.setItem("access_token", respo.data.access_token);
        props.navigation.navigate("register1")

      }
      setLoading(false)

    } catch (err) {
      console.log(err);
    }
  };






  const sendOtpHandler = async () => {
    try {
      const time = await sendOtp(props.route.params.number);
      setmyTime(60);
    } catch (err) {
      console.log(err);
    }
  };



  return (
    <NativeBaseProvider>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>


        <View style={styles.viewContainer}>

          <View style={styles.viewlogo}>

          <MaterialCommunityIcons name="fingerprint" color={Colors.primary} size={100} />
        <Text style={{ fontFamily: "MontserratLight", fontSize: 25 }}>چیوانه</Text>
          </View>





          <View style={styles.viewotp}>

          <OTPTextInput
          inputCount={6}
          tintColor={Colors.primary}
          containerStyle={{marginBottom:30}}
          textInputStyle={{  borderRadius: 10,height:60,
            borderWidth: 2,}}
          handleTextChange={otp => setotp(otp)}
          />

          </View>

          <TouchableOpacity style={{ alignItems: "center", marginRight: "30%" }} onPress={() => props.navigation.navigate("login")} >
            <Text style={styles.fonttext}>تغییر شماره</Text>
          </TouchableOpacity>

          <View style={styles.viewtimer}>
            <Text style={styles.fonttext}>

             {mytime > 0 ? mytime :
                <TouchableOpacity onPress={sendOtpHandler} >
                  <Text style={styles.fonttext}>ارسال مجدد کد</Text>
                </TouchableOpacity>
              }

            </Text>
          </View>

 <View style={{ width: "100%", height: 50, alignItems: "center" }} >
            <Text style={{ fontFamily: "Montserrat", fontSize: 15, color: "red" }}>
               {(login_msg ? "کدارسال شده به کاربر با کد وارد شده یکسان نمی باشد" : "")} 
            </Text>
            <ActivityIndicator size={30} color="red"
              animating={isLoading}
            />
          </View> 





          <Btn
            label="تایید کد"
            style={{ marginLeft: "5%", marginTop: 60, }}
            textStyle={{ bottom:10 }}
            // onPress={()=>props.navigation.navigate("register1")}
            onPress={
              () => {
                if (otp.length === 6) {
                  loginHandler()
                } else {
                  Alert.alert("اخطار",
                    "کد را صحیح وارد کنید",
                    [
                      { text: "باشه", }
                    ],

                  )
                }
              }}
          />



        </View>
      </TouchableWithoutFeedback>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({

  viewContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.background
  },
  viewlogo: {
    width: "100%",
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80
  },
  imagelogo: {
    width: 110,
    height: 140,
  },
  textlogo: {
    fontFamily: "Montserrat",
    fontSize: 24,
    position: "absolute",
    top: "90%"
  },
  viewotp: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: "25%"
  },
  fonttext: {
    fontFamily: "Montserrat",
    fontSize: 15,
    color: Colors.primary
  },
  viewtimer: {
    width: 100,
    height: 20,
    alignItems: "center",
    position: "relative",
    left: 190,
    bottom: 26,
  },
  fielotp: {
    width: 45,
    height: 60,
    borderWidth: 1,
    margin: 2,
    color: 'black',
  }
})
export default OTPscreen