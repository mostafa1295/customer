import React, { useEffect, useState } from 'react';
import { CheckIcon, Image, NativeBaseProvider, Progress, Select, } from 'native-base';
import { View, Text, Keyboard, TouchableWithoutFeedback, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import Btn from "../components/btn"
import Colors from '../constants/Colors';
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { payproduct, setproducting } from '../store/actions/userLogin';
import { getCheckout, getusercart } from '../store/actions/product';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';








const CheckOut = (props) => {

    const dispatch = useDispatch();
    const token = "c668f526a8705535b18601b462c0d6f6a75e11e4d2097f8d5b53c6052b65c67ed085dda5cbe210a719012db1c24c4ea49f63e017dd4a758855a5bec184d74d9f"
    //const token = useSelector((store) => store.userLogin.datatoken);
    const [isFetching, setIsFetching] = useState(false)
    const [pic, setpic] = useState("");

    const [loading, setloading] = useState(true);


    const [Check, setCheck] = useState("");

    const [product, setproduct] = useState([]);


    const getusercartHandler = async () => {
        try {
            setIsFetching(true)
            const res = await dispatch(getusercart(token));

            // if (Carts == "") {
            //     setIsFetching(false);
            // }
            console.log(res.data);

            // setCart(res.data)

            setIsFetching(false);
        } catch (err) {
            console.log(err);
        }
    };

    const getCheckoutHandler = async () => {
        try {
            setIsFetching(true)
            setloading(true)
            const res = await dispatch(getCheckout(token));


            // console.log(res.data);

            setCheck(res.data.detail)
            setproduct(res.data.cart)


            setIsFetching(false)
            setloading(false)
        } catch (err) {
            console.log(err);
        }
    };


    const isfocuse = useIsFocused()
    useEffect(() => {
        getCheckoutHandler();
        getusercartHandler()
    }, [isfocuse])







    const total = props.route.params.tot





    const separate = (num) => {
        const number = num.replace(/\D/g, "")
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }


    return !loading ? (

        <NativeBaseProvider>


            <View style={styles.viewContainer}>



                <View style={styles.viewback}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.touchback}>
                        <Ionicons name="chevron-back-outline" size={30} color={Colors.background} />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: "MontserratBold", fontSize: 18, color: Colors.black, top: 20 }}>پرداخت</Text>
                </View>
                <ScrollView style={{ width: "100%" }}>


                    <TouchableOpacity onPress={() => props.navigation.navigate("address")} style={styles.viewbox}>
                        <View style={styles.viewtitlebox}>
                            <Text style={styles.texttitle}>آدرس ارسال :</Text>
                            <Ionicons name="chevron-down-outline" size={25} color={Colors.black} style={{ position: "absolute", right: "6%", top: "25%" }} />
                        </View>

                        <View style={{ width: "100%", height: 45, }}>
                            <Text style={styles.textbox}>{Check.address}</Text>
                        </View>

                    </TouchableOpacity>


                    <View style={styles.viewbox}>
                        <View style={styles.viewtitlebox}>
                            <Text style={styles.texttitle}>روش پرداخت :</Text>
                            <Ionicons name="chevron-down-outline" size={25} color={Colors.black} style={{ position: "absolute", right: "6%", top: "25%" }} />
                        </View>

                       
                        <View style={{ width: "100%", height: 45, }}>
                        <Select
                            selectedValue={pic}
                            w="100%"
                            h={71}
                            dropdownIcon={true}
                            paddingRight={7}
                            paddingTop={10}
                            borderColor={Colors.secondText2}
                            borderWidth={1}
                            bottom={5}
                            variant="filled"
                            fontFamily="Montserrat"
                            fontSize={12}
                            flexDirection="row-reverse"
                            accessibilityLabel="انتخاب کنید"
                            placeholder="انتخاب کنید"
                            onValueChange={(t) => setpic(t)}
                            _selectedItem={{
                                bg: Colors.primary,
                                startIcon: <CheckIcon size={5} color={Colors.black} />,

                            }}
                        >


                            <Select.Item _text={{
                                style: { fontFamily: "Montserrat" }}}
                                 label="پرداخت آنلاین" value="پرداخت آنلاین" />
                            <Select.Item
                            _text={{
                                style: { fontFamily: "Montserrat" }}}
                            label="کارتخوان" value="کارتخوان" />
                           

                        </Select>
                        </View>

                    </View>



                    <View style={styles.title}>
                        <Text style={{ fontFamily: "MontserratBold", fontSize: 15, color: Colors.black, }}>
                            اقلام سفارش
                        </Text>
                    </View>

                    {product.map((item, i) => {


                        return (
                            <View key={i} style={styles.viewboxproduct1}>
                                <View style={styles.viewtitleboxpro}>
                                    <Text style={styles.texttitleR}>{item.product_name} (x{item.quantity})</Text>
                                    <Text style={styles.texttitleL}>{separate(JSON.stringify(item.product_price*item.quantity))}</Text>
                                </View>

                            </View>
                        )
                    })}




                    <View style={styles.title}>
                        <Text style={{ fontFamily: "MontserratBold", fontSize: 15, color: Colors.black, }}>
                            اطلاعات پرداخت
                        </Text>
                    </View>


                    <View style={styles.viewboxproduct}>
                        <View style={styles.viewtitleboxpro}>
                            <Text style={styles.texttitleR}> مجموع اقلام </Text>
                            <Text style={styles.texttitleL}>{separate(JSON.stringify(total))} تومان</Text>
                        </View>

                        <View style={styles.viewtitleboxpro}>
                            <Text style={styles.texttitleR}> هزینه پیک </Text>
                            <Text style={styles.texttitleL}>{separate(JSON.stringify(Check.pake_price))} تومان</Text>
                        </View>

                        <View style={styles.viewtitleboxpro}>
                            <Text style={styles.texttitleR}> مجموع کل سفارش </Text>
                            <Text style={styles.texttitleL}>{separate(JSON.stringify(Check.pake_price + total))} تومان</Text>
                        </View>


                    </View>












                </ScrollView>


                <View style={styles.viewclose}>


                    <View style={{
                        flexDirection: "row",
                        width: "87%",
                        height: 55,
                        borderRadius: 5,
                        backgroundColor: Colors.success
                    }}>
                        <Text style={styles.textclose}>مبلغ قابل پرداخت : {separate(JSON.stringify(total + Check.pake_price))} تومان</Text>

                        <Btn style={styles.btnclose}
                            touchableStyle={{ backgroundColor: Colors.background }}
                            label="پرداخت"
                            textStyle={{ color: Colors.success, position: "absolute" }}
                            onPress={() => {
                                // PAYHandler()
                                props.navigation.navigate("wallet", {
                                    payment: separate(JSON.stringify(total + Check.pake_price))
                                })
                            }} />

                    </View>


                </View>






            </View>

        </NativeBaseProvider>

    ) : (
        <NativeBaseProvider>
            <View style={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "center", backgroundColor: Colors.background }} >
                <ActivityIndicator
                    animating={loading} size={30} color={Colors.primary} />

                <Text style={{ fontFamily: "MontserratBold", fontSize: 25, color: Colors.primary, marginTop: 30 }}>لطفا شکیبا باشید...</Text>
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
    viewbox: {
        width: "88%",
        height: 90,
        backgroundColor: Colors.secondText2,
        left: "6%",
        marginTop: "5%",
        borderRadius: 10
    },
    viewtitlebox: {
        flexDirection: "row-reverse",
        width: "100%",
        height: 45
    },
    texttitle: {
        fontFamily: "MontserratBold",
        fontSize: 15,
        color: Colors.black,
        left: "60%",
        top: "3%"

    },
    textbox: {
        position: "absolute",
        right: "7%",
        fontFamily: "MontserratLight",
        fontSize: 13,
        color: Colors.black

    },

    title: {
        width: "88%",
        height: 30,
        backgroundColor: Colors.background,
        left: "6%",
        marginTop: "6%",
        borderRadius: 10
    },
    viewboxproduct: {
        width: "88%",
        height: 130,
        backgroundColor: Colors.background,
        left: "6%",
        marginTop: "2%",
        borderRadius: 10
    },
    viewboxproduct1: {
        width: "88%",
        height: 50,
        backgroundColor: Colors.background,
        left: "6%",
        marginTop: "2%",
        borderRadius: 10
    },
    viewtitleboxpro: {
        flexDirection: "row-reverse",
        width: "100%",
        height: 45
    },
    texttitleR: {
        fontFamily: "MontserratLight",
        fontSize: 13,
        color: Colors.black,
        left: "40%",
        top: "3%"

    },
    texttitleL: {
        fontFamily: "MontserratLight",
        fontSize: 13,
        color: Colors.black,
        position: "absolute",
        right: "4%",
        top: "27%"

    },







    viewback: {
        flexDirection: "row",
        width: "100%",
        height: 100,
        alignItems: "center",
        justifyContent: "center"
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
        right: "4%",
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
    },

})




export default CheckOut