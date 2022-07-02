import React, { useEffect, useState } from 'react';
import { Image, Modal, NativeBaseProvider, Progress, } from 'native-base';
import { View, Text, Keyboard, TouchableWithoutFeedback, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator,Linking } from 'react-native';
import Btn from "../components/btn"
import Colors from '../constants/Colors';
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"

import { useDispatch, useSelector } from 'react-redux';
import { getcheck, getdetailsmyorder } from '../store/actions/product';
import Maps from './maporder';








const ActiveOrder = (props) => {
  const dispatch = useDispatch()
  const [accept, setaccept] = useState("در انتظار تایید فروشنده");



  const separate = (num) => {
    const number = num.replace(/\D/g, "")
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}


  const changing = () => {

    setaccept((accept == "در انتظار تایید فروشنده") ? "در حال ارسال به مقصد" : "در انتظار تایید فروشنده")
  }

  const token = "c6e51a7a85f6de25e8724dca9cddd4b14da8d358fc31592a74bd98986b04a7a11d181bd80dcb5d787fd8e21f7adcc66f981f7cba7bbc1fc7eb9b238d99d5de60"
  //const token = useSelector((store) => store.userLogin.datatoken);
  const [Category, setCategory] = useState("");
  const [Orderdetails, setOrderdetails] = useState("");
    const [Orderproduct, setOrderproduct] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setloading] = useState(true);
  const [Position, setPosition] = useState("");
  const [Positionlon, setPositionlon] = useState("");




  const getCheckHandler = async () => {
    try {
        const res = await dispatch(getcheck(token,
          props.route.params.ids
          ));
         
        setCategory(res.data.data)
        console.log(res.data.data);
    } catch (err) {
        console.log(err);
    }
};


const getdetailsMYorderHandler = async () => {
  try {
      setloading(true)
      const res = await dispatch(getdetailsmyorder(token, props.route.params.ids));

      // console.log(res.data);

      setOrderdetails(res.data)
      setOrderproduct(res.data.items)
      setloading(false);
     
  } catch (err) {
      console.log(err);
  }
};







useEffect(() => {
  getCheckHandler();
  getdetailsMYorderHandler();
}, [])









//نقشه
function handlePosition(value) {
  setPosition(value);
 

}




const total = (Orderproduct.reduce((a, v) => a = a + v.price, 0))


const handleOpencall = () => {
  Linking.openURL(`tel:09113043630`);
};

  return !loading ? (
    <NativeBaseProvider>

      <View style={styles.viewContainer}>
       

      <Modal justifyContent="flex-end" size="full"
                    isOpen={showModal} onClose={() => setShowModal(false)}>
                    <Modal.Content style={{ borderTopRightRadius: 50, borderTopLeftRadius: 50 }}>
                        <Modal.Body >
                            <View style={styles.viewlineup}></View>



                            <View style={styles.viewtitlemodal}>
                             
                                <Text style={{ fontFamily: "MontserratBold", fontSize: 18, color: Colors.black, left: "35%" }}>سفارش</Text>
                            </View>


                            {(loading ?
                                <View style={{ width: "100%", height: 50, alignItems: "center", marginTop: 20 }} >
                                    <ActivityIndicator
                                        animating={loading} size={30} color={Colors.primary} />
                                </View>
                                :
                                Orderproduct.map((item, i) => {
                                    return (

                                        <View key={i} style={styles.viewtitleboxpro}>
                                            <Text style={styles.texttitleR}>{item.title} (x{item.quantity})</Text>
                                            <Text style={styles.texttitleL}>{separate(JSON.stringify(item.price))} تومان</Text>
                                        </View>


                                    )
                                }))}


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

                    </Modal.Content>
                </Modal>






      <View style={styles.viewlogo}>
         
           <Maps onSelectPos={handlePosition}/>
          
          </View>
        

          <ScrollView  >
        
          <View style={{
                        width: "100%", backgroundColor: Colors.background, marginTop: "80%",
                        borderTopRightRadius: 60,
                        borderTopLeftRadius: 60,
                  
                    }}>
         <View style={{ height: 10, width: "100%", bottom:accept == "در انتظار تایید فروشنده" ? "50%":"40%"}}>
              <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.touchback}>
              <Ionicons name="chevron-back-outline" size={30} color={Colors.background} />
            </TouchableOpacity>
        </View>
          <View style={styles.viewundermap}>
              <View style={styles.viewline}></View>
              <Text style={styles.textlogo}>{Category.seller_name}</Text>

            </View>
            <View style={{ flexDirection: "row", width: "100%", }}>
              <View style={styles.viewright} >
              <Image source={require('../../assets/image/fast1.png')} alt="image" style={{width:35,height:35}}/>
                <Text style={styles.texttouch}>زمان تحویل :  {new Date(parseInt(Category.prepare_time)).toLocaleTimeString() }</Text>
              </View>

              <View style={styles.viewleft}>
              <Image source={require('../../assets/image/onlineshop.png')} alt="image" style={{width:35,height:35}} />
                <Text style={styles.texttouch}>مبلغ کل : {separate(JSON.stringify(Category.total_price ?Category.total_price: 0 ))} تومان</Text>
              </View>
            </View>




            <View style={{ flexDirection: "row", width: "100%" }}>
              <TouchableOpacity onPress={() => setShowModal(true)}   style={styles.touchright} >
              <Image source={require('../../assets/image/search.png')} alt="image" style={{width:35,height:35}} />
                <Text style={styles.texttouch}>مشاهده سفارش</Text>
              </TouchableOpacity>
              <TouchableOpacity  onPress={handleOpencall}  style={styles.touchleft} >
              <Image source={require('../../assets/image/support.png')} alt="image" style={{width:35,height:35}} />
                <Text style={styles.texttouch}>تماس با پشتیبانی</Text>
              </TouchableOpacity>
            </View>

            {accept == "در انتظار تایید فروشنده"
              ?
              <View></View>
              :

              <View style={{ width: "100%", height: 70, top: "45%",marginBottom:"12%" }}>

               <Image source={require('../../assets/image/fast1.png')} alt="image" style={{width:35,height:35,left:"40%"}} />

                <Progress size="lg" bg={Colors.RGB} _filledTrack={{
                  bg: Colors.primary
                }} value={45} mx="10" />

                <View style={styles.viewstart}>
                  <Text style={styles.textstartstop}>مبدا</Text>
                </View>

                <View style={styles.viewstop}>
                  <Text style={styles.textstartstop}>مقصد</Text>
                </View>

                <View style={styles.viewpoint}></View>

              </View>
            }

            <Btn
              label={"وضعیت سفارش : " + accept}
              touchableStyle={{ backgroundColor: accept === "در انتظار تایید فروشنده" ? Colors.primary : Colors.success }}
              style={{ width: "97%", height: 60, marginLeft: "6%", marginTop: "70%",marginBottom:30 }}
              textStyle={{ bottom: 10, fontSize: 12 }}
              onPress={() => setaccept(Category.final_status_label)}
            />


          </View>

        </ScrollView>

        



       



      </View>

    </NativeBaseProvider>
  ) : (
    <NativeBaseProvider>
        <View style={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "center",backgroundColor:Colors.background }} >
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
    backgroundColor: Colors.background,
  },
  viewlogo: {
    width: "100%",
    height:350,
    alignItems: "center",
    justifyContent: "center",
   position:"absolute"
   
    
  
    
  },
  touchback: {
    justifyContent: "center",
    alignItems: "center",
    width: "11%",
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    left: "8%"
  },
  viewundermap: {
    width: "100%",
    height: 140,
    
  },
  viewline: {
    width: "12%",
    height: 5,
    left:"45%",
    marginTop: "8%",
    borderRadius: 10,
    backgroundColor: Colors.secondText
  },
  textlogo: {
    fontFamily: "MontserratBold",
    fontSize: 18,
    marginTop: "5%",
    right:"10%"
  },
  viewdetails: {
    width: "100%",
    height: 100,
    backgroundColor: "red"
  },
  viewright: {
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
    height: 90,
    backgroundColor: Colors.RGB,
    position: "absolute",
    right: "8%",
    borderRadius: 15
  },
  viewleft: {
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
    height: 90,
    backgroundColor: Colors.RGB,
    position: "absolute",
    left: "8%",
    borderRadius: 15
  },
  touchright: {
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
    height: 90,
    backgroundColor:
      Colors.RGB, position: "absolute",
    right: "8%",
    top: 100,
    borderRadius: 15
  },
  touchleft: {
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
    height: 90,
    backgroundColor: Colors.RGB,
    position: "absolute",
    left: "8%",
    top: 100,
    borderRadius: 15
  },
  texttouch: {
    fontFamily: "Montserrat",
    fontSize: 12,
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
},  viewboxproductDown: {
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
viewlinedown: {
  width: "93%",
  height: 1,
  borderRadius: 10,
  backgroundColor: Colors.secondText,
  left: '4%',
  marginTop: 12
},

})




export default ActiveOrder