import React from 'react';
import { Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';


import logo from '../images/logo_mapeamento.png';
import logo2 from '../images/logo_lmts.png';
//import logo3 from '../images/ete.png';

 


export default function OrganizationData() {

const navigation = useNavigation();

function handleNavigateToCreateOrganization() {
  navigation.navigate('OrganizationData');
}

 
function handleNavigateToPFMap() {
  navigation.navigate('PFMap');
}

 
function handleNavigateToExit() {
}

  return (
    <View style={styles.container}>

      <View>
        <Image style={styles.image} source={logo} />
      </View>

      <View >
        <Text style={styles.descText}> 
            Descrição teste! 
            01:01 Am 
            11/12/2020
        </Text>
      </View>

      <View>

        <RectButton style={styles.cadastroButton} onPress={handleNavigateToCreateOrganization}>
          <Text style={styles.textButton}>Cadastro</Text>
        </RectButton>


        <RectButton style={styles.mapButton} onPress={handleNavigateToPFMap}>
          <Text style={styles.textButton}>Mapa</Text>
        </RectButton>

        <RectButton style={styles.exitButton} onPress={handleNavigateToExit}>
          <Text style={styles.textButton}>Sair do Aplicativo</Text>
        </RectButton>

      </View>

      <View>
        <Text style={styles.footerText}>Desenvolvido:</Text>
        <Image style={styles.image2} source={logo2} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  footerText: {
    marginTop: 5,
    textAlign: 'center',
  },

  image2: {
    width: 90,
    height: 50,
    resizeMode: 'contain',
    //flexDirection: 'row',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },

  cadastroButton: {
    backgroundColor: '#2dc200',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    width:320,
    marginTop: 32,
  },
            
  mapButton: {
    backgroundColor: '#cfd300',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    width:320,
    marginTop: 15,
  },
  
  exitButton: {
    backgroundColor: '#c28500',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 15,
    width:320,

  },


  textButton: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 14,
    color: '#FFF',
  },

  descText: {
    fontFamily: 'Nunito_600SemiBold',
    //fontSize: 15,
    lineHeight: 24,
    
    marginTop: 20,
    textAlign: 'center',
  },

  image: { 
    width: 180,
    height: 100,
    resizeMode: 'contain',
  },

  footer: {
    position: 'absolute',
      left: 24, 
      right: 24,
      bottom: 32,
      backgroundColor:'#FFF',
      borderRadius: 20,
      height: 56,
      paddingLeft: 24,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      elevation: 10,
  }
})