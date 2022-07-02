import React, { useEffect, useState } from 'react';
import { Image, NativeBaseProvider, Progress, } from 'native-base';
import { View, Text, Keyboard, TouchableWithoutFeedback, StyleSheet, ScrollView, TouchableOpacity, TextInput, FlatList, I18nManager, SafeAreaView, ActivityIndicator } from 'react-native';
import Btn from "../components/btn"
import Colors from '../constants/Colors';
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import Maps from './maporder';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, getCategoryProductstor, getSingleShop, lowquantityProduct, SendquantityProduct } from '../store/actions/product';
import { getSearch, setproducting, setquantity } from '../store/actions/userLogin';
import { useIsFocused } from '@react-navigation/native';








const Stors = (props) => {
    const [loading, setloading] = useState(true);
    const [active, setactive] = useState(false);

    const dispatch = useDispatch();


    const token = "c6e51a7a85f6de25e8724dca9cddd4b14da8d358fc31592a74bd98986b04a7a11d181bd80dcb5d787fd8e21f7adcc66f981f7cba7bbc1fc7eb9b238d99d5de60"
    //const token = useSelector((store) => store.userLogin.datatoken);
    const [Category, setCategory] = useState([]);
    const [Shop, setShop] = useState("");
    const [ID, setID] = useState("");
    const [Product, setProduct] = useState([]);
    const [Rating, setRating] = useState("");
    const [Producti, setProducti] = useState([]);
    const [Price, setPrice] = useState("");
    const [Title, setTitle] = useState("");


    const [activen, setactiven] = useState(false);
    const [counter, setCounter] = useState(1);
    const incrementCounter = () => setCounter(counter + 1);
    let decrementCounter = () => setCounter(counter - 1);
    const QUN = useSelector((store) => store.userLogin.dataQun);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [focuse,setfocuse]=useState(false)


    if (counter <= 0) {
        decrementCounter = () => setCounter(0);
    }
    const separate = (num) => {
        let number = num.replace(/\D/g, "");
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };











    //اطلاعات فروشگاه 
    const getsingleShopHandler = async () => {
        try {
            setloading(true)
            const res = await dispatch(getSingleShop(token,
                props.route.params.ids
            ));

            setShop(res.data.data)
            setRating(res.data.data.rating)
            setProduct([]);

            if (res.data.data.categories.length > 0) {
                setCategory(res.data.data.categories)
                setProductbyHandler(res.data.data.categories[res.data.data.categories.length - 1].term_id, res.data.data.categories[res.data.data.categories.length - 1].products, 1);

            }
            setloading(false)
            // console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    };




    //  فرستادن محصولات به ریداکس
    const setProductbyHandler = async (id, products = [], num = null) => {
        try {

            const res = await dispatch(setproducting(Product));
            if (num) {
                setactive(id);
                if (products.length > 0) {
                    setProducti(products)
                }

            }
            // console.log(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };














    useEffect(() => {

        getsingleShopHandler();


    }, [])







    // افزودن محصولات
    const SendquantityHandler1 = async (id, price, title) => {


        if (Product.filter(e => e.product_id === id).length > 0) {

            Product.filter(x => x.product_id === id).map(x => x.quantity = x.quantity + 1);

        } else {

            Product.push({
                'product_id': id,
                'quantity': 1,
                'price': parseInt(price),
                'title': title,
                "total": parseInt(price)
            });
        }

        //    if(Product.length > 0){

        //         try {
        //             setloader(true)
        //             const res = await SendquantityProduct(token,Product);
        //             //console.log(res.data);
        //             setloader(false)
        //         } catch (err) {
        //             console.log(err);
        //         }
        //    }

    };


    console.log(Product);



    //کاهش محصول
    const LowquantityHandler = async () => {
        if (Product.filter(e => e.product_id === ID).length > 0) {
            Product.filter(function (item) {
                if (item.product_id === ID) {
                    if (item.quantity == 1) {
                        Product.splice(Product.findIndex(x => x.product_id === ID), 1);
                    } else {

                        Product.filter(x => x.product_id === ID).map(x => x.quantity = x.quantity - 1);
                    }
                }
            });
        }



        //    if(Product.length > 0){
        //         try {
        //             const res = await SendquantityProduct(token,Product);
        //             // console.log(res);
        //         } catch (err) {
        //             console.log(err);
        //         }
        //     }
    };





    const myid = (id) => {
        setactiven(id)
        setID(id)
        setCounter(1)

    }


    // سرچ داخلی
    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {

            const filteredData = [];
            Category.forEach(item => {
                item.products.forEach(element => {
                    if (element.title.includes(searchInput)) {

                        filteredData.push(element);
                    } else {
                        return false;
                    }
                });
            });

            setFilteredResults(filteredData)
        }

    }


    const quantity = (Product.reduce((a, v) => a = a + v.quantity, 0));
    //  افزودن تعداد به سبد ریداکس
    const setquantityHandler = async () => {
        try {

            const res = await dispatch(setquantity(quantity));
            // console.log(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };





    return !loading ? (

        <NativeBaseProvider>

            <View style={styles.viewContainer}>


            <View style={{ width: "100%",
        height: 400,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        }}>
                    <Image source={{ uri: Shop.thumbnail ? Shop.thumbnail : "" }} alt="image" style={{ width: "100%", height: 400 }} />
                </View>



                <TouchableOpacity onPress={() => {
                    setquantityHandler()
                    props.navigation.goBack()
                }} style={{ justifyContent: "center",
                alignItems: "center",
                width: "11%",
                height: 40,
                borderRadius: 10,
                backgroundColor: Colors.primary,
                position: "absolute",
                top: "12%",
                
                left: "6%"}}>
                    <Ionicons name="chevron-back-outline" size={30} color={Colors.background} />
                </TouchableOpacity>
               
               
               
                <TouchableOpacity onPress={() => {
                    setProductbyHandler();
                    props.navigation.navigate("cart")
                }} style={{ width: "11%",
                height: 40,
                borderRadius: 10,
                position: "absolute",
                top: "12%",
                right: "10%",
                backgroundColor: Colors.background,
                alignItems: "center",
                justifyContent: "center",
                }}>
                    <MaterialCommunityIcons name="cart" size={25} color={Colors.primary} />
                </TouchableOpacity>
                <View style={{  width: "5%",
        height: "3%",
        position: "absolute",
        top: "11%",
        right: "8%",
        borderRadius: 20,
        backgroundColor: Colors.primary,
        alignItems: "center",
        }}>
                    <Text style={styles.textavatar}>{quantity}</Text>
                </View>




                <ScrollView style={{ zIndex: 1, }}>


                    <View style={{
                        width: "100%", marginTop: 20, backgroundColor: Colors.background, marginTop: "80%",
                        borderTopRightRadius: 60,
                        borderTopLeftRadius: 60,
                    }}>

                        <View style={styles.viewundermap}>
                            <View style={styles.viewline}></View>
                            <Text style={styles.textlogo}>{Shop.shop_name}</Text>




                            {Category.map((item, i) => {
                                return (


                                    <Text key={i} style={{ fontFamily: "MontserratLight", fontSize: 12, top: "25%", left: 162 }}> {item.name}</Text>


                                )
                            })

                            }



                            <View style={styles.viewrating}>
                                <Ionicons name="star" size={20} color={Colors.background} style={{ left: "40%" }} />
                                <Text style={styles.textrating}>{Rating.rating}</Text>
                            </View>

                        </View>

                        <View style={{ flexDirection: "row-reverse", width: "100%", right: 10 }}>
                            <View style={styles.viewbox} >
                                <Image source={require('../../assets/image/fast1.png')} alt="image" style={{ width: 30, height: 30 }} />
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

                            <TouchableOpacity onPress={() => props.navigation.navigate("storemore", {
                                ids: Shop.id
                            })} style={styles.viewbox} >
                                <Image source={require('../../assets/image/search.png')} alt="image" style={{ width: 35, height: 35 }} />
                                <Text style={styles.texttouch}>اطلاعات بیشتر</Text>
                            </TouchableOpacity>

                        </View>

                        <View style={{ flexDirection: "row", width: "100%", height: 70, }}>

                            <TextInput
                                 onFocus={()=>setfocuse(true)}
                                 onBlur={()=>setfocuse(false)}
                                placeholder="جست وجو در محصولات "
                                placeholderTextColor={Colors.secondText3}
                                style={styles.textinput}
                                onChangeText={(e) => searchItems(e)}

                            />
                            <MaterialCommunityIcons name="magnify" size={30} color="#767F9D" style={{ right: "22%", top: 30, zIndex: 2 }} />
                        </View>






                        {searchInput.length > 1 ? (
                            filteredResults.map((items, i) => {
                                return (


                                    <View key={i} style={styles.viewproducting1}>

                                        <View style={styles.viewimageproducting}>
                                            <Image source={{ uri: items.thumbnail ? items.thumbnail : "https://chivane.com/wp-content/uploads/2022/01/61b4ea65b9f79.jpeg" }} alt="image" style={{ width: 70, height: 70, borderRadius: 10 }} />
                                        </View>

                                        <View style={{ width: "50%", height: 60, marginRight: 10, }}>
                                            <Text style={styles.textproducting}>{items.title}</Text>
                                            <Text style={styles.priceproducting}>{separate(items.price)} تومان</Text>
                                        </View>
                                        {activen == items.id ?

                                            <View style={{ alignItems: "center", flexDirection: "column", width: 20, height: 60, backgroundColor: Colors.RGB, left: 20 }}>
                                                <TouchableOpacity onPress={() => {

                                                    incrementCounter();

                                                    SendquantityHandler1(items.id, items.price, items.title)


                                                }} style={{ borderRadius: 5, width: 20, height: 20, backgroundColor: Colors.secondary, alignItems: "center", justifyContent: "center" }}>
                                                    <Ionicons name="add-outline" size={15} color={Colors.background} />
                                                </TouchableOpacity>
                                                <Text style={{ fontFamily: "MontserratLight", fontSize: 15, color: Colors.primary }} >{counter}</Text>
                                                <TouchableOpacity onPress={() => {
                                                    decrementCounter();

                                                    LowquantityHandler();

                                                }} style={{ borderRadius: 5, width: 20, height: 20, backgroundColor: Colors.secondary, alignItems: "center", justifyContent: "center" }}>
                                                    <Ionicons name="remove-outline" size={15} color={Colors.background} />
                                                </TouchableOpacity>
                                            </View>
                                            :

                                            <TouchableOpacity onPress={() => {

                                                SendquantityHandler1(items.id, items.price, items.title)
                                                myid(items.id)
                                                setPrice(items.price)
                                                setTitle(items.title)
                                            }} style={{ borderRadius: 5, width: 30, height: 30, backgroundColor: Colors.secondary, alignItems: "center", justifyContent: "center", left: 15 }}>
                                                <Ionicons name="add-outline" size={25} color={Colors.background} />
                                            </TouchableOpacity>
                                        }

                                    </View>
                                )
                            })
                        ) : (
                            <View></View>
                        )}










                        <View style={{ width: "100%", height: 50, marginTop: 20 }}>


                            <ScrollView horizontal={true}
                                style={{ flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse' }}
                                showsHorizontalScrollIndicator={false}

                            >

                                {Category.map((item, i) => {
                                    return (
                                        <View key={i} style={{ width: 90, height: 40, alignItems: "center", flexDirection: "row" }}>
                                            <TouchableOpacity onPress={() => {
                                                setactive(item.term_id)
                                                setProducti(item.products)
                                            }} style={{ flexDirection: "column", }}>
                                                <Text style={{ fontFamily: ((active == item.term_id) ? "MontserratBold" : "Montserrat"), fontSize: 14, color: ((active == item.term_id) ? Colors.primary : Colors.black) }}>{item.name}</Text>
                                                {active == item.term_id ?
                                                    <View style={{ height: 2, backgroundColor: Colors.primary, }}></View>
                                                    :
                                                    <View></View>
                                                }
                                            </TouchableOpacity>
                                        </View>


                                    )
                                })}
                            </ScrollView>
                        </View>










                        {Producti.map((items, i) => {
                            return (


                                <View key={i} style={styles.viewproducting}>

                                    <View style={styles.viewimageproducting}>
                                        <Image source={{ uri: items.thumbnail ? items.thumbnail : "https://chivane.com/wp-content/uploads/2022/01/61b4ea65b9f79.jpeg" }} alt="image" style={{ width: 70, height: 70, borderRadius: 10 }} />
                                    </View>

                                    <View style={{ width: "50%", height: 60, marginRight: 10, }}>
                                        <Text style={styles.textproducting}>{items.title}</Text>
                                        <Text style={styles.priceproducting}>{separate(items.price)} تومان</Text>
                                    </View>
                                    {activen == items.id ?

                                        <View style={{ alignItems: "center", flexDirection: "column", width: 20, height: 60, backgroundColor: Colors.RGB, left: 20 }}>


                                            <SafeAreaView style={{ alignItems: "center", justifyContent: "center", }}>
                                                <TouchableOpacity onPress={() => {

                                                    incrementCounter();
                                                    SendquantityHandler1(items.id, items.price, items.title)


                                                }} style={{ borderRadius: 5, width: 20, height: 20, backgroundColor: Colors.secondary, alignItems: "center", justifyContent: "center" }}>
                                                    <Ionicons name="add-outline" size={15} color={Colors.background} />
                                                </TouchableOpacity>


                                                <Text style={{ fontFamily: "MontserratLight", fontSize: 15, color: Colors.primary }} >{counter}</Text>


                                                <TouchableOpacity onPress={() => {
                                                    decrementCounter();
                                                    LowquantityHandler()

                                                }} style={{ borderRadius: 5, width: 20, height: 20, backgroundColor: Colors.secondary, alignItems: "center", justifyContent: "center" }}>
                                                    <Ionicons name="remove-outline" size={15} color={Colors.background} />
                                                </TouchableOpacity>
                                            </SafeAreaView>

                                        </View>
                                        :

                                        <TouchableOpacity onPress={() => {



                                            SendquantityHandler1(items.id, items.price, items.title)

                                            myid(items.id)
                                            setPrice(items.price)
                                            setTitle(items.title)




                                        }} style={{ borderRadius: 5, width: 30, height: 30, backgroundColor: Colors.secondary, alignItems: "center", justifyContent: "center", left: 15 }}>
                                            <Ionicons name="add-outline" size={25} color={Colors.background} />
                                        </TouchableOpacity>
                                    }

                                </View>

                            )
                        })}

















                    </View>

                </ScrollView>



              







{focuse ? 
<View></View>
:

                <View style={{

                    width: "88%",
                    height: 55,
                    borderRadius: 5,
                    backgroundColor: Colors.success,
                    left: "5%",
                    marginBottom: 10
                }}>
                    <Text style={styles.textclose}>سفارش شما اکنون قابل ثبت است</Text>

                    <Btn style={styles.btnclose}
                        touchableStyle={{ backgroundColor: Colors.background }}
                        label="سبد خرید"
                        textStyle={{ color: Colors.success, position: "absolute" }}
                        onPress={() => {
                            // setCounter(0)
                            //SendquantityHandler()
                            setProductbyHandler();
                            props.navigation.navigate("cart")
                        }} />

                </View>
}

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
    viewproducting: {
        flexDirection: "row-reverse",
        width: "100%",
        height: 80,
        alignItems: "center"
    },
    viewproducting1: {
        flexDirection: "row-reverse",
        width: "80%",
        height: 80,
        alignItems: "center",
        backgroundColor: Colors.secondText2,
        marginTop: 20,
        left: 35,
        borderRadius: 15

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
        color: Colors.primary
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
        top: "12%",
        right: "10%",
        backgroundColor: Colors.background,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 3,



    },
    viewavatar: {
        width: "5%",
        height: "3%",
        position: "absolute",
        top: "11%",
        right: "8%",
        borderRadius: 20,
        backgroundColor: Colors.primary,
        alignItems: "center",
        zIndex: 3
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
        position: "absolute",
        zIndex:3


    },
    touchback: {
        justifyContent: "center",
        alignItems: "center",
        width: "11%",
        height: 40,
        borderRadius: 10,
        backgroundColor: Colors.primary,
        position: "absolute",
        top: "12%",
        zIndex: 3,
        left: "6%"
    },
    viewundermap: {
        flexDirection: "row",
        width: "100%",
        height: 140,
        borderTopRightRadius: 60,
        borderTopLeftRadius: 60,
        backgroundColor: Colors.background,
        zIndex: 2,

    },
    viewline: {
        width: "12%",
        height: 5,
        backgroundColor: "red",
        marginTop: "5%",
        borderRadius: 10,
        backgroundColor: Colors.secondText,
        left: 180,
    },
    textlogo: {
        fontFamily: "MontserratBold",
        fontSize: 18,
        marginTop: "9%",
        left: 240,
        top: 30
    },
    viewrating: {
        flexDirection: "row",
        width: "20%", height: 35,
        backgroundColor: Colors.primary,
        bottom: "15%",
        left: "6%",
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
    textinput: {
        flexDirection: "row-reverse",
        width: "86%",
        height: 60,
        backgroundColor: "#FCFCFD",
        left: "6%",
        borderRadius: 10,
        borderWidth: 1, borderColor: "#EFEFEF",
        padding: 10, paddingRight: 50,
        fontFamily: "Montserrat",
        marginTop: 15

    },
    texttouch: {
        fontFamily: "Montserrat",
        fontSize: 10,
        color: Colors.primary,
        marginTop: 8
    },
    viewstart: {
        width: "9%",
        height: 25,
        backgroundColor: Colors.primary,
        marginTop: "4%",
        left: "7%",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    viewstop: {
        width: "9%", height: 25,
        backgroundColor: Colors.primary,
        left: "83%",
        bottom: "35%",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    textstartstop: {
        fontFamily: "Montserrat",
        fontSize: 11,
        color: Colors.background
    },
    viewpoint: {
        width: 18,
        height: 18,
        backgroundColor: Colors.primary,
        left: "86%",
        bottom: 84,
        borderRadius: 20
    },
    viewclose: {
        marginTop: "8%",
        marginBottom: "8%",
        width: "100%",
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "red"


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
})




export default Stors