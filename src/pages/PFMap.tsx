import React,{useEffect , useState} from 'react';
import {Feather} from '@expo/vector-icons';
import { StyleSheet, Text, View, Dimensions, TextInput, FlatList } from 'react-native';
import MapView, { Marker, Callout,PROVIDER_GOOGLE} from 'react-native-maps';
import mapMarker from '../images/pin.png';
import {useNavigation} from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';

interface Organization {
  id: number;
  nome: string;
  latitude:number;
  longitude:number
}

export default function PFMap() {
    const [Organizations,setOrganizations]= useState<Organization[]>([]);
    const [FilterOrganizations,setFilterOrganizations]= useState<Organization[]>([]);
    const navigation = useNavigation();
    const [search, setSearch] = useState('');

    useEffect(()=>{
        api.get('/pfs').then(response =>{
          setOrganizations(response.data);
        });
    },[]);

    function handleNavigateToPFDetails(id:number) {
        navigation.navigate('PFDetails',{id});
    }

    const searchFilterFunction = (text) => {
      if (text) {
        const newData = Organizations.filter(function (item) {
          const itemData = item.nome
            ? item.nome.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        setFilterOrganizations(newData);
        setSearch(text);
      } else {
        setFilterOrganizations(Organizations);
        setSearch(text);
      }
    }

    const ItemView = ({ item }) => {
      return (
        // Flat List Item
        <Text style={{}} onPress={() => getItem(item)}>
          {item.id}
          {'.'}
          {item.nome}
        </Text>
      );
    }
  
    const getItem = (item) => {
      // Function for click on an item
      alert('Id : ' + item.id + ' Title : ' + item.nome);
    };

    const ItemSeparatorView = () => {
      return (
        // Flat List Item Separator
        <View
          style={{
            height: 0.5,
            width: '100%',
            backgroundColor: '#C8C8C8',
          }}
        />
      );
    }
    
    function handleNavigateToCreateOrganization() {
      navigation.navigate('OrganizationData');
    }

    

    return(
        <View style={styles.container}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => searchFilterFunction(text)}
              value={search}
              underlineColorAndroid="transparent"
              placeholder="Pesquisar..."
              onFocus={() => {}}
            />
            <RectButton style={styles.search} onPress={(text) => searchFilterFunction(text)}>
              <Feather name="search" size={25} color="#FFF"/>
            </RectButton>
          </View>
          <FlatList
            data={FilterOrganizations}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
          />
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map} 
                initialRegion={{
                    latitude: -8.9067535, 
                    longitude: -36.4964962,
                    latitudeDelta: 0.008,
                    longitudeDelta: 0.008, 
                }}
            >
              
              {Organizations.map(Organization =>{
                return(
                  <Marker
                  key={Organization.id}
                  icon={mapMarker}
                  calloutAnchor= {{
                    x: 2.7,
                    y: 0.8,//0.8
                  }}
                  coordinate={{
                    latitude: Organization.latitude, 
                    longitude:Organization.longitude,
                  }}
               >
                 <Callout tooltip onPress={() => handleNavigateToPFDetails(Organization.id)}>
                  <View style={styles.calloutContainer}>
                    <Text style={styles.calloutText}>{Organization.nome}</Text>
                  </View>
                 </Callout>
               </Marker>
                );
              })}

            </MapView>

            <View style={styles.footer}>
              
              <RectButton style={styles.createOrganizationButton} onPress={handleNavigateToCreateOrganization}>
                <Feather name="plus" size={25} color="#FFF"/>
                <Text style={styles.buttonText}> Instituição</Text>
              </RectButton>
            </View>

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

    searchContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 10
    },

    textInput: {
      height: 40,
      borderWidth: 1,
      paddingLeft: 15,
      margin: 5,
      borderColor: '#aaa',
      borderRadius: 10,
      backgroundColor: '#FFFFFF',
      position: 'relative',
      flex: 1
    },

    search: {
      width: 40,
      height: 40,
      backgroundColor: '#f00',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
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
      color: '#0089a5',
      fontSize: 14,
    },
  
  
      footer: {
      position: 'absolute',
      right: 24,
      bottom: 32,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      elevation: 10,
      borderRadius: 50,
    },
  
    footerText:{
      fontFamily: 'Nunito_700Bold',
      color: '#0fa7b3',
    },
  
    createOrganizationButton: {
      width: 116,
      height: 40,
      backgroundColor: '#15c3d6',
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },

    buttonText: {
      color: '#fff',
      fontSize: 15
    }
  
  });