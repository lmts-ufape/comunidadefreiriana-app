import React from 'react';
import {Feather} from '@expo/vector-icons';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout,PROVIDER_GOOGLE} from 'react-native-maps';
import mapMarker from '../images/pin.png';
import {useNavigation} from '@react-navigation/native'


export default function PFMap() {
    const navigation = useNavigation();

    function handleNavigateToPFDetails() {
        navigation.navigate('PFDetails')
    }

    return(
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map} 
                initialRegion={{
                    latitude: -27.2092852, 
                    longitude: -49.6401092,
                    latitudeDelta: 0.008,
                    longitudeDelta: 0.008, 
                }}
            >
         <Marker
            icon={mapMarker}
            calloutAnchor= {{
              x: 2.7,
              y: 8.8,
            }}
            coordinate={{
              latitude: -27.2092852, 
              longitude: -49.6401092,
            }}
         >
           <Callout tooltip onPress={handleNavigateToPFDetails}>
            <view style={styles.calloutContainer}>
              <text style={styles.calloutText}>Tuzin Pub</text>
            </view>
           </Callout>
         </Marker>
         
       </MapView>

       <view style={styles.footer}>
         <text style={styles.footerText}> 2 bares encontrados</text>
        <TouchableOpacity style={styles.createOrganizationButton} onPress={() => {}}>
            <Feather name="plus" size={20} color='#FFF'/>
        </TouchableOpacity>
       </view>
    </View>
    );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  
    map:{
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  
    calloutContainer: {
      width: 160,
      height: 46,
      paddingHorizontal: 16,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: 16,
      justifyContent: 'center',
    },
  
    calloutText: {
      fontFamily: 'Nunito_700Bold',
      color: '0089a5',
      fontSize: 14,
    },
  
  
      footer: {
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 32,
      backgroundColor:'#FFF',
      borderRadius: 20,
      heigth: 56,
      paddingLeft: 24,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      elevation: 10,
  
    },
  
    footerText:{
      fontFamily: 'Nunito_700Bold',
      color: '#0fa7b3',
    },
  
    createOrganizationButton: {
      width: 56,
      heigth: 56,
      backgroundColor: '#15c3d6',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
  
  });