import React, { useEffect, useState } from 'react';
import { Button, FormControl, Image, Input, Modal, NativeBaseProvider, Progress, TextArea, } from 'native-base';
import { View, Text, Keyboard, TouchableWithoutFeedback, StyleSheet, ScrollView, TouchableOpacity, TextInput, FlatList, ActivityIndicator, Alert } from 'react-native';
import Btn from "../components/btn"
import Colors from '../constants/Colors';
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { getdetailsmyorder, getmyorder, replycomment } from '../store/actions/product';
import { useDispatch, useSelector } from 'react-redux';
import Rating from 'react-native-easy-rating';








const Orders = (props) => {
    const dispatch = useDispatch();
    const token = "c6e51a7a85f6de25e8724dca9cddd4b14da8d358fc31592a74bd98986b04a7a11d181bd80dcb5d787fd8e21f7adcc66f981f7cba7bbc1fc7eb9b238d99d5de60"
    // const token = useSelector((store) => store.userLogin.datatoken);
    const [isFetching, setIsFetching] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [Order, setOrder] = useState([]);
    const [Orderdetails, setOrderdetails] = useState("");
    const [Orderproduct, setOrderproduct] = useState([]);
    const [loading, setloading] = useState(true);
    const [rating, setRating] = useState();
    const [replycom, setreplycom] = useState("");
    const [ID, setID] = useState("");
    const [load, setload] = useState(false);



    const getMYorderHandler = async () => {
        try {
            setIsFetching(true)
            const res = await dispatch(getmyorder(token));

           console.log(res.data);

            setOrder(res.data)
            
            setIsFetching(false)
        } catch (err) {
            console.log(err);
        }
    };




    const getdetailsMYorderHandler = async (id) => {
        try {
            
            setloading(true)
            const res = await dispatch(getdetailsmyorder(token, id));

            // console.log(res.data);

            setOrderdetails(res.data)
            setOrderproduct(res.data.items)
            setloading(false);
           
        } catch (err) {
            console.log(err);
        }
    };








    useEffect(() => {

        getMYorderHandler();

    }, [])



    const setreplyHandler = async () => {
        
        try {
            setload(true)
          const resp=  await replycomment(
                token,
                ID,
                rating,
                replycom.text,
                

            )

            if (resp.status==400) {
                Alert.alert("", "محتوای مربوطه را مشخص کنید", [
                    {
                        text: "تایید",
                        onPress: () => null,
                        style: "cancel",
                    }
                ]);
            }
            if (resp.status==200) {
                Alert.alert("", "با موفقیت ثبت شد", [
                    {
                        text: "تایید",
                        onPress: () => setShowModal1(false),
                        style: "cancel",
                    }
                ]);
            }
            setload(false)
        } catch (err) {
            console.log(err);
        }
    };





 const total = (Orderproduct.reduce((a, v) => a = a + v.price, 0))

    const separate = (num) => {
        const number = num.replace(/\D/g, "")
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

   

    return (
        <NativeBaseProvider>

            <View style={styles.viewContainer}>



                <View style={styles.viewback}>

                    <Text style={{ fontFamily: "MontserratBold", fontSize: 18, color: Colors.black, top: 20 }}>سفارشات</Text>
                </View>

                <Modal justifyContent="flex-end" size="full"
                    isOpen={showModal} onClose={() => setShowModal(false)}>
               



                    <Modal.Content style={{ borderTopRightRadius: 50, borderTopLeftRadius: 50 }}>
                         {loading ?
                                <View style={{ width: "100%", height: 50, alignItems: "center", marginTop: 20 }} >
                                    <ActivityIndicator
                                        animating={loading} size={30} color={Colors.primary} />
                                </View>
                                :
                        <Modal.Body >
                            <View style={styles.viewlineup}></View>



                            <View style={styles.viewtitlemodal}>
                                <Btn style={styles.btnboxmodal}
                                    touchableStyle={{ backgroundColor: Colors.primary }}
                                    label="ثبت نظر"
                                    textStyle={{ color: Colors.background, position: "absolute" }}
                                    onPress={() => setShowModal1(true)}
                                />
                                <Text style={{ fontFamily: "MontserratBold", fontSize: 18, color: Colors.black, left: "35%" }}>سفارش</Text>
                            </View>


                            {
                                Orderproduct.map((item, i) => {
                                    return (

                                        <View key={i} style={styles.viewtitleboxpro}>
                                            <Text style={styles.texttitleR}>{item.title} (x{item.quantity})</Text>
                                            <Text style={styles.texttitleL}>{separate(JSON.stringify(item.price))} تومان</Text>
                                        </View>


                                    )
                                })}


                            <View style={styles.viewlinedown}></View>


                            <View style={styles.viewboxproductDown}>
                                <View style={styles.viewtitleboxpro}>
                                    <Text style={styles.texttitleR}> مجموع اقلام </Text>
                                    <Text style={styles.texttitleL}>{separate(JSON.stringify(total))} تومان</Text>
                                </View>

                                <View style={styles.viewtitleboxpro}>
                                    <Text style={styles.texttitleR}> هزینه پیک </Text>
                                    <Text style={styles.texttitleL}>{separate(JSON.stringify(Orderdetails.pake_price))} تومان</Text>
                                </View>

                                <View style={styles.viewtitleboxpro}>
                                    <Text style={styles.texttitleR}> مجموع کل سفارش </Text>
                                    <Text style={styles.texttitleL}>{separate(JSON.stringify(parseInt(Orderdetails.pake_price) + total))} تومان</Text>
                                </View>


                            </View>

                        </Modal.Body>

 }                  
                    </Modal.Content>

               
                </Modal>



                <Modal justifyContent="center" size="lg"
                    isOpen={showModal1} onClose={() => setShowModal1(false)}>
                    <Modal.Content style={{ borderRadius: 30 }}>
                        <Modal.Body >
                            <View style={{ width: "100%", height: 250 }}>

                                <View style={{ width: "100%", height: 70, justifyContent: "center", alignItems: "center" }}>
                                    <Rating
                                        rating={rating}
                                        max={5}
                                        iconWidth={34}
                                        iconHeight={34}
                                        onRate={setRating} />
                                </View>

                                <TextInput
                                    placeholder="به این محصول نظر دهید..."
                                    placeholderTextColor={Colors.secondText3}
                                    onChangeText={(text) => setreplycom({ text })}
                                    style={styles.textinput}
                                />

                                <Btn
                                    touchableStyle={{
                                        width: "86%",
                                        height: 50,
                                        backgroundColor: Colors.secondary,
                                    }}
                                    textStyle={{ bottom: 10, fontSize: 16 }}
                                    style={{ marginLeft: 23, marginTop: 20, marginBottom: 50 }}
                                    loading={load}
                                    colorspin={Colors.background}
                                    sizespin={25}
                                    label="ارسال پاسخ"
                                    onPress={() => {
                                       setTimeout(() => {
                                           
                                        setreplyHandler();
                                        
                                       
                                       }, 100); 
                                    
                                }}
                                />

                            </View>


                        </Modal.Body>

                    </Modal.Content>
                </Modal>

















                <FlatList
                    onRefresh={getMYorderHandler}
                    refreshing={isFetching}
                    data={Order}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => {
                            if (item.status === "تحویل شده") {
                                getdetailsMYorderHandler(item.id)
                                 setShowModal(true)
                                  setID(item.id)
                            }else{
                             props.navigation.navigate("activeorder",{
                                 ids:item.id
                             }) 
                            }
                            
                        }} style={styles.viewbox}>
                            <View style={styles.viewtitlebox}>
                                <Text style={styles.texttitle}>{item.shop}</Text>
                                <Text style={styles.textboxdate}>{item.date}</Text>
                            </View>

                            <View style={styles.viewtitlebox}>
                                <Btn style={styles.btnbox}
                                    touchableStyle={{ backgroundColor: item.status === "تحویل شده" ? Colors.success :  Colors.primary  }}
                                    label={item.status}
                                    textStyle={{ color: Colors.background, position: "absolute", fontSize: 12 }}
                                    onPress={() =>{
                                         if (item.status === "تحویل شده") {
                                            getdetailsMYorderHandler(item.id)
                                             setShowModal(true)
                                              setID(item.id)
                                        }else{
                                         props.navigation.navigate("activeorder",{
                                             ids:item.id
                                         }) 
                                        }
                                        
                                      }}
                                />
                                <Text style={styles.textboxprice}>{separate(JSON.stringify(item.price))} تومان</Text>
                            </View>

                        </TouchableOpacity>
                    }
                    keyExtractor={item => item.id}

                />















                {/* 

                    <TouchableOpacity onPress={() => setShowModal(true)}  style={styles.viewbox}>
                        <View style={styles.viewtitlebox}>
                            <Text style={styles.texttitle}>کافه کباب احسان</Text>
                            <Text style={styles.textboxdate}>1401/12/22</Text>
                        </View>

                        <View style={styles.viewtitlebox}>
                            <Btn style={styles.btnbox}
                                touchableStyle={{ backgroundColor: Colors.primarydark }}
                                label="لغو شده"
                                textStyle={{ color: Colors.background, position: "absolute" }}
                                onPress={() => setShowModal(true)}
                            />
                            <Text style={styles.textboxprice}>156،000 تومان</Text>
                        </View>


                    </TouchableOpacity>



                    <TouchableOpacity onPress={() => setShowModal(true)}  style={styles.viewbox}>
                        <View style={styles.viewtitlebox}>
                            <Text style={styles.texttitle}>کافه کباب احسان</Text>
                            <Text style={styles.textboxdate}>1401/12/22</Text>
                        </View>

                        <View style={styles.viewtitlebox}>
                            <Btn style={styles.btnbox}
                                touchableStyle={{ backgroundColor: Colors.success }}
                                label="تحویل شده"
                                textStyle={{ color: Colors.background, position: "absolute" }}
                                onPress={() => setShowModal(true)}
                            />
                            <Text style={styles.textboxprice}>156،000 تومان</Text>
                        </View>

                    </TouchableOpacity>



                    <TouchableOpacity onPress={() => setShowModal(true)}  style={styles.viewbox}>
                        <View style={styles.viewtitlebox}>
                            <Text style={styles.texttitle}>کافه کباب احسان</Text>
                            <Text style={styles.textboxdate}>1401/12/22</Text>
                        </View>

                        <View style={styles.viewtitlebox}>
                            <Btn style={styles.btnbox}
                                touchableStyle={{ backgroundColor: Colors.success }}
                                label="تحویل شده"
                                textStyle={{ color: Colors.background, position: "absolute" }}
                                onPress={() => setShowModal(true)}
                            />
                            <Text style={styles.textboxprice}>156،000 تومان</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.viewbox}>
                        <View style={styles.viewtitlebox}>
                            <Text style={styles.texttitle}>کافه کباب احسان</Text>
                            <Text style={styles.textboxdate}>1401/12/22</Text>
                        </View>

                        <View style={styles.viewtitlebox}>
                            <Btn style={styles.btnbox}
                                touchableStyle={{ backgroundColor: Colors.success }}
                                label="تحویل شده"
                                textStyle={{ color: Colors.background, position: "absolute" }}
                            // onPress={sendShopActiveHandler}
                            />
                            <Text style={styles.textboxprice}>156،000 تومان</Text>
                        </View>

                    </View>



                </ScrollView>
 */}







                <View style={styles.viewclose}>


                    <View style={styles.viewfooter}>
                        <TouchableOpacity onPress={() => props.navigation.navigate("profiletab")} style={styles.touch}>
                            <MaterialCommunityIcons name="account" size={25} color={Colors.RGB1} />
                            <Text style={styles.texttouch}>پروفایل</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => props.navigation.navigate("dashboard")} style={styles.touch}>
                            <MaterialCommunityIcons name="home-variant" size={25} color={Colors.RGB1} />
                            <Text style={styles.texttouch}>خانه</Text>
                        </TouchableOpacity>



                        <TouchableOpacity style={styles.touch}>
                            <MaterialCommunityIcons name="clipboard-text" size={25} color={Colors.background} />
                            <Text style={{ fontFamily: "Montserrat", fontSize: 11, color: Colors.background }}>سفارشات</Text>
                        </TouchableOpacity>


                    </View>


                </View>




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
    textinput: {
        flexDirection: "row-reverse",
        width: "100%",
        height: 90,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.secondText2,
        padding: 10,
        paddingBottom: 50,
        fontFamily: "Montserrat",
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
    textboxdate: {
        position: "absolute",
        right: "7%",
        top: "30%",
        fontFamily: "Montserrat",
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
    viewlinedown: {
        width: "93%",
        height: 1,
        borderRadius: 10,
        backgroundColor: Colors.secondText,
        left: '4%',
        marginTop: 12
    },
    viewboxproduct: {
        width: "100%",
        height: 100,
        marginTop: "5%",
        borderRadius: 10
    },
    viewboxproductDown: {
        width: "100%",
        height: 100,
        marginTop: "2%",
        borderRadius: 10
    },
    viewtitleboxpro: {
        flexDirection: "row-reverse",
        width: "100%",
        height: 40
    },
    texttitleR: {
        fontFamily: "MontserratLight",
        fontSize: 13,
        color: Colors.black,
        left: "20%",


    },
    texttitleL: {
        fontFamily: "MontserratLight",
        fontSize: 13,
        color: Colors.black,
        position: "absolute",
        right: "4%",


    },
    btnbox: {
        width: "30%",
        height: 35,
        position: "absolute",
        left: "4%"
    },
    viewlineup: {
        width: "12%",
        height: 5,
        borderRadius: 10,
        backgroundColor: Colors.secondText,
        left: "45%"
    },
    viewtitlemodal: {
        flexDirection: "row-reverse",
        width: "100%",
        height: 30,
        marginTop: "10%",
        marginBottom: "5%"
    },
    btnboxmodal: {
        width: "30%",
        height: 35,
        position: "absolute",
        right: "3%"
    },

    textboxprice: {
        position: "absolute",
        right: "7%",
        top: "10%",
        fontFamily: "Montserrat",
        fontSize: 13,
        color: Colors.black
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
        width: "8%",
        height: 35,
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
    viewfooter: {
        flexDirection: "row",
        width: "88%",
        height: 68,
        borderRadius: 20,
        marginTop: 15,
        backgroundColor: Colors.primary,
        marginBottom: 25,
        elevation: 3
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

})




export default Orders