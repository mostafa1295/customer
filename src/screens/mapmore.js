import React, { Component, useState } from 'react'
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Platform, TouchableOpacity } from 'react-native';
import Colors from "../constants/Colors"
import { Ionicons } from "@expo/vector-icons";


  const Maps =(props)=>  {

    //token= "c6e51a7a85f6de25e8724dca9cddd4b14da8d358fc31592a74bd98986b04a7a11d181bd80dcb5d787fd8e21f7adcc66f981f7cba7bbc1fc7eb9b238d99d5de60"
   const [region,setregion]=useState({
    latitude: 37.287581,
    longitude: 49.592735,
    latitudeDelta: 0.0050,
    longitudeDelta: 0.0021,
})

const [markers,setmarkers]=useState([])
   

       
      
       
          
      

   

    
 const  onregionChange=({ region })=> {
        setregion({ region });
    }


 const  makeMarker=({ nativeEvent })=> {
        const pos = nativeEvent.coordinate;
        setmarkers(  pos.latitude,
                     pos.longitude,)
        
        
            props.onSelectPos(pos);

        
    }



 const  renderMarker=(marker, index)=> {
         <Marker key={index} coordinate={marker}
        title={"Marker Title"}
        description={"Marker Description Text"}
        />
    }







   const getCurrentPosition=() =>{

        Geolocation.getCurrentPosition(

            position => setregion({
                locationInfo: position,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.0980,
                    longitudeDelta: 0.0421,
               
            })
            , error => console.log(error)
            , { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 })


    }






   
   

   
        return (

            <View style={styles.container}>
                

               
                <MapView
               zoomControlEnabled
               
                    style={styles.map}
                    initialRegion={{
                        latitude: 37.287581,
                        longitude: 49.592735,
                        latitudeDelta: 0.0850,
                        longitudeDelta: 0.0121,
                    }}
                   // region={region}
                    //showsTraffic={true}
                    showsUserLocation={true}

                    onPress={makeMarker}
                    onRegionChange={onregionChange}
                >
                    {/* {
                        markers.map(renderMarker)
                    } */}
<Marker
 draggable
 coordinate={{
    latitude: 37.287581,
    longitude: 49.592735,
 }}
 onDragEnd={
   (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
 }
 title={'Test Marker'}
 description={'This is a description of the marker'}
/>


                </MapView>
                




            </View>





        )
    }

    





export default Maps

const styles = StyleSheet.create({
    container: {

        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: "100%",
        height: 200,
        
    },
});



// constructor(props) {
//     super(props);

   
  
//     this.state = {
//         region: {
//             latitude: 37.287581,
//             longitude: 49.592735,
//             latitudeDelta: 0.0050,
//             longitudeDelta: 0.0021,
//         },
//         markers: [{
                    
//             latitude: 37.28701447473043,
//             longitude: 49.59269855171443,
//         }],
//         Shop:{}
        
//     }
// }




// onregionChange({ region }) {
//     this.setState({ region });
// }


// makeMarker({ nativeEvent }) {
//     const pos = nativeEvent.coordinate;
//     this.setState(() => {
//         return {
//             markers: [

//                 {
                    
//                     latitude: 37.28701447473043,
//                     longitude: 49.59269855171443,
//                 }
//             ]
//         }
//     })
//      this.props.onSelectPos(pos);

    
// }



// renderMarker(marker, index) {
//     return <Marker key={index} coordinate={marker}
//     title={"Marker Title"}
//     description={"Marker Description Text"}
//     />
// }







// getCurrentPosition() {

//     Geolocation.getCurrentPosition(

//         position => this.setState({
//             locationInfo: position,
//             region: {
//                 latitude: position.coords.latitude,
//                 longitude: position.coords.longitude,
//                 latitudeDelta: 0.0980,
//                 longitudeDelta: 0.0421,
//             }
//         })
//         , error => console.log(error)
//         , { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 })


// }






// render() {



//     return (

//         <View style={styles.container}>
//             {/* <View style={{ flexDirection: "row-reverse", width: "100%", height: 20, marginTop: 40, alignItems: "center", justifyContent: "center" }}>


                




//                 <TouchableOpacity onPress={() => {this.props.navigation.navigate("register2",{
//                     position:position
//                 })
            
//                  } }
                
//                 style={{ width: 40, height: 40, alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: Colors.secondText, borderRadius: 15, left: 100 }}>
//                     <Ionicons name="chevron-back-outline" size={25} color={Colors.primary} />
//                 </TouchableOpacity>
//             </View> */}

           
//             <MapView
//                 style={styles.map}
//                 region={this.state.region}
//                 //showsTraffic={true}
//                 showsUserLocation={true}

//                 onPress={this.makeMarker.bind(this)}
//                 onRegionChange={this.onregionChange.bind(this)}
//             >
//                 {
//                     this.state.markers.map(this.renderMarker.bind(this))
//                 }



//             </MapView>
            




//         </View>





//     )
// }





// }

