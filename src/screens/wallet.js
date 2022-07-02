import React, { useEffect, useState } from 'react';
import { Button, FormControl, Image, Input, Modal, NativeBaseProvider, Progress, } from 'native-base';
import { View, Text, Keyboard, TouchableWithoutFeedback, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import Btn from "../components/btn"
import Colors from '../constants/Colors';
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import INPU from '../components/input';
import {  getwallet, walletcharge } from '../store/actions/userLogin';
import { useDispatch, useSelector } from 'react-redux';







const Wallet = (props) => {
const dispatch=useDispatch()

    const token = "70ef82767fd7bdfd61dd12da00ffbe72f61d117c329faf00cc6864be8de5a7c1acd070f11b353cc972bda680abeb811bd6cad77de9241f0bfc28ca937d43f395"
   // const token = useSelector((store) => store.userLogin.datatoken);
    //const [error,seterror]=useState("")
   
    const [Price, setPrice] = useState(props.route.params.payment);
const [Wallet,setWallet]=useState("")
const [loading, setloading] = useState(true);



      
      const CHARGEHandler = async () => {
        try {
          await walletcharge(token,Price)
        } catch (err) {
          console.log(err);
        }
      };


   const GETWAlletHandler = async () => {
        try {
        setloading(true)
        const res=  await dispatch(getwallet(token)) 
        console.log(res.data);
        setWallet(res.data.wallet)
        setloading(false)
        } catch (err) {
          console.log(err);
        }
      };


useEffect(()=>{
    GETWAlletHandler();
},[])





      const separate = (num) => {
        const number = num.replace(/\D/g, "")
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
    


    return (
        <NativeBaseProvider>

            <View style={styles.viewContainer}>



                <View style={{ flexDirection: "row", width: "100%", height: 100, alignItems: "center", justifyContent: "center" }}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.touchback}>
                        <Ionicons name="chevron-back-outline" size={30} color={Colors.background} />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: "MontserratBold", fontSize: 18, color: Colors.black, top: 20 }}>کیف پول</Text>



                </View>




               


                  

            

            
                   


                   <View style={{
                        
                        position:"relative",
                        width: "90%",
                        height: 55,
                        borderRadius: 5,
                        backgroundColor: Colors.primary,
                        left:"5%",
                        marginTop:"13%",
                        alignItems:"center",
                        justifyContent:"center"
                    }}>
                         {(loading ?
                        <View style={{ width: "100%", height: 50, alignItems: "center", justifyContent: "center",  }} >
                            <ActivityIndicator
                                animating={loading} size={25} color={Colors.background} />
                        </View>
                        :
                        <Text style={styles.textclose}>موجودی کیف پول : {Wallet} تومان</Text>

                         )}
                    </View>

                    <INPU
                    label="مبلغ افزایش"
                    styleview={{ marginTop: "30%", }}
                    stylelabel={{ width: "20%" }}
                    
                    value={separate(Price)}
                    onChangeText={(text) => setPrice(text)}
                   keyboardType="numeric"


                />

                {/* <View style={{width:250,height:50,alignItems:"center",justifyContent:"center",borderRadius:15,backgroundColor:Colors.secondText2,left:80,top:70,}}>
                    <Text style={{fontFamily: "Montserrat", fontSize: 15, color: Colors.black,}}>مبلغ قابل پرداخت : {separate(JSON.stringify(props.route.params.payment))} تومان</Text>
                </View>
                 */}
                 
                    <Btn
            label="پرداخت و شارژ"
            style={{ marginLeft: "5%", marginTop: "40%",height:55}}
            textStyle={{ bottom:10 }}
            onPress={CHARGEHandler}/>
  







              













            </View>

        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({

    viewContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: Colors.background
    },
    touchbasket: {
        width: "8%",
        height: 35,
        borderRadius: 10,
        position: "absolute",
        right: "6%",
        top: "50%",
        backgroundColor: Colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },
    touchback: {
        justifyContent: "center",
        alignItems: "center",
        width: "8%",
        height: 35,
        borderRadius: 10,
        backgroundColor: Colors.primary,
        position: "absolute",
        left: "9%",
        top: "50%",
        left: "6%"
    },
    textclose: {
        fontFamily: "Montserrat",
        fontSize: 14,
        color: Colors.background
    },
    btnclose: {
        width: "35%",
        height: 40,
        marginTop: 8,
        position: "absolute",
        left: 18
    },

})




export default Wallet