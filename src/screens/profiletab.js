import React, { useEffect, useState } from 'react';
import { Button, FormControl, Image, Input, Modal, NativeBaseProvider, Progress, } from 'native-base';
import { View, Text, Keyboard, TouchableWithoutFeedback, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, SafeAreaView } from 'react-native';
import Btn from "../components/btn"
import Colors from '../constants/Colors';
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import INPU from '../components/input';
import { getsellerinfo, getwallet, logOut, sendprofile, walletcharge } from '../store/actions/userLogin';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';







const ProfileTab = (props) => {


    const token = "70ef82767fd7bdfd61dd12da00ffbe72f61d117c329faf00cc6864be8de5a7c1acd070f11b353cc972bda680abeb811bd6cad77de9241f0bfc28ca937d43f395"
    // const token = useSelector((store) => store.userLogin.datatoken);
    const [error, seterror] = useState("")
    const [Wallet, setWallet] = useState("")
    //const Seller=useSelector((store)=>store.userLogin.dataseller)
    const dispatch = useDispatch();
    const [Seller, setSeller] = useState({
        first_name: "",
        last_name: ""
    });
    const [load, setload] = useState(false);
    const [loading, setloading] = useState(true);

    const sendProfileHandler = async () => {
        try {

            setload(true)
            const res = await sendprofile(token,
                Seller.first_name,
                Seller.last_name

            )



            if (res.status == 400) {
                seterror(res.message)
            }
            if (res.status == 201) {
                seterror(res.message)
                // props.navigation.navigate("dashboard")
            }
            setload(false)


        } catch (err) {
            console.log(err);
        }
    };



    //پروفایل 
    const getsellerHandler = async () => {
        try {
            const res = await dispatch(getsellerinfo(token));
            //  console.log(res.data);
            setSeller(res.data)
        } catch (err) {
            console.log(err);
        }
    };


    useEffect(() => {
        getsellerHandler();
        GETWAlletHandler();
    }, [])




    const GETWAlletHandler = async () => {
        try {
            setloading(true)
            const res = await dispatch(getwallet(token))
            console.log(res.data);
            setWallet(res.data.wallet)
            setloading(false)
        } catch (err) {
            console.log(err);
        }
    };

    const logOutHandler = async () => {
        try {
          console.log("logout");
          await dispatch(logOut());
          await AsyncStorage.removeItem("access_token");
          props.navigation.navigate("splash");
        } catch (err) {
          console.log(err);
        }
      };



    return (
        <NativeBaseProvider>

            <View style={styles.viewContainer}>



                <View style={{ flexDirection: "row", width: "100%", height: 100, alignItems: "center", justifyContent: "center" }}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.touchback}>
                        <Ionicons name="chevron-back-outline" size={30} color={Colors.background} />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: "MontserratBold", fontSize: 18, color: Colors.black, top: 20 }}>پروفایل</Text>

                    <TouchableOpacity onPress={() => {
                        logOutHandler()
                    }} style={styles.touchbasket}>
                        <Ionicons name="log-out-outline" size={25} color={Colors.background} style={{ left: 2 }} />
                    </TouchableOpacity>


                </View>



                {(loading ?
                        <View style={{ width: "100%", height: 50, alignItems: "center", justifyContent: "center", }} >
                            <ActivityIndicator
                                animating={loading} size={30} color={Colors.primary} />
                        </View>

:

<SafeAreaView>



                <INPU
                    label="نام "
                    styleview={{ marginTop: "13%", }}
                    stylelabel={{ width: "8%" }}
                    value={Seller.first_name}
                    onChangeText={(text) => setSeller({ ...Seller, first_name: text })}

                    keyboardType="default"

                />

                <INPU
                    label="نام خانوادگی"
                    styleview={{ marginTop: 30, }}
                    stylelabel={{ width: "20%" }}
                    value={Seller.last_name}
                    onChangeText={(text) => setSeller({ ...Seller, last_name: text })}



                />
         </SafeAreaView>       
                )}

                <View style={{ width: "100%", height: 30, top: 30, alignItems: "center" }}>
                    <Text style={{ fontFamily: "MontserratBold", fontSize: 18, color: "red" }}>{error}</Text>
                </View>



                <View style={{

                    width: "90%",
                    height: 55,
                    borderRadius: 5,
                    backgroundColor: Colors.primary,
                    left: "5%",
                    marginTop: "18%"
                }}>
                    {(loading ?
                        <View style={{ width: "100%", height: 50, alignItems: "center", justifyContent: "center", left: 60 }} >
                            <ActivityIndicator
                                animating={loading} size={25} color={Colors.background} />
                        </View>
                        :
                        <Text style={styles.textclose}>موجودی کیف پول : {Wallet} تومان</Text>
                    )}
                    <Btn style={styles.btnclose}
                        touchableStyle={{ backgroundColor: Colors.background }}
                        label="شارژ"
                        textStyle={{ color: Colors.primary, position: "absolute" }}
                        onPress={() => props.navigation.navigate("wallet", {
                            payment: ""
                        })}
                    />

                </View>




                <Btn
                    label="ثبت تغییرات "
                    style={{ marginLeft: "5%", marginTop: "40%", height: 55 }}

                    textStyle={{ bottom: 10 }}
                    loading={load}
                    colorspin={Colors.background}
                    sizespin={25}
                    onPress={() => {
                        sendProfileHandler()
                        //props.navigation.navigate("register1")
                    }} />






















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
        fontSize: 13,
        position: "absolute",
        right: 20,
        marginTop: 13,
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




export default ProfileTab