import React, { useEffect, useState } from 'react';
import { Button, FormControl, Image, Input, Modal, NativeBaseProvider, Progress, } from 'native-base';
import { View, Text, Keyboard, TouchableWithoutFeedback, StyleSheet, ScrollView, TouchableOpacity, TextInput, FlatList, Alert, ActivityIndicator } from 'react-native';
import Btn from "../components/btn"
import Colors from '../constants/Colors';
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { useDispatch, useSelector } from 'react-redux';
import { addnewaddress, Deleteaddress, getALLAddress, getuserAddress, setuserAddress } from '../store/actions/userLogin';
import { useIsFocused } from '@react-navigation/native';



// const Adressbox = (props) => {
//     const [active, setactive] = useState(false);

//     return (

//         <TouchableOpacity onPress={() => setactive((active == false) ? true : false)} style={{
//             width: "88%",
//             height: 90,
//             backgroundColor: (active == true ? Colors.success : Colors.secondText2),
//             left: 20,
//             marginTop: "5%",
//             borderRadius: 10,
//             flexDirection: "row-reverse"
//         }}>

//             <View style={styles.viewtitleboxR}>

//                 <Text style={{
//                     fontFamily: "Montserrat",
//                     fontSize: 13,
//                     color: (active == true ? Colors.background : Colors.black),
//                     lineHeight: 25
//                 }}>{props.address}</Text>
//             </View>

//             <View style={{ flexDirection: "column", width: "20%", height: 90, alignItems: "center", justifyContent: "center" }}>

//                 <TouchableOpacity>
//                     <MaterialCommunityIcons name="pencil" size={25} color={(active == true ? Colors.background : Colors.secondText3)} style={{ right: "12%", }} />
//                 </TouchableOpacity>

//                 <TouchableOpacity>
//                     <MaterialCommunityIcons name="delete-forever" size={25} color={(active == true ? Colors.background : Colors.secondText3)} style={{ right: "12%", marginTop: 5 }} />
//                 </TouchableOpacity>
//             </View>

//         </TouchableOpacity>
//     )
// }




const Address = (props) => {
    const dispatch = useDispatch();
    const [isFetching, setIsFetching] = useState(false);

    const token = "c668f526a8705535b18601b462c0d6f6a75e11e4d2097f8d5b53c6052b65c67ed085dda5cbe210a719012db1c24c4ea49f63e017dd4a758855a5bec184d74d9f"
    //const token = useSelector((store) => store.userLogin.datatoken);
    const [active, setactive] = useState(false);
    const [ALLAddress, setALLAddress] = useState([]);
    const [loading, setloading] = useState(true);

    const getALLaddressHandler = async () => {
        try {
            setIsFetching(true)
            const res = await dispatch(getALLAddress(token));

            if (ALLAddress == "") {
                setIsFetching(false);
            }
            if (res.data.length > 0) {

                setALLAddress(res.data);
                getUseraddressHandler();
            }
            setIsFetching(false);
            console.log(res.data);

        } catch (err) {
            console.log(err);
        }
    };


const isfocuce=useIsFocused()
    useEffect(() => {
        getALLaddressHandler();
    }, [isfocuce])




    // ارسال ادرس
    const sendUseraddressHandler = (id) => {
        try {

            setIsFetching(true)
            const res = setuserAddress(
                token,
                id
            )
            if (res) {
                setactive(id);
                setTimeout(() => {
                    setIsFetching(false)
                }, 2000);
                setTimeout(() => {
                    Alert.alert("", "آدرس به عنوان پیشفرض انتخاب گردید", [
                        {
                            text: "تایید",
                            onPress: () => null,
                            style: "cancel",
                        }
                    ]);
                }, 2700);

            }

        } catch (err) {
            console.log(err);
        }
    };





    const DELETEaddressHandler = (id) => {
        try {

            const res = Deleteaddress(
                token,
                id


            )
            if (res) {
                getALLaddressHandler();
            }


        } catch (err) {
            console.log(err);
        }
    };




    //گرفتن ادرس
    const getUseraddressHandler = async () => {
        try {

            const res = await dispatch(getuserAddress(token));
            if (res) {

                setactive(res.data.id);

            }

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
                    <Text style={{ fontFamily: "MontserratBold", fontSize: 18, color: Colors.black, top: 20 }}>آدرس ها</Text>

                    <TouchableOpacity onPress={() => props.navigation.navigate("register2",{

                                city: "",
                                sector: "",
                                id: "",
                                geo: "",
                                address: "",


                                })} style={styles.touchbasket}>
                        <Ionicons name="add-outline" size={25} color={Colors.background} />
                    </TouchableOpacity>


                </View>



                <FlatList
                    onRefresh={getALLaddressHandler}
                    refreshing={isFetching}
                    data={ALLAddress}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) =>



                        <TouchableOpacity onPress={() => sendUseraddressHandler(item.id)} style={{
                            width: "88%",
                            height: 90,
                            backgroundColor: (active == item.id ? Colors.success : Colors.secondText2),
                            left: 20,
                            marginTop: "5%",
                            borderRadius: 10,
                            flexDirection: "row-reverse"
                        }}>

                            <View style={styles.viewtitleboxR}>

                                <Text style={{
                                    fontFamily: "Montserrat",
                                    fontSize: 13,
                                    color: (active == item.id ? Colors.background : Colors.black),
                                    lineHeight: 25
                                }}>{item.address}</Text>
                            </View>

                            <View style={{ flexDirection: "column", width: "20%", height: 90, alignItems: "center", justifyContent: "center" }}>

                                <TouchableOpacity onPress={() => props.navigation.navigate("register2", {

                                    city: item.city_id,
                                    sector: item.sector_id,
                                    id: item.id,
                                    geo: item.geo,
                                    address: item.address,


                                })} >
                                    <MaterialCommunityIcons name="pencil" size={25} color={(active == item.id ? Colors.background : Colors.secondText3)} style={{ right: "12%", }} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => {
                                    Alert.alert("", "آیا از حذف آدرس مطمئن هستید؟", [
                                        {
                                            text: "خیر",
                                            onPress: () => null,
                                            style: "cancel",
                                        },
                                        { text: "بله", onPress: () => DELETEaddressHandler(item.id) },
                                    ]);




                                }} >
                                    <MaterialCommunityIcons name="delete-forever" size={25} color={(active == item.id ? Colors.background : Colors.secondText3)} style={{ right: "12%", marginTop: 5 }} />
                                </TouchableOpacity>

                            </View>

                        </TouchableOpacity>


                    }
                    keyExtractor={item => item.id}

                />








































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
        width: "11%",
        height: 40,
        borderRadius: 10,
        position: "absolute",
        right: "8%",
        top: "50%",
        backgroundColor: Colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },

    viewbox: {
        width: "88%",
        height: 90,
        backgroundColor: Colors.success,
        left: 20,
        marginTop: "5%",
        borderRadius: 10,
        flexDirection: "row-reverse"


    },
    viewboxdark: {
        width: "88%",
        height: 90,
        backgroundColor: Colors.secondText2,
        left: 20,
        marginTop: "5%",
        borderRadius: 10,
        flexDirection: "row-reverse"


    },
    viewtitlebox: {
        flexDirection: "column",
        width: "20%",
        height: 90,
        alignItems: "center"
    },
    viewtitleboxR: {
        width: "80%",
        height: 90,
        alignItems: "center",
        justifyContent: "center",
        paddingRight: 10,




    },

    textboxdate: {
        fontFamily: "Montserrat",
        fontSize: 13,
        color: Colors.background,
        lineHeight: 25

    },
    textboxdatedark: {
        fontFamily: "Montserrat",
        fontSize: 13,
        color: Colors.black,
        lineHeight: 25



    },
    touchback: {
        justifyContent: "center",
        alignItems: "center",
        width: "11%",
        height: 40,
        borderRadius: 10,
        backgroundColor: Colors.primary,
        position: "absolute",
        left: "9%",
        top: "50%",
        left: "6%"
    },


})




export default Address