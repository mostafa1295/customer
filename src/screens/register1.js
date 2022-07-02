import React, { useState } from "react"
import { View, Text, Keyboard, TouchableWithoutFeedback, ScrollView ,StyleSheet} from 'react-native';
import Colors from "../constants/Colors"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import INPU from "../components/input"
import Btn from "../components/btn";
import { sendprofile } from "../store/actions/userLogin";
import { useSelector } from "react-redux";





const Register1 = (props) => {
   
    const token = "70ef82767fd7bdfd61dd12da00ffbe72f61d117c329faf00cc6864be8de5a7c1acd070f11b353cc972bda680abeb811bd6cad77de9241f0bfc28ca937d43f395"
    //const token = useSelector((store) => store.userLogin.datatoken);
    const [error,seterror]=useState("")
    const [Name,setName] = useState("");
    const [Family, setFamily] = useState("");
    const [load, setload] = useState(false);


    const sendProfileHandler = async () => {
        try {
            setload(true)
         
          const res=  await sendprofile(token,Name,Family)

console.log(res);

if (res.status==400) {
    seterror(res.message)
}
if (res.status==201) {
    seterror(res.message)
    setTimeout(()=>{
       props.navigation.navigate("register2",{
            city:"",
            sector:"", 
            id:"",
            geo:"",
            address:"",
         },1000) 
    })
         
    
   
}

            setload(false)
        } catch (err) {
          console.log(err);
        }
      };



    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ScrollView style={{ backgroundColor: Colors.background, }}>



                <View style={styles.viewlogo}>
                    <MaterialCommunityIcons name="fingerprint" color={Colors.primary} size={100} />
                    <Text style={{ fontFamily: "MontserratLight", fontSize: 25 }}>چیوانه</Text>
                </View>


                <INPU
                    label="نام "
                    styleview={{ marginTop: 140, }}
                    stylelabel={{ width: "8%" }}
                    value={Name}
                    onChangeText={task => setName(task)}
                    
                    keyboardType="default"

                />

                <INPU
                    label="نام خانوادگی"
                    styleview={{ marginTop: 30, }}
                    stylelabel={{ width: "20%" }}
                    value={Family}
                    onChangeText={pass => setFamily(pass)}
                    keyboardType="default"


                />

                <View style={{width:"100%",height:30,top:30,alignItems:"center"}}>
                    <Text style={{fontFamily:"MontserratBold",fontSize:18,color:"red"}}>{error}</Text>
                </View>

                <Btn
                    label="ثبت نام"
                    touchableStyle={{ height: 55 }}
                    style={{ marginLeft: "5%", marginTop: 80, marginBottom: 10 }}
                    textStyle={{ bottom: 10, fontSize: 16 }}
                    loading={load}
                                colorspin={Colors.background}
                                sizespin={25}
                    onPress={()=>{
                        sendProfileHandler()
                       
                    }}
                />
            </ScrollView>
        </TouchableWithoutFeedback>

    )
}

export default Register1;
const styles = StyleSheet.create({
    viewlogo: {
        flexDirection: "column",
        width: "100%",
        height: 150,
        alignItems: "center",
        top: 80
    }
})