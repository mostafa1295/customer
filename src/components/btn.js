import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import Colors from "../constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons"




const Btn=(props)=> {
 
  return (
    <View style={{ width: "100%", height: 50, ...props.style }}>
    
      <TouchableOpacity
        style={{width: "90%",
        height: "90%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.primary,
        borderRadius: 7,
        elevation: 3,
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 0 },
        shadowColor: Colors.primary, ...props.touchableStyle }}
        onPress={props.onPress}
      >
         {props.loading && <ActivityIndicator size={props.sizespin} color={props.colorspin} style={{position:"absolute" }} />}
        <View style={{...props.viewicon}}>
           <MaterialCommunityIcons name={props.nameicon} size={props.sizeicon} color={props.coloricon} style={{...props.styleicon}} />
        </View>
        
        
         {!props.loading && (
          <Text style={{fontFamily: "Montserrat",fontSize: 15,color: "#fff" , ...props.textStyle }}>
            {props.label}
          </Text>

         
       
         )}

   
        
      </TouchableOpacity>
    </View>
  );
 }


export default Btn