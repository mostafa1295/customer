import React, { useEffect, useState } from 'react';
import { View, Text, Keyboard, TouchableWithoutFeedback, ScrollView, TouchableOpacity, Pressable, Modal, StyleSheet, Alert, Image, ActivityIndicator, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import Colors from "../constants/Colors"
import INPU from "../components/input"
import Btn from "../components/btn";
import { Ionicons } from "@expo/vector-icons";
import { CheckIcon, NativeBaseProvider, Select, VStack } from 'native-base';
import Maps from './map';
import { addnewaddress, getCity, getSector, getuserAddress, setuserAddress, updateaddress } from '../store/actions/userLogin';
import { useDispatch, useSelector } from 'react-redux';




const Register2 = (props) => {
    const dispatch = useDispatch();
    const token = "c668f526a8705535b18601b462c0d6f6a75e11e4d2097f8d5b53c6052b65c67ed085dda5cbe210a719012db1c24c4ea49f63e017dd4a758855a5bec184d74d9f"
    // const token = useSelector((store) => store.userLogin.datatoken);
    const [modalVisible, setModalVisible] = useState(false);








    const [load, setload] = useState(false);
    const [City, setCity] = useState("");
    const [Town, setTown] = useState("");
    const [Address, setAddress] = useState("");
    const [Position, setPosition] = useState("");
    const [Positionlon, setPositionlon] = useState("");
    const [error, seterror] = useState("")

    const [State, setState] = useState({
        address: props.route.params.address,
        city_id: props.route.params.city,
        sector_id: props.route.params.sector,
        geo: props.route.params.geo,
        
    })





    // ست کردن شهرها
    const [citytag, setcitytag] = useState("")
    const setcityhandler = async () => {
        try {
            const tok = await dispatch(getCity(
                token
            ))

            // console.log(tok.data);
          
            if(tok.data.length > 0){  
                setcitytag(tok.data);
                if(State.city_id){

                    setsectorhandler(State.city_id);
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    let fresh = []
    for (let i = 0; i < citytag.length; i++) {
        fresh.push(
            <Select.Item key={i} _text={{
                style: { fontFamily: "Montserrat" }
            }} label={citytag[i].name} value={citytag[i].term_id} />
        )
    }





    // ست کردن محله ها
    const [sectortag, setsectortag] = useState("")




    const setsectorhandler = async (id,edit=false) => {

        
            
        
        try {
            setCity(id)
            if(edit == true){
                setState({...State, city_id: id });
            }
            const tok = await dispatch(getSector(
                token,
                id

            ))
            // console.log(tok.data);
            setsectortag(tok.data)
        } catch (err) {
            console.log(err);
        }
  
    };

    let Sectoring = []
    for (let i = 0; i < sectortag.length; i++) {
        Sectoring.push(
            <Select.Item key={i} _text={{
                style: { fontFamily: "Montserrat" }
            }} label={sectortag[i].name} value={sectortag[i].term_id} />
        )
    }







    useEffect(() => {
        setcityhandler();

        // getUseraddressHandler();

    }, [])







    //نقشه
    function handlePosition(value) {
        setPosition(value.latitude);
        setPositionlon(value.longitude)

    }



    // // //گرفتن ادرس
    // const getUseraddressHandler = async () => {
    //     try {

    //         const res = await dispatch(getuserAddress(token));

    //         console.log(res.data);

    //         setAddress(res.data)

    //     } catch (err) {
    //         console.log(err);
    //     }
    // };




    // // ارسال ادرس
    // const sendUseraddressHandler = () => {
    //     try {

    //         setuserAddress(
    //             token,
    //             Address.id
    //         )

    //     } catch (err) {
    //         console.log(err);
    //     }
    // };



    //  افزودن ادرس
    const ADDnewaddressHandler = async () => {
        try {
            setload(true)
            const res = await addnewaddress(
                token,
                State.city_id,
                State.sector_id,
                State.address,
                Position,
                Positionlon


            )
            if (res.status == 400) {
                seterror(res.message)
            }
            if (res.status == 201) {
                seterror(res.message)
                setTimeout(() => {
                    props.navigation.navigate("dashboard")
                }, 1000);
            }



            setload(false)
        } catch (err) {
            console.log(err);
        }
    };


 //  ویرایش ادرس
 const updateaddressHandler = async () => {
    try {
        setload(true)
        const res = await updateaddress(
            token,
            State.city_id,
            State.sector_id,
            State.address,
            Position,
            // Positionlon,
            props.route.params.id,

        )
        console.log(res.data);
        if (res.status == 400) {
            seterror(res.message)
        }
        if (res.status == 201) {
            seterror(res.message)
            setTimeout(() => {
                props.navigation.navigate("address")
            }, 2000);
        }



        setload(false)
    } catch (err) {
        console.log(err);
    }
};























    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <NativeBaseProvider>


                <View style={styles.container}>


                    <View style={styles.viewlogo}>
                        {props.route.params.id ?
                            <Text style={{ fontFamily: "MontserratBold", fontSize: 18 }}>
                                ویرایش آدرس
                            </Text>
                            :
                            <Text style={{ fontFamily: "MontserratBold", fontSize: 18 }}>
                                افزودن آدرس
                            </Text>
                        }


                    </View>


                    <ScrollView >









                        <View style={styles.viewselect}>

                            <View style={styles.viewtitle}>
                                <Text style={{ fontFamily: "Montserrat", fontSize: 12, color: Colors.secondText3 }}>
                                    شهر
                                </Text>
                            </View>

                            <Ionicons name="chevron-down-outline" size={18} color={Colors.secondText3} style={{ top: "34%", right: "37%" }} />
                            <Select
                                selectedValue={parseInt(State.city_id)}
                                w="90%"
                                h={60}
                                dropdownIcon={true}
                                paddingRight={3}
                                borderColor={Colors.secondText3}
                                borderWidth={1}
                                bottom={1}
                                variant="outline"
                                fontFamily="Montserrat"
                                fontSize={12}
                                flexDirection="row-reverse"
                                accessibilityLabel="شهر خود را انتخاب کنید"
                                placeholder="شهر خود را انتخاب کنید"
                                onValueChange={(i) => {
                                    setState({...State, city_id: i })
                                    setsectorhandler(i)
                                }}
                                _selectedItem={{
                                    bg: Colors.primary,
                                    startIcon: <CheckIcon size={5} color={Colors.black} />,

                                }}
                            >


                                {fresh}

                            </Select>

                        </View>


{State.city_id ?
                        <View style={styles.viewselecttown}>

                            <View style={styles.viewtitle}>
                                <Text style={{ fontFamily: "Montserrat", fontSize: 12, color: Colors.secondText3 }}>
                                    محله
                                </Text>
                            </View>

                            <Ionicons name="chevron-down-outline" size={18} color={Colors.secondText3} style={{ top: "34%", right: "37%" }} />
                            <Select
                                selectedValue={parseInt(State.sector_id)}
                                w="90%"
                                h={60}
                                dropdownIcon={true}
                                paddingRight={3}
                                borderColor={Colors.secondText3}
                                borderWidth={1}
                                bottom={1}
                                variant="outline"
                                fontFamily="Montserrat"
                                fontSize={12}
                                flexDirection="row-reverse"
                                accessibilityLabel="محله خود را انتخاب کنید"
                                placeholder="محله خود را انتخاب کنید"
                                onValueChange={(text) => setState({ ...State, sector_id: text })}
                                _selectedItem={{
                                    bg: Colors.primary,
                                    startIcon: <CheckIcon size={5} color={Colors.black} />,

                                }}
                            >








                                {Sectoring}

                            </Select>

                        </View>
:
<View style={styles.viewselecttown}>


    <Text style={{ fontFamily: "Montserrat", fontSize: 15, color: Colors.primary,marginTop:20 }}>
        ابتدا شهر را انتخاب کنید
    </Text>



</View>
}
                        <INPU
                            label="آدرس کامل"
                            styleview={{ bottom: 20 }}
                            stylelabel={{ width: "20%" }}
                            value={State.address}
                            onChangeText={text => setState({ ...State, address: text })}
                            keyboardType="default"

                        />



                        <View style={styles.centeredView}>
                            <Modal
                                animationType="fade"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => {
                                    Alert.alert('Modal has been closed.');
                                    setModalVisible(!modalVisible);

                                }}
                            >
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>

                                        <Maps onSelectPos={handlePosition} />
                                        <Pressable
                                            style={[styles.button, styles.buttonClose]}
                                            onPress={() => {
                                                setModalVisible(!modalVisible)
                                            }}>
                                            <Text style={styles.textStyle}>تایید</Text>
                                        </Pressable>

                                    </View>
                                </View>
                            </Modal>
                        </View>

                        <View style={styles.viewlocation}>
                            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addicon}>
                                <Ionicons name="add-outline" size={25} color={Colors.primary} />
                            </TouchableOpacity>
                            <View style={styles.viewtextadd}>
                                <Text style={styles.textadd}>افزودن لوکیشن</Text>
                                <Text style={styles.textlocation}> موقعیت مکانی من</Text>
                            </View>
                        </View>

                        <View style={{ width: "100%", height: 30, alignItems: "center" }}>
                            <Text style={{ fontFamily: "MontserratBold", fontSize: 15, color: Colors.secondText3 }} >{Positionlon ? Position + "   ,   " + Positionlon : State.geo}</Text>
                        </View>

                        <View style={{ width: "100%", height: 30, top: 30, alignItems: "center" }}>
                            <Text style={{ fontFamily: "MontserratBold", fontSize: 18, color: "red" }}>{error}</Text>
                        </View>
                        <View style={styles.viewbtn}>


                            {/* <Btn
                                style={{ width: "45%", height: 55, }}
                                textStyle={{ fontSize: 16, bottom: 8 }}
                                touchableStyle={{ backgroundColor: Colors.secondText3, marginLeft: 10 }}
                                label="ردکردن"
                               
                                onPress={() => props.navigation.navigate("dashboard",{
                                    city:Address.address,
                                    
                                })}
                            /> */}






                            <Btn style={{ width: "98%", height: 55 }}
                                textStyle={{ fontSize: 16, bottom: 8 }}
                                touchableStyle={{ marginLeft: 17 }}
                                label="ثبت آدرس "
                                loading={load}
                                colorspin={Colors.background}
                                sizespin={25}
                                onPress={() => {
                                   if (!props.route.params.address) {
                                    ADDnewaddressHandler()
                                   }else{
                                      updateaddressHandler(); 
                                   }
                                        
                                    
                                        

                                }}
                            />
                        </View>



                    </ScrollView>
                </View>


            </NativeBaseProvider>
        </TouchableWithoutFeedback>
    )
}

export default Register2;

const styles = StyleSheet.create({

    viewbtn: {
        flexDirection: "row",
        width: "100%",
        height: 150,
        top: 50,
        justifyContent: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,

    },
    modalView: {

        backgroundColor: Colors.background,
        borderRadius: 20,
        alignItems: 'center',
        width: 400,
        height: 600,
        elevation: 5,

    },
    modalViewimage: {
        backgroundColor: Colors.background,
        borderRadius: 20,
        alignItems: 'center',
        width: 300,
        height: 250,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: "90%",
        marginTop: 30




    },
    buttonClose: {
        backgroundColor: Colors.primary,
    },
    textStyle: {
        color: Colors.background,
        textAlign: 'center',
        fontFamily: "Montserrat"
    },
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: Colors.background
    },
    viewlogo: {
        width: "100%",
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 60
    },
    viewimage: {
        width: "100%",
        height: 120,
        alignItems: "center",
        justifyContent: "center",
        top: 40
    },
    viewtextimage: {
        width: 100,
        height: 100,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.primary
    },
    viewselect: {
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        marginRight: "5%",
        marginTop: "20%"
    },
    viewselecttown: {
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        marginRight: "5%",
        marginBottom: "13%"
    },
    viewtitle: {
        width: "8%",
        height: 20,
        backgroundColor: Colors.background,
        alignItems: "center",
        zIndex: 2,
        left: "37%",
        top: "20%"
    },
    viewlocation: {
        flexDirection: "row-reverse",
        width: "100%",
        height: 100,
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    addicon: {
        borderWidth: 2,
        borderColor: Colors.secondText,
        width: 60,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
        marginRight: 30
    },
    viewtextadd: {
        width: "50%",
        height: 60,
        marginRight: 20,
    },
    textadd: {
        fontFamily: "MontserratLight",
        fontSize: 16,
        marginRight: 3,
        marginTop: 5
    },
    textlocation: {
        fontFamily: "MontserratLight",
        fontSize: 12,
        color: Colors.primary
    }

})