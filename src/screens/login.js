import React, { useEffect, useState } from 'react';
import { Image, NativeBaseProvider, } from 'native-base';
import { View, Text, Keyboard, TouchableWithoutFeedback, StyleSheet, BackHandler } from 'react-native';
import Btn from "../components/btn"
import INPU from "../components/input"
import Colors from '../constants/Colors';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { sendOtp } from '../store/actions/userLogin';






const Login = (props) => {


  const [task, setTask] = useState("");

  


  const sendOtpHandler = async () => {
    try {
      await sendOtp(task)
    } catch (err) {
      console.log(err);
    }
  };







  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
    return () => backHandler.remove()
  }, [])
















  return (
    <NativeBaseProvider>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.viewContainer}>

        <View style={styles.viewlogo}>
        <MaterialCommunityIcons name="fingerprint" color={Colors.primary} size={100} />
        <Text style={{ fontFamily: "MontserratLight", fontSize: 25 }}>چیوانه</Text>
      </View>


          <INPU
            label="شماره موبایل"
            styleview={{ marginTop: 100, }}
            keyboardType="number-pad"
            value={task}
            onChangeText={task => setTask(task)}
            maxLength={10}
            placeholder="9xx xxxxxxx"

          />




          <Btn
            label="ثبت نام / ورود"
            style={{ marginLeft: "5%", marginTop: 150, }}
            textStyle={{ bottom: 10 }}
            onPress={
              () => {
                if (task.length === 10) {
                 sendOtpHandler();
                  props.navigation.replace("otp", {
                    number: task

                  });
                } else {
                  alert("شماره تلفن را صحیح وارد کنید")
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
    marginTop:"40%"
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
  }
})


// const mapStateToProps = (state) => {
//   return {
//     phone: state.userReducers.phone,
//   }
// }

// const mapDispatchToProps = {sendOtp}

export default Login