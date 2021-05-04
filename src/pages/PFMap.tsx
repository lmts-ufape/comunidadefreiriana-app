import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View, Dimensions, TextInput, FlatList, Image, Alert } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import mapMarker from '../images/pin.png';
import { useNavigation } from '@react-navigation/native';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import api from '../services/api';

interface Organization {
  id: number;
  nome: string;
  email: String;
  coordenador: string;
  pais: string;
  site: String;
  telefones: number;
  cidade: String;
  estado: String;
  endereco: String;
  DatadeRealizacao: number;
  NomedaRealizacao: String;
  datafundacao: number;
  info: number;
  categoria: string;
  latitude: number;
  longitude: number;
  images: Array<{
    id: number;
    url: string;
  }>;
  autorizado: boolean;
}

export default function PFMap() {
  const [Organizations, setOrganizations] = useState<Organization[]>([]);
  const [FilterOrganizations, setFilterOrganizations] = useState<Organization[]>([]);
  const [search, setSearch] = useState<String>('');
  const [item, setitem] = useState<Organization[]>([]);

  const [latitude, setLatitude] = useState(-24.235004);
  const [longitude, setLongitude] = useState(-53.92528);
  const [zoomMap, setZoomMap] = useState(40.008);

  const navigation = useNavigation();

  useEffect(() => {
    setSearch('');
    setFilterOrganizations([]);
    getLocation();
    api.get('/pfs').then(response => {
      setOrganizations(response.data);
    });
  }, []);

  async function getLocation() {
    // Permissão para localização
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      setZoomMap(40.008);
      return;
    }
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Lowest,
      });

      if (location.coords) {
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
        setZoomMap(0.038);
      }

    } catch (error) {
      console.log(error)
    }
  }

  function handleNavigateToPFDetails(id: number) {
    navigation.navigate('PFDetails', { id });
  }

  const searchFilterFunction = (text: String) => {
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
      setFilterOrganizations([]);
      setSearch(text);
    }
  }

  const ItemView = (item: Organization) => {
    return (
      // Flat List Item
      <View style={{
        height: 50,
        width: '80%',
        backgroundColor: '#ddd',
        marginHorizontal: 20,
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 15,
        borderRadius: 10

      }} key={item.id}>
        <Text style={{}} onPress={() => getItem(item)}>
          {item.id}
          {'. '}
          {item.nome}
          {' - '}
          {item.endereco}
        </Text>
      </View>
    );
  }

  const OrgList = FilterOrganizations.map((item, index) => {
    return (
      <View style={{
        height: 50,
        width: '80%',
        backgroundColor: '#ddd',
        marginHorizontal: 20,
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 15,
        borderRadius: 10

      }} key={index}>
        <Text style={{}} onPress={() => getItem(item)}>
          {item.id}
          {'. '}
          {item.nome}
          {' - '}
          {item.endereco}
        </Text>
      </View>
    )
  })

  const getItem = (item: Organization) => {
    // Function for click on an item
    navigation.navigate('PFDetails', { id: item.id });
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



  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 5 }}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => searchFilterFunction(text)}
            value={search}
            underlineColorAndroid="transparent"
            placeholder="Pesquisar..."
            onFocus={() => { }}
            clearTextOnFocus={true}
          />
          <RectButton style={styles.search} onPress={() => searchFilterFunction(search)}>
            <Feather name="search" size={25} color="#FFF" />
          </RectButton>
        </View>
        <FlatList
          data={FilterOrganizations}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={({ item }) => (
            <>
              {item.autorizado &&
                <TouchableOpacity style={styles.item} onPress={() => getItem(item)}>
                  <Text style={{ fontSize: 16 }}>
                    {item.id}
                    {'. '}
                    {item.nome}
                    {' / '}
                    {item.cidade}
                  </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1, marginTop: 10 }}>
                    <Image style={{ width: 12, resizeMode: 'contain' }} source={mapMarker} />
                    <Text style={{ color: '#f00' }}>
                      {item.endereco}, {item.cep}
                    </Text>
                  </View>

                </TouchableOpacity>
              }
            </>
          )}
        />
      </View>
      {/* {OrgList} */}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: zoomMap,
          longitudeDelta: zoomMap,
        }}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: zoomMap,
          longitudeDelta: zoomMap,
        }}
      >

        {Organizations.map(Organization => {
          return (
            <View key={Organization.id}>
              {Organization.autorizado &&
                <Marker
                  icon={mapMarker}
                  calloutAnchor={{
                    x: 2.7,
                    y: 0.8,//0.8
                  }}
                  coordinate={{
                    latitude: Organization.latitude,
                    longitude: Organization.longitude,
                  }}
                >
                  <Callout tooltip onPress={() => handleNavigateToPFDetails(Organization.id)}>
                    <View style={styles.calloutContainer}>
                      <Text style={styles.calloutText}>{Organization.nome}</Text>
                    </View>
                  </Callout>
                </Marker>
              }
            </View>
          );
        })}

      </MapView>

      <View style={styles.footer}>

        <RectButton style={styles.createOrganizationButton} onPress={handleNavigateToCreateOrganization}>
          <Feather name="plus" size={25} color="#FFF" />
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

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  item: {
    height: 60,
    width: '90%',
    backgroundColor: '#ddd',
    marginHorizontal: 20,
    marginVertical: 5,
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
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
    height: 50,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center',
  },

  calloutText: {
    fontFamily: 'Nunito_700Bold',
    color: '#0089a5',
    fontSize: 14,
  },

  image: {
    width: 180,
    height: 100,
    resizeMode: 'contain',
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

  footerText: {
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