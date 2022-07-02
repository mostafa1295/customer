import React, { useEffect, useRef, useState } from "react"
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, TextInput, FlatList, ActivityIndicator, I18nManager } from 'react-native';
import Colors from "../constants/Colors"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getSearch, getsellerinfo, setquantity } from "../store/actions/userLogin";
import { getAllvendors, getCategoryinfo, getusercart } from "../store/actions/product";
import { useIsFocused } from "@react-navigation/native";







function Dashboard(props) {
    const [active1, setactive1] = useState(false);
    const dispatch = useDispatch();
    // const Address = useSelector((stor) => stor.userLogin.dataaddress)
    const [Ordercompelet, setOrdercompelet] = useState("");
    const token = "c6e51a7a85f6de25e8724dca9cddd4b14da8d358fc31592a74bd98986b04a7a11d181bd80dcb5d787fd8e21f7adcc66f981f7cba7bbc1fc7eb9b238d99d5de60"
    //const token = useSelector((store) => store.userLogin.datatoken);
    const [Category, setCategory] = useState("");
    const [Vendors, setVendors] = useState("");
    const [isFetching, setIsFetching] = useState(false);
    const [isFetching1, setIsFetching1] = useState(false);
    const [isFetch, setIsFetch] = useState(false);
    const QUN = useSelector((store) => store.userLogin.dataQun);
    const [searching, setsearching] = useState("");
    const [Producti, setProducti] = useState([]);
    const [loading, setloading] = useState(false);
    const [focuse, setfocuse] = useState(false)
    const [IDs, setID] = useState("");


    // دسته بندی ها
    const getCategoryHandler = async () => {
        try {
            setIsFetching(true)
            const res = await dispatch(getCategoryinfo());

            //console.log(res.data); 

            setCategory(res.data)
            setIsFetching(false)
            if (res.data.length > 0) {

                getAllVendorsHandler(res.data[0].id, 1);
                setID(res.data[0].id)
            }
        } catch (err) {
            console.log(err);
        }
    };




    console.log(IDs);

    //نام فروشگاه
    const getAllVendorsHandler = async (id, num = null) => {
        try {

            setIsFetch(true)
            const respnse = await dispatch(getAllvendors(token,
                id
            ));

            // console.log(respnse.data);
            if (num) {
                setactive1(id);
            }
            setVendors(respnse.data)
            setIsFetch(false)
        } catch (err) {
            console.log(err);
        }
    };


    const getAllVendorsHandler1 = async (num = null) => {
        try {

            setIsFetching1(true)
            const respnse = await dispatch(getAllvendors(token,
                IDs
            ));

            // console.log(respnse.data);
            if (num) {
                setactive1(id);
            }
            setVendors(respnse.data)
            setIsFetching1(false)
        } catch (err) {
            console.log(err);
        }
    };







    //پروفایل 
    const getsellerHandler = async () => {
        try {
            const res = await dispatch(getsellerinfo(token));
            // console.log(res.data);
            setOrdercompelet(res.data)
        } catch (err) {
            console.log(err);
        }
    };



    //اینپوت سرچ
    const getSearchHandler = async () => {

        try {
            setloading(true)
            const res = await getSearch(token,
                searching
            );


            if (res.products) {

                setProducti(res.products)
            }

            setloading(false)
        } catch (err) {
            console.log(err);
        }
    };





    useEffect(() => {
        getsellerHandler();
        getCategoryHandler();




    }, [])


    const separate = (num) => {
        let number = num.replace(/\D/g, "");
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };






    const onblure = () => {
        if (!searching) {
            setfocuse(false)
        }
    }








    return (

        <View style={styles.container}>

            <View style={styles.viewlogo}>


                <View style={styles.viewimage}>
                    <Image source={require('../../assets/App-Customer.png')} style={{ width: 50, height: 50, borderRadius: 10 }} />
                </View>

                <View style={styles.viewtext}>
                    <Text style={styles.textshop}>{Ordercompelet.first_name + " " + Ordercompelet.last_name}</Text>
                    <View style={{ flexDirection: "row-reverse", width: "100%", height: 30, }}>
                        <Text onPress={() => props.navigation.navigate("address")} style={styles.textkabab}>{Ordercompelet.shop_address}</Text>
                        <MaterialCommunityIcons name="chevron-down" size={25} color={Colors.primary} />
                    </View>
                </View>

                <View style={styles.viewavatar}>
                    <Text style={styles.textavatar}>{QUN ? QUN : 0}</Text>
                </View>
                <TouchableOpacity onPress={() => props.navigation.navigate("cart")} style={styles.logout}>
                    <MaterialCommunityIcons name="cart" size={25} color={Colors.primary} />
                </TouchableOpacity>
            </View>







            <View style={{ flexDirection: "row", width: "100%", height: 70, }}>

                <TextInput
                    onFocus={() => setfocuse(true)}
                    onBlur={onblure}
                    placeholder="در بینهایت جست وجو کن... "
                    placeholderTextColor={Colors.secondText3}
                    style={styles.textinput}
                    onChangeText={(e) => setsearching(e)}
                    onKeyPress={getSearchHandler}
                />
                <MaterialCommunityIcons name="magnify" size={30} color="#767F9D" style={{ right: "25%", top: 15, zIndex: 2 }} />
            </View>














            {focuse ?
                <View></View>
                :


                <FlatList
                    onRefresh={getCategoryHandler}
                    refreshing={isFetching}
                    data={Category}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    inverted={true}
                    renderItem={({ item }) =>
                        <View style={styles.viewscroll}>
                            <TouchableOpacity onPress={() => {
                                setactive1(item.id)
                                getAllVendorsHandler(item.id);
                                setID(item.id)

                            }} style={{ width: "70%", height: 80, borderRadius: 40, alignItems: "center", justifyContent: "center", borderWidth: 3, borderColor: active1 == item.id ? Colors.primary : Colors.secondText2, }}>
                                <Image source={{ uri: item.thumbnail ? item.thumbnail : "https://chivane.com/wp-content/uploads/2022/01/61b4ea65b9f79.jpeg" }} alt="image" style={{ width: "100%", height: 76, borderRadius: 40 }} />
                            </TouchableOpacity>
                            <Text style={{ fontFamily: active1 == item.id ? "MontserratBold" : "MontserratLight", fontSize: 12, color: active1 == item.id ? Colors.primary : Colors.black, bottom: 3 }}>{item.name}</Text>
                        </View>
                    }
                    keyExtractor={item => item.id}

                />

            }








            {focuse ?
                <ScrollView style={{ height: 300, bottom: 10 }}>

                    {loading ?

                        <View style={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "center", marginTop: 5 }} >
                            <ActivityIndicator
                                animating={loading} size={30} color={Colors.primary} />

                        </View>
                        :


                        Producti.map((item, i) => {
                            return (
                                <TouchableOpacity key={i} onPress={() => props.navigation.navigate("stor", {
                                    ids: item.vendor_id

                                })} style={styles.viewproducting1}>



                                    <View style={styles.viewimageproducting}>
                                        <Image source={{ uri: item.thumbnail ? item.thumbnail : "https://chivane.com/wp-content/uploads/2022/01/61b4ea65b9f79.jpeg" }} alt="image" style={{ width: 70, height: 70, borderRadius: 10 }} />
                                    </View>

                                    <View style={{ width: "50%", height: 60, marginRight: 10, }}>
                                        <Text style={styles.textproducting}>{item.vendor_name}</Text>
                                        <Text style={styles.priceproducting0}>{item.title}</Text>
                                    </View>

                                    <View style={{ width: "50%", height: 60, right: 40, }}>
                                        <Text style={styles.textproducting1}>{item.date}</Text>
                                        <Text style={styles.priceproducting}>{separate(item.price)} تومان</Text>
                                    </View>



                                </TouchableOpacity>
                            )
                        })

                    }


                </ScrollView>
                :
                <View></View>
            }




            {focuse ?
                <View></View>
                :


                <View style={{ flexDirection: "row", width: "100%", height: 250, alignItems: "center", justifyContent: "center", position: "absolute", top: "44%" }}>
                    {isFetch ?

                        <View style={{ width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center", backgroundColor: Colors.secondText2 }} >
                            <ActivityIndicator
                                animating={isFetch} size={25} color={Colors.black} />

                        </View>
                        :


                        <FlatList
                            onRefresh={getAllVendorsHandler1}
                            refreshing={isFetching1}
                            data={Vendors}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, i }) =>
                                <TouchableOpacity key={i} onPress={() => {

                                    props.navigation.navigate("stor", {
                                        ids: Ordercompelet.ID

                                    })
                                }} style={{ width: "43%", height: 260, marginLeft: "3%", marginRight: "3%", marginTop: 10 }}>



                                    <View style={{ width: "100%", height: 250,flexDirection:"row-reverse" }}>
                                       
                                         <Text style={{ fontFamily: "Montserrat", fontSize: 15, color: Colors.black, right: "6%",top:195 ,left:10}}>{item.name}</Text>  
                                        {item.categories.map((item, i) => {
                                        return (
                                            
                                                <Text key={i} style={{  fontFamily: "MontserratLight", fontSize: 12, top:220,right:50 }}> {item.name}</Text>
                                            
                                        )
                                    })

                                    }
                                      <Image source={{ uri: item.thumbnail ? item.thumbnail : "https://chivane.com/wp-content/uploads/2022/01/61b4ea65b9f79.jpeg" }} style={{ width: "100%", height: 197, borderRadius: 30,right:"55%" }} />  
                                    </View>

                                 


                                    <View style={{ flexDirection: "row", width: "65%", height: 25, backgroundColor: Colors.RGB3, bottom: 240, left: "15%", borderRadius: 10, alignItems: "center" }}>
                                        <Text style={{ fontFamily: "MontserratBold", fontSize: 12, color: Colors.background, left: 8 }}>{separate(item.tax_pake)} تومان</Text>
                                        <Image source={require('../../assets/image/fastdelivery.png')} style={{ width: 18, left: 15 }} />
                                    </View>

                                    <View style={{ flexDirection: "row", width: 60, height: 25, backgroundColor: Colors.primary, bottom: 110, left: 10, borderRadius: 10, alignItems: "center" }}>
                                        <Ionicons name="star" size={15} color={Colors.background} style={{ left: 7 }} />
                                        <Text style={{ fontFamily: "MontserratBold", fontSize: 12, color: Colors.background, left: 12 }}>{item.rating}</Text>

                                    </View>

                                </TouchableOpacity>
                            }
                            keyExtractor={item => item.id}

                        />
                    }

                </View>

            }






            {focuse ?
                <View></View>
                :
                <View style={styles.viewfooter}>



                    <TouchableOpacity onPress={() => props.navigation.navigate("profiletab")} style={styles.touch}>
                        <MaterialCommunityIcons name="account" size={25} color={Colors.RGB1} />
                        <Text style={styles.texttouch}>پروفایل</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.touch}>
                        <MaterialCommunityIcons name="home-variant" size={25} color={Colors.background} />
                        <Text style={{ fontFamily: "Montserrat", fontSize: 11, color: Colors.background }}>خانه</Text>
                    </TouchableOpacity>



                    <TouchableOpacity onPress={() => props.navigation.navigate("orders")} style={styles.touch}>
                        <MaterialCommunityIcons name="clipboard-text" size={25} color={Colors.RGB1} />
                        <Text style={styles.texttouch}>سفارشات</Text>
                    </TouchableOpacity>


                </View>

            }




        </View>
    );
}

export default Dashboard;


const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: Colors.background,
        alignItems: "center",
    },
    viewimageproducting: {
        width: 70,
        height: 70,
        alignItems: "center",
        justifyContent: "center",
        elevation: 3,
        borderRadius: 15,
        marginRight: 20
    },
    viewproducting1: {
        flexDirection: "row-reverse",
        width: "83%",
        height: 80,
        alignItems: "center",
        backgroundColor: Colors.secondText2,
        marginTop: 10,
        borderRadius: 15,
        left: 20

    },
    textproducting: {
        fontFamily: "MontserratLight",
        fontSize: 17,
        marginTop: 5,
        color: Colors.black
    },
    priceproducting0: {
        fontFamily: "MontserratLight",
        fontSize: 13,
        color: Colors.black,

    },
    priceproducting: {
        fontFamily: "MontserratLight",
        fontSize: 13,
        color: Colors.black,
        right: "18%",
    },
    textproducting1: {
        fontFamily: "MontserratLight",
        fontSize: 13,
        color: Colors.black,
        left: "50%",
        marginTop: 10
    },
    viewavatar: {
        left: 45,
        bottom: 15,
        width: 18,
        height: 18,
        backgroundColor: Colors.primary,
        borderRadius: 10,
        zIndex: 2,
        alignItems: "center",
    },
    textavatar: {
        fontFamily: "MontserratLight",
        fontSize: 12,
        color: Colors.background,
        bottom: 2
    },
    viewlogo: {
        flexDirection: "row-reverse",
        width: "100%",
        height: 80,
        marginTop: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    viewimage: {
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        elevation: 3,
        borderRadius: 15,
    },
    viewtext: {
        alignItems: "flex-end",
        width: "50%",
        height: 60,
        marginRight: 10,


    },
    textshop: {
        fontFamily: "MontserratLight",
        fontSize: 12,
        marginTop: 8,
        color: Colors.secondText3
    },
    textkabab: {
        fontFamily: "MontserratBold",
        fontSize: 14,
        color: Colors.primary,

    },
    logout: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: Colors.secondText,
        borderRadius: 15,
        marginRight: "8%"
    },
    textinput: {
        flexDirection: "row-reverse",
        width: "87%",
        height: 60,
        backgroundColor: "#FCFCFD",
        left: "6%",
        borderRadius: 10,
        borderWidth: 1, borderColor: "#EFEFEF",
        padding: 10, paddingRight: 50,
        fontFamily: "Montserrat"
    },
    viewclose: {
        marginTop: "30%",
        width: "100%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    viewfooter: {
        flexDirection: "row",
        width: "88%",
        height: 70,
        borderRadius: 20,
        marginTop: 10,
        backgroundColor: Colors.primary,
        marginBottom: 25,
        elevation: 3,


    },
    touch: {
        flexDirection: "column",
        marginTop: 10,
        alignItems: "center",
        width: "33%",
        height: 60

    },
    texttouch: {
        fontFamily: "Montserrat",
        fontSize: 11,
        color: Colors.RGB1
    },
    viewscroll: {
        flexDirection: "column",
        width: 80,
        height: 300,
        alignItems: "center",



    },
    textscroll: {
        fontFamily: "Montserrat",
        fontSize: 12,
        color: Colors.black

    }

})