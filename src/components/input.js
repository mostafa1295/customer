import React from "react";
import {
  View,
  Text,
  TextInput
} from "react-native";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";



const INPU=(props)=> {
    const [focuse,setfocuse]=React.useState(false)
 
  

  return (
    



   
    <View  style={{width:"100%",height:55,alignItems:"center",...props.styleview}} >
   
    <TextInput    onFocus={() => setfocuse(true)} value={props.value} onChangeText={props.onChangeText} maxLength={props.maxLength} placeholder={props.placeholder} multiline={props.multiline} editable={props.editable}  
        onBlur={() => setfocuse(false)} keyboardType={props.keyboardType}   style={{width:"90%",height:55,borderWidth:1,borderRadius:5,padding:10,fontFamily:"Montserrat",borderColor:(focuse==true?Colors.primary:Colors.secondText3),...props.styleinput}}/>
   <Ionicons name={props.nameicon} size={20} color={props.coloricon} style={{...props.styleicon}} onPress={props.onPressicon} />
  
  <View style={{width:90,height:25,backgroundColor:"white",top:-13,position:"absolute",right:"8%",...props.stylelabel}}><Text style={{fontFamily:"MontserratLight",fontSize:13,marginRight:5,color:(focuse==true?Colors.primary:Colors.secondText3)}}>{props.label}</Text></View>
   </View>
 
   
  );
 }

export default INPU