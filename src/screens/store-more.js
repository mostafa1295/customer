import React, { useEffect, useState } from 'react';
import { Image, NativeBaseProvider, Progress, } from 'native-base';
import { View, Text, Keyboard, TouchableWithoutFeedback, StyleSheet, ScrollView, TouchableOpacity, FlatList, ActivityIndicator, } from 'react-native';
import Btn from "../components/btn"
import Colors from '../constants/Colors';
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import Maps from './mapmore';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleShop } from '../store/actions/product';
import moment from "moment"

const Timing = (props) => {
    return (
        <View style={styles.viewtiminng}>

            <View style={styles.viewtimeleft}>
                <Text style={{ fontFamily: "Montserrat", fontSize: 14, }}>{props.timeleft}</Text>
            </View>

            <View style={styles.viewtextweek}>
                <Text style={{ fontFamily: "Montserrat", fontSize: 14, }}>{props.weekday}</Text>
            </View>


            <View style={{ alignItems: "center", justifyContent: "center", width: "30%", height: 40, backgroundColor: Colors.secondText2, borderRadius: 7, position: "absolute", right: "9%", bottom: "3%" }}>
                <Text style={{ fontFamily: "Montserrat", fontSize: 14, }}>{props.timeright}</Text>
            </View>
        </View>
    )
}



const StorMore = (props) => {
    const token = "c6e51a7a85f6de25e8724dca9cddd4b14da8d358fc31592a74bd98986b04a7a11d181bd80dcb5d787fd8e21f7adcc66f981f7cba7bbc1fc7eb9b238d99d5de60"
    // const token = useSelector((store) => store.userLogin.datatoken);
    const dispatch = useDispatch();
    const [loading, setloading] = useState(true);
    const [Shop, setShop] = useState("");
    const [Rating, setRating] = useState("");
    const [timing1, settiming1] = useState("");
    const [timing2, settiming2] = useState("");
    const [Category, setCategory] = useState([]);
    const [Position, setPosition] = useState("");
    const [Positionlon, setPositionlon] = useState("");
    const QUN = useSelector((store) => store.userLogin.dataQun);



    const getsingleShopHandler = async () => {
        try {
            setloading(true)
            const res = await dispatch(getSingleShop(token,
                props.route.params.ids
            ));
            console.log(res.data.data);
            setShop(res.data.data)
            setRating(res.data.data.rating)
            settiming1(res.data.data.times.part_one)
            settiming2(res.data.data.times.part_two)
            setCategory(res.data.data.categories)
            setloading(false)
        } catch (err) {
            console.log(err);
        }
    };



    useEffect(() => {
        getsingleShopHandler();

    }, [])



    //نقشه
    function handlePosition(value) {
        setPosition(value);


    }
    //latitude": 37.28701447473043, "longitude": 49.59269855171443











    const separate = (num) => {
        const number = num.replace(/\D/g, "")
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    return !loading ? (
        <NativeBaseProvider>

            <View style={styles.viewContainer}>


                <View style={styles.viewlogo}>

                    <Image source={{ uri: Shop.thumbnail ? Shop.thumbnail : "https://chivane.com/wp-content/uploads/2022/01/61b4ea65b9f79.jpeg" }} alt="image" style={{ width: "100%", height: 400 }} />
                </View>






                <ScrollView >


                    <View style={{
                        width: "100%", marginBottom: "13%", backgroundColor: Colors.background, marginTop: "70%", borderTopRightRadius: 60,
                        borderTopLeftRadius: 60,
                    }}>

                        <View style={{ height: 10, width: "100%", bottom: "50%", flexDirection: "row" }}>
                            <TouchableOpacity onPress={() => {

                                props.navigation.goBack()
                            }} style={styles.touchback}>
                                <Ionicons name="chevron-back-outline" size={30} color={Colors.background} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                props.navigation.navigate("cart")
                            }} style={styles.touchbasket}>
                                <MaterialCommunityIcons name="cart" size={25} color={Colors.primary} />
                            </TouchableOpacity>
                            <View style={styles.viewavatar}>
                                <Text style={styles.textavatar}>{QUN ? QUN : 0}</Text>
                            </View>


                        </View>

                        <View style={styles.viewundermap}>
                            <View style={styles.viewline}></View>
                            <Text style={styles.textlogo}>{Shop.shop_name}</Text>






                            {Category.map((item, i) => {
                                return (


                                    <Text key={i} style={{ fontFamily: "MontserratLight", fontSize: 12, top: "25%", left: 164 }}> {item.name}</Text>


                                )
                            })

                            }










                            <View style={styles.viewrating}>
                                <Ionicons name="star" size={20} color={Colors.background} style={{ left: "40%" }} />
                                <Text style={styles.textrating}>{Rating.rating}</Text>
                            </View>

                        </View>

                        <View style={{ flexDirection: "row-reverse", width: "100%", }}>
                            <View style={styles.viewprice} >
                                <Image source={require('../../assets/image/fast1.png')} alt="image" style={{ width: 35, height: 35 }} />
                                <Text style={styles.texttouch}>{separate(JSON.stringify(Shop.pake_price))} تومان</Text>
                            </View>

                            <TouchableOpacity onPress={() => props.navigation.navigate("comments", {
                                ids: Shop.id
                            })} style={styles.viewbox} >
                                <Image source={require('../../assets/image/quotes.png')} alt="image" style={{ width: 35, height: 35 }} />
                                <Text style={styles.texttouch}>{Shop.comment_count} نظر</Text>
                            </TouchableOpacity>

                            <View style={styles.viewbox} >
                                <Image source={require('../../assets/image/backtime.png')} alt="image" style={{ width: 35, height: 35 }} />
                                <Text style={styles.texttouch}>{Shop.status}</Text>
                            </View>

                            <View style={styles.viewboxinfo} >
                                <Image source={require('../../assets/image/searchwhite.png')} alt="image" />
                                <Text style={styles.texttouchinfo}>اطلاعات بیشتر</Text>
                            </View>

                        </View>


                        <View style={{ width: "100%", height: 60, marginTop: 30 }}>

                            <Text style={styles.textlogotitle}>موقعیت مکانی</Text>
                            <Text style={{ fontFamily: "MontserratLight", fontSize: 12, position: "absolute", right: "10%", top: 35 }}>{Shop.address}  </Text>

                        </View>


                        <View style={styles.viewmap}>
                            <Maps onSelectPos={handlePosition} />
                        </View>



                        <View style={{ width: "100%", height: 30, marginTop: 30, marginBottom: 20 }}>
                            <Text style={styles.textlogotitle}>ساعات کاری </Text>
                        </View>



                        <Timing
                            timeleft={timing2.open_1 + " - " + timing2.close_1}
                            timeright={timing1.open_1 + " - " + timing1.close_1}
                            weekday="شنبه"
                        />

                        <Timing
                            timeleft={timing2.open_2 + " - " + timing1.close_2}
                            timeright={timing1.open_2 + " - " + timing1.close_2}
                            weekday="یکشنبه"
                        />

                        <Timing
                            timeleft={timing2.open_3 + " - " + timing1.close_3}
                            timeright={timing1.open_3 + " - " + timing1.close_3}
                            weekday="دوشنبه"
                        />


                        <Timing
                            timeleft={timing2.open_4 + " - " + timing1.close_4}
                            timeright={timing1.open_4 + " - " + timing1.close_4}
                            weekday="سه شنبه"
                        />

                        <Timing
                            timeleft={timing2.open_5 + " - " + timing1.close_5}
                            timeright={timing1.open_5 + " - " + timing1.close_5}
                            weekday="چهارشنبه"
                        />

                        <Timing
                            timeleft={timing2.open_6 + " - " + timing1.close_6}
                            timeright={timing1.open_6 + " - " + timing1.close_6}
                            weekday="پنجشنبه"
                        />

                        <Timing
                            timeleft={timing2.open_7 + " - " + timing1.close_7}
                            timeright={timing1.open_7 + " - " + timing1.close_7}
                            weekday="جمعه"
                        />


                    </View>

                </ScrollView>


                {/* 
                    <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.touchback}>
                            <Ionicons name="chevron-back-outline" size={30} color={Colors.background} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.navigation.navigate("cart")} style={styles.touchbasket}>
                            <MaterialCommunityIcons name="cart" size={25} color={Colors.primary} />
                        </TouchableOpacity>
                        <View style={styles.viewavatar}>
                            <Text style={styles.textavatar}>{QUN ?QUN :0 }</Text>
                        </View> */}
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
    viewtiminng: {
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
        height: 80,
    },
    viewtimeleft: {
        alignItems: "center",
        justifyContent: "center",
        width: "30%", height: 40,
        backgroundColor: Colors.secondText2,
        borderRadius: 7,
        position: "absolute",
        left: "6%",
        bottom: "3%"
    },
    viewtextweek: {
        alignItems: "center",
        width: "30%", height: 25,
        position: "absolute",
        left: "34%",
        top: "3%"
    },

    viewContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: Colors.background
    },

    viewavatar: {
        width: "5%",
        height: 20,
        position: "absolute",
        right: "8%",
        borderRadius: 20,
        backgroundColor: Colors.primary,
        alignItems: "center",

    },
    textavatar: {
        fontFamily: "MontserratLight",
        fontSize: 12,
        color: Colors.background,
        bottom: 2
    },

    viewlogo: {
        width: "100%",
        height: 400,
        alignItems: "center",
        justifyContent: "center",

        position: "absolute"
    },
    touchback: {
        justifyContent: "center",
        alignItems: "center",
        width: "11%",
        height: 40,
        borderRadius: 10,
        backgroundColor: Colors.primary,
        position: "absolute",
        left: "6%"
    },
    touchbasket: {

        width: "11%",
        height: 40,
        borderRadius: 10,
        position: "absolute",
        right: "10%",
        backgroundColor: Colors.background,
        alignItems: "center",
        justifyContent: "center",





    },
    viewundermap: {
        flexDirection: "row",
        width: "100%",
        height: 140,
        borderTopRightRadius: 60,
        borderTopLeftRadius: 60,
        backgroundColor: Colors.background,




    },
    viewline: {
        width: "12%",
        height: 5,
        left: 180,
        marginTop: "5%",
        borderRadius: 10,
        backgroundColor: Colors.secondText,

    },
    textlogo: {
        fontFamily: "MontserratBold",
        fontSize: 18,
        marginTop: "8%",
        left: 240,
        top: 30
    },
    textlogotitle: {
        fontFamily: "MontserratBold",
        fontSize: 18,
        right: "10%"


    },
    viewrating: {
        flexDirection: "row",
        width: "20%",
        height: 35,
        backgroundColor: Colors.primary,
        bottom: "15%",
        left: "5.5%",
        borderRadius: 20,
        position: "absolute",
        alignItems: "center"
    },
    textrating: {
        fontFamily: "MontserratBold",
        fontSize: 15,
        color: Colors.background,
        left: "60%"
    },
    viewprice: {
        justifyContent: "center",
        alignItems: "center",
        width: "18%",
        height: 70,
        backgroundColor: Colors.RGB,
        borderRadius: 15,
        marginRight: "8%"
    },
    viewbox: {
        justifyContent: "center",
        alignItems: "center",
        width: "18%",
        height: 70,
        backgroundColor: Colors.RGB,
        borderRadius: 15,
        marginRight: "5%"
    },
    viewboxinfo: {
        justifyContent: "center",
        alignItems: "center",
        width: "18%",
        height: 70,
        backgroundColor: Colors.primary,
        borderRadius: 15,
        marginRight: "5%"
    },
    texttouchinfo: {
        fontFamily: "Montserrat",
        fontSize: 10,
        color: Colors.background,
        marginTop: 8
    },

    texttouch: {
        fontFamily: "Montserrat",
        fontSize: 10,
        color: Colors.primary,
        marginTop: 8
    },

    textstartstop: {
        fontFamily: "Montserrat",
        fontSize: 11,
        color: Colors.background
    },
    viewmap: {
        width: "85%",
        height: 200,
        backgroundColor: "red",
        left: "6%",
        marginTop: 10
    }




})




export default StorMore