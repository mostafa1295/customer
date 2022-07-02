import React, { Component } from 'react'
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Platform, TouchableOpacity } from 'react-native';
import Colors from "../constants/Colors"
import { Ionicons } from "@expo/vector-icons";
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';


class Maps extends Component {
    constructor(props) {
        super(props);

       
        // if (Platform.OS === 'android') {
        //     this.getPermissions()
        // } else {
        //     this.findCoordinates()
        // }

        this.state = {
            region: {
                latitude: 37.287581,
                longitude: 49.592735,
                latitudeDelta: 0.1980,
                longitudeDelta: 0.0421,
            },
            markers: []
        }
    }





    getPermissions = () => {
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000})
        .then(data => {
          if (data === "already-enabled") {
            this.getCurrentPosition()
          } else {
            setTimeout(() => {
              this.getCurrentPosition()
            }, 1000)
          }
        })
      };

    
    onregionChange({ region }) {
        this.setState({ region });
    }


    makeMarker({ nativeEvent }) {
        const pos = nativeEvent.coordinate;
        this.setState(() => {
            return {
                markers: [

                    {

                        latitude: pos.latitude,
                        longitude: pos.longitude,
                    }
                ]
            }
        })
        this.props.onSelectPos(pos);

        
    }



    renderMarker(marker, index) {
        return <Marker key={index} coordinate={marker}  
        title={"Marker Title"}
            description={"Marker Description Text"}
        />
    }







    getCurrentPosition() {

        Geolocation.getCurrentPosition(

            position => this.setState({
                locationInfo: position,
                region: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.0980,
                    longitudeDelta: 0.0421,
                }
            })
            , error => console.log(error)
            , { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 })


    }






    render() {
   

   
        return (

            <View style={styles.container}>
             


                <MapView
                 zoomControlEnabled
                    style={styles.map}
                    region={this.state.region}
                    showsTraffic={true}
                    showsUserLocation={true}

                    onLongPress={this.makeMarker.bind(this)}
                    onRegionChange={this.onregionChange.bind(this)}
                >
                    {
                        this.state.markers.map(this.renderMarker.bind(this))
                    }



                </MapView>





            </View>





        )
    }

    



}

export default Maps

const styles = StyleSheet.create({
    container: {

        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: 400,
        height: 400,
        
    },
});





