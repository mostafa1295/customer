import React, { useEffect, useState } from 'react';
import { Image, NativeBaseProvider, Progress, } from 'native-base';
import { View, Text, Keyboard, TouchableWithoutFeedback, StyleSheet, ScrollView, TouchableOpacity, TextInput, FlatList, Alert } from 'react-native';
import Btn from "../components/btn"
import Colors from '../constants/Colors';
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import Maps from './maporder';
import { getusercart, lowquantityProduct, removeALLcart, removecart, SendquantityProduct } from '../store/actions/product';
import { useDispatch, useSelector } from 'react-redux';
import { setquantity } from '../store/actions/userLogin';
import { useIsFocused } from '@react-navigation/native';


const Cart = (props) => {
    const dispatch = useDispatch();
    const token = "c668f526a8705535b18601b462c0d6f6a75e11e4d2097f8d5b53c6052b65c67ed085dda5cbe210a719012db1c24c4ea49f63e017dd4a758855a5bec184d74d9f"
    //const token = useSelector((store) => store.userLogin.datatoken);
    const [isFetching, setIsFetching] = useState(false);
    const [Carts, setCart] = useState([]);
    const [State, setState] = useState([]);
    const [ID, setID] = useState("");
    const [key, setkey] = useState("");
    const [activen, setactiven] = useState(false);
    const [counter, setCounter] = useState(1);
    const incrementCounter = () => setCounter(counter + 1);
    let decrementCounter = () => setCounter(counter - 1);
    const producting = useSelector((store) => store.userLogin.datapro)
    const [error, seterror] = useState("")
    const [load, setload] = useState(false);
    if (counter <= 0) {
        decrementCounter = () => setCounter(1);
    }

    






    // const getusercartHandler = async () => {
    //     try {
    //         setIsFetching(true)
    //         const res = await dispatch(getusercart(token));

    //         if (Carts == "") {
    //             setIsFetching(false);
    //         }
    //         // console.log(res.data);

    //         setCart(res.data)

    //         setIsFetching(false);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };


    const isfocuse = useIsFocused()
    useEffect(() => {
       // getusercartHandler();
        setquantityHandler()


    }, [isfocuse])




    //  حذف  کلی محصولات 
    const DELETEALLcartHandler = () => {
        try {
            setIsFetching(true)
            // const resp = removeALLcart(
            //     token,

            // )

            // if (resp) {
            //     getusercartHandler();
            // }
            
            producting.length = 0
            setTimeout(() => {
                setIsFetching(false)
            }, 800);
            setTimeout(() => {
                Alert.alert("", " با موفقیت خالی شد    ", [
                    {
                        text: "باشه",
                        onPress: () => {},
                        style: "cancel",
                    }
                ]);
            }, 1000);

        } catch (err) {
            console.log(err);
        }
    };






    // افزودن محصولات
    const SendquantityHandler = async () => {

        try {
            setload(true)
            const res = await SendquantityProduct(token, producting);
            console.log(res);

            if (res.status == 404) {
                seterror("سبد محصولات خالی می باشد")
            }
            if (res.status == 200) {
                props.navigation.navigate("checkout", {
                tot: tot
            })
            }
            setload(false)
        } catch (err) {
            console.log(err);
        }
    }





  





    // // افزودن محصولات
    // const SendquantityHandler = async () => {
    //     try {
    //         const res = await SendquantityProduct(token,
    //             ID,
    //             counter
    //         );
    //         console.log(res);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    // //کاهش محصول
    // const LowquantityHandler = async () => {
    //     try {
    //         const res = await lowquantityProduct(token,
    //             ID,
    //             counter == 0 ? 1 : counter + 1
    //         );
    //         console.log(res);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };







    const separate = (num) => {
        let number = num.replace(/\D/g, "");
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };


    const total = (producting ? (producting.reduce((a, v) => a = a + v.price , 0)) : 0);
    const quantity = (producting ? (producting.reduce((a, v) => a = a + v.quantity, 0)) : 0);



  const tot= producting.reduce((sum, currentItem) => { 
        return sum + (currentItem.price * currentItem.quantity); 
    }, 0);

    console.log(tot);
    //افزودن به سبد  بالا
    const setquantityHandler = async () => {
        try {
           
            const res = await dispatch(setquantity(quantity));
            // console.log(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };




    return (
        <NativeBaseProvider>

            <View style={styles.viewContainer}>



                <View style={{ flexDirection: "row", width: "100%", height: 100, alignItems: "center", justifyContent: "center" }}>
                    <TouchableOpacity onPress={() => {
                           setquantityHandler()
                        props.navigation.goBack()
                    }} style={styles.touchback}>
                        <Ionicons name="chevron-back-outline" size={30} color={Colors.background} />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: "MontserratBold", fontSize: 18, color: Colors.black, top: 20 }}>سبد خرید</Text>

                    <TouchableOpacity onPress={() => {

                        Alert.alert("", " از این کار مطمئن هستید؟", [
                            {
                                text: "خیر",
                                onPress: () => null,
                                style: "cancel",
                            },
                            {
                                text: "بله", onPress: () => {


                                    DELETEALLcartHandler()


                                }
                            },
                        ]);


                    }} style={styles.touchbasket}>
                        <MaterialCommunityIcons name="delete-forever" size={25} color={Colors.background} />
                    </TouchableOpacity>


                </View>









                <FlatList
                     //onRefresh={DELETEALLcartHandler}
                     refreshing={isFetching}
                    data={producting}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, i }) =>

                        <View key={i} style={styles.viewproducting}>

                            <View style={styles.viewimageproducting}>
                                <Image source={{ uri: item.thumbnail ? item.thumbnail : "https://chivane.com/wp-content/uploads/2022/01/61b4ea65b9f79.jpeg" }} alt="image" style={{ width: 70, height: 70, borderRadius: 10 }} />
                            </View>

                            <View style={{ width: "50%", height: 60, marginRight: 10, }}>
                                <Text style={styles.textproducting}>{item.title}</Text>
                                <Text style={styles.priceproducting}>{separate(JSON.stringify(item.price))} تومان</Text>
                            </View>

                            {/* <TouchableOpacity onPress={() =>{
                 setactiven(item.product_id)
                 setID(item.product_id)
                 }} style={{ borderRadius: 5, width: 30, height: 30, backgroundColor: Colors.secondary, alignItems: "center", justifyContent: "center", left: 15 }}>
                    <Ionicons name="add-outline" size={25} color={Colors.background} />
                </TouchableOpacity> */}

                            {/* {item.product_id == activen ?

                                <View style={styles.viewadd}>
                                    <TouchableOpacity onPress={() => {
                                        incrementCounter()
                                    
                                            SendquantityHandler()
                                       
                                    }} style={styles.touchadd}>
                                        <Ionicons name="add-outline" size={15} color={Colors.background} />
                                    </TouchableOpacity>
                                    <Text style={{ fontFamily: "MontserratLight", fontSize: 15, color: Colors.primary }} >{counter}</Text>
                                    <TouchableOpacity onPress={() => {
                                        decrementCounter()
                                       
                                            LowquantityHandler()
                                    
                                    }} style={styles.touchadd}>
                                        <Ionicons name="remove-outline" size={15} color={Colors.background} />
                                    </TouchableOpacity>
                                </View >
                                : */}
                            <View onPress={() => {
                                setactiven(item.product_id)
                                setID(item.product_id)
                                setkey(item.key)


                            }} style={{ borderRadius: 5, width: 30, height: 30, backgroundColor: Colors.secondary, alignItems: "center", justifyContent: "center", left: "25%" }}>
                                <Text style={{ fontFamily: "MontserratLight", fontSize: 15, color: Colors.background }} >{item.quantity}</Text>
                            </View>
                            {/* } */}
              
                        </View >
                    }
                    keyExtractor={item => item.product_id}

                />




                <View style={{ width: "100%", height: 30, top: 30, alignItems: "center" }}>
                    <Text style={{ fontFamily: "MontserratBold", fontSize: 18, color: "red" }}>{error}</Text>
                </View>

                <View style={styles.viewclose}>


                    <View style={{
                        flexDirection: "row",
                        width: "87%",
                        height: 55,
                        borderRadius: 5,
                        backgroundColor: Colors.success
                    }}>
                        <Text style={styles.textclose}>مجموع سبد : {separate(JSON.stringify(tot))} تومان</Text>

                        <Btn style={styles.btnclose}
                            touchableStyle={{ backgroundColor: Colors.background }}
                            label="تکمیل خرید"
                            loading={load}
                            colorspin={Colors.success}
                            sizespin={25}
                            textStyle={{ color: Colors.success, position: "absolute" }}
                            onPress={SendquantityHandler} />

                    </View>


                </View>




            </View>

        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    viewproducting: {
        flexDirection: "row-reverse",
        width: "100%",
        height: 80,
        alignItems: "center",
        marginTop: 10
    },
    viewimageproducting: {
        width: 70,
        height: 70,
        alignItems: "center",
        justifyContent: "center",
        elevation: 3,
        borderRadius: 15,
        marginRight: 30
    },
    textproducting: {
        fontFamily: "MontserratLight",
        fontSize: 17,
        marginTop: 5,
        color: Colors.black
    },
    priceproducting: {
        fontFamily: "MontserratLight",
        fontSize: 13,
        color: Colors.primary,

    },
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
        right: "9%",
        top: "50%",
        backgroundColor: Colors.primary,
        alignItems: "center",
        justifyContent: "center",
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
    viewclose: {
        marginTop: "10%",
        marginBottom: "10%",
        width: "100%",
        height: 55,
        alignItems: "center",
        justifyContent: "center",
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
    viewadd: {
        alignItems: "center",
        flexDirection: "column",
        width: "6%",
        height: 60,
        backgroundColor: Colors.RGB,
        position: "absolute",
        right: "7%"
    },
    touchadd: {
        borderRadius: 5,
        width: 20,
        height: 20,
        backgroundColor: Colors.secondary,
        alignItems: "center",
        justifyContent: "center"
    }
})




export default Cart