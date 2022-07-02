import React, { useEffect, useState } from "react"
import { View, Text, ScrollView, Image, TouchableOpacity, TextInput, ActivityIndicator, SafeAreaView, StyleSheet, FileList } from 'react-native';
import Colors from "../constants/Colors"

import INPU from "../components/input"
import Btn from "../components/btn";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getcomment, replycomment } from "../store/actions/product";
// import { useDispatch } from "react-redux";
// import { getcomment, replycomment } from "../stor/actions/commandreport";
// import { getsellerinfo } from "../stor/actions/userLogin";





// const Commenting = (props) => {




//     return (
//         <SafeAreaView>
//             <View style={styles.viewCommenting}>

//                 <View style={styles.viewtext}>
//                     <Text style={styles.textname}>{props.name}</Text>
//                     <Text style={styles.textdate}>{props.date}</Text>
//                 </View>
//                 <View style={styles.viewimage}>
//                     <Image source={props.Images} style={{ width: 50, height: 50, borderRadius: 50 }} />
//                 </View>
//                 <View style={styles.viewrate} >
//                     <Text style={styles.textrate}>{props.rating}</Text>
//                 </View>
//             </View>

//             <View style={styles.viewcomment}>
//                 <Text style={styles.textcomment}>{props.comment}</Text>
//             </View>


//         </SafeAreaView>
//     )
// }


const Comments = (props) => {
    const dispatch = useDispatch();
    const [Commen, setCommen] = useState([]);
    const [rating, setrating] = useState("")
    const [loading, setloading] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    
    const token = "c6e51a7a85f6de25e8724dca9cddd4b14da8d358fc31592a74bd98986b04a7a11d181bd80dcb5d787fd8e21f7adcc66f981f7cba7bbc1fc7eb9b238d99d5de60"
   // const token = useSelector((store) => store.userLogin.datatoken);
    const [resultcom, setresultcom] = useState("");





    const getcommentHandler = async () => {
        try {
            // setIsFetching(true)
            setloading(true)
            const res = await dispatch(getcomment(token,
               props.route.params.ids 
                ));


            if (Commen == "") {
                setloading(false);
                // setresultcom("اطلاعاتی موجود نمی باشد")
            }
            console.log(res.data);
            setrating(res.data.rating)
            setCommen(res.data.comments)
            // setIsetloadingsFetching(false);
            setloading(false);
        } catch (err) {
            console.log(err);
        }
    };







    useEffect(() => {
        getcommentHandler();

    }, [])

    return (

        <View style={styles.container}>

            <View style={styles.viewlogo}>




                <Text style={{ fontFamily: "MontserratBold", fontSize: 20, left: "10%" }}>
                    نظرات
                </Text>




                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ width: "11%", height: 40, alignItems: "center", justifyContent: "center", backgroundColor: Colors.primary, borderRadius: 12, position: "absolute", right: "4%" }}>
                    <Ionicons name="chevron-back-outline" size={25} color={Colors.background} />
                </TouchableOpacity>
            </View>











            <View style={styles.viewbox}>
                <View style={styles.box}>
                    <View style={styles.viewicon}>
                        <MaterialCommunityIcons name="currency-usd" size={30} color={Colors.background} />
                    </View>
                    <Text style={styles.textratebox}>میانگین امتیازات فروشنده</Text>
                    <Text style={styles.ratebox}>{rating}</Text>

                </View>
            </View>






            {/* <FileList
onRefresh={getcommentHandler}
refreshing={isFetching}
data={Commen}
showsVerticalScrollIndicator={false}
renderItem={({item,i})=>
<SafeAreaView key={i}>
<View  style={styles.viewCommenting}>
 
   <View style={styles.viewtext}>
       <Text style={styles.textname}>{item.user.first_name+" "+item.user.last_name}</Text>
       <Text style={styles.textdate}>{item.comment_date}</Text>
   </View>
   <View style={styles.viewimage}>
       <Image source={{uri:item.user.avatar}} style={{ width: 50, height: 50, borderRadius: 50 }} />
   </View>
   <View style={styles.viewrate} >
       <Text style={styles.textrate}></Text>
   </View>
</View>


<View style={styles.viewcomment}>
   <Text style={styles.textcomment}>{item.comment_content}</Text>
</View> 

{item.reply.map((itemreplay,t)=>{
return(
<View key={t} style={styles.viewansver}>
       <View style={{ width: "70%", height: 50, left: 18 }}>
           <Text style={styles.textansver}><Text style={{ fontFamily: "MontserratBold", fontSize: 13, color: Colors.secondText3 }}>پاسخ فروشنده:</Text>{itemreplay.comment_content}</Text>
       </View>
       <View style={{ width: "7%", height: 50, left: 20 }}>
           <MaterialCommunityIcons name="reply" size={25} color={Colors.secondText3} />
       </View>
   </View> 
)})}
    

      </SafeAreaView>

}

/>

                */}


            {(loading ?
                <View style={{ width: "100%", height: 50, alignItems: "center", marginTop: 20 }} >
                    <ActivityIndicator
                        animating={loading} size={30} color={Colors.primary} />
                </View>
                :

                Commen.map((item, i) => {
                    return (
                        <SafeAreaView key={i}>
                            <View style={styles.viewCommenting}>

                                <View style={styles.viewtext}>
                                    <Text style={styles.textname}>{item.user.first_name + " " + item.user.last_name}</Text>
                                    <Text style={styles.textdate}>{item.comment_date}</Text>
                                </View>
                                <View style={styles.viewimage}>
                                    <Image source={{ uri: item.user.avatar }} style={{ width: 50, height: 50, borderRadius: 50 }} />
                                </View>
                                <View style={styles.viewrate} >
                                    <Text style={styles.textrate}>{item.rating}</Text>
                                </View>
                            </View>


                            <View style={styles.viewcomment}>
                                <Text style={styles.textcomment}>{item.comment_content}</Text>
                            </View>

                            {item.reply.map((itemreplay, t) => {
                                return (
                                    <View key={t} style={styles.viewansver}>
                                        <View style={{ width: "70%", height: 50, left: 18 }}>
                                            <Text style={styles.textansver}><Text style={{ fontFamily: "MontserratBold", fontSize: 13, color: Colors.secondText3 }}>پاسخ فروشنده:</Text>{itemreplay.comment_content}</Text>
                                        </View>
                                        <View style={{ width: "7%", height: 50, left: 20 }}>
                                            <MaterialCommunityIcons name="reply" size={25} color={Colors.secondText3} />
                                        </View>
                                    </View>
                                )
                            })}


                        </SafeAreaView>

                    )
                }))}

            <Text style={{ fontFamily: "MontserratBold", fontSize: 15, color: "red", right: 140 }}>
                {resultcom}
            </Text>













        </View>
    )
}

export default Comments;

const styles = StyleSheet.create({
    viewCommenting: {
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
        height: 75,
    },
    viewtext: {
        position: "absolute",
        right: "18%",
        width: '30%',
        height: 50,
        alignItems: "center",
    },
    textname: {
        fontFamily: "Montserrat",
        fontSize: 15,
    },
    textdate: {
        fontFamily: "Montserrat",
        fontSize: 13,
        color: Colors.secondText3,
        left: 15
    },
    viewimage: {
        position: "absolute",
        right: "8%",
        width: 50,
        height: 50,
        borderRadius: 50
    },
    viewrate: {
        position: "absolute",
        right: "6%",
        elevation: 4,
        bottom: "17%",
        width: 18,
        height: 18,
        borderRadius: 7,
        backgroundColor: Colors.secondary,
        alignItems: "center",
        justifyContent: "center"
    },
    textrate: {
        fontFamily: "MontserratBold1",
        fontSize: 8,
        color: Colors.background
    },
    viewcomment: {
        width: "89%",
        marginLeft: "5%",
        alignItems: "center"
    },
    textcomment: {
        fontFamily: "Montserrat",
        fontSize: 16,
        color: Colors.secondText3,
        textAlign: "right"
    },
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: Colors.background
    },
    viewlogo: {
        flexDirection: "row-reverse",
        width: "100%",
        height: 80,
        marginTop: 30,
        alignItems: "center",
        justifyContent: "center",

    },

    viewbox: {
        width: "100%",
        height: 150,
        marginTop: 10,
        alignItems: 'center'
    },
    box: {
        width: "89%",
        height: 120,
        right: 4,
        borderRadius: 5,
        backgroundColor: Colors.success,
        alignItems: "center"
    },
    viewicon: {
        width: 40, height: 40,
        borderRadius: 40,
        backgroundColor: Colors.RGB2,
        alignItems: "center",
        justifyContent: "center",
        top: 10
    },
    textratebox: {
        fontFamily: "MontserratLight",
        fontSize: 12,
        marginTop: 14,
        color: Colors.background
    },
    ratebox: {
        fontFamily: "MontserratBold",
        fontSize: 12,
        marginTop: 4,
        color: Colors.background
    },
    viewansver: {
        flexDirection: "row",
        width: "100%",
        height: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    textansver: {
        fontFamily: "Montserrat",
        fontSize: 13,
        color: Colors.secondText3,
        textAlign: "right"
    },
    viewansverbox: {
        width: "85%",
        marginLeft: 50,
        right: 25,
        alignItems: "center"
    },
    textinput: {
        flexDirection: "row-reverse",
        width: "100%",
        height: 90,
        borderRadius: 10,
        borderWidth: 1, borderColor: Colors.secondText2,
        padding: 10, paddingRight: 60,
        paddingBottom: 50,
        fontFamily: "Montserrat",
    },



})