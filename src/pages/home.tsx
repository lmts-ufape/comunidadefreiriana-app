import React from 'react';
import { Image, View, StyleSheet, Text, Linking, BackHandler } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';


import logo from '../images/png/logo_medio.png';
import lmts from '../images/logo_lmts.png';
import IconeCadastro from '../images/png/logo_solicitar_cadastro.png';
import iconeMapa from '../images/png/logo_mapa.png';
import iconeSair from '../images/png/logo_sair.png';
import iconeConheca from '../images/png/logo_conheca_pf.png';
import iconeUfape from '../images/png/logo_ufape.png';
import iconeInstituto from '../images/png/logo_instituto_PF.png'; 

//import logo3 from '../images/ete.png';
 


export default function OrganizationData() {   


const navigation = useNavigation();

function handleNavigateToPauloFreire() {
  navigation.navigate('PauloFreire');
}

function handleNavigateToCreateOrganization() {
  navigation.navigate('OrganizationData');
}

 
function handleNavigateToPFMap() {
  navigation.navigate('PFMap');
}
function handleNavigateToExit() { 
  BackHandler.exitApp();  
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

      <RectButton style={styles.freiButton} onPress={handleNavigateToPauloFreire}>
          <Text style={styles.textButtonFrei}>Conheça Paulo Freire</Text>
          <Image style={styles.Icones} source={iconeConheca} />
        </RectButton>

      <RectButton style={styles.mapButton} onPress={handleNavigateToPFMap}>
          <Text style={styles.textButtonMap}>Mapa</Text>
          <Image style={styles.Icones} source={iconeMapa} />
        </RectButton>

        <RectButton style={styles.cadastroButton} onPress={handleNavigateToCreateOrganization}>
          <Text style={styles.textButton}>Solicitar Cadastro</Text>
          <Image style={styles.Icones} source={IconeCadastro} />
        </RectButton>

     
        <RectButton style={styles.exitButton} onPress={handleNavigateToExit}>
          <Text style={styles.textButton}>Sair do Aplicativo</Text>
          <Image style={styles.Icones} source={iconeSair} />
        </RectButton>
      
        <View style={styles.footer}>
          <View style={styles.instituto}>
            <Text style={styles.footerText}>Realização:</Text>
            <Image style={styles.iconeInstituto} source={iconeInstituto} />
          </View>
          <View style={styles.lmts}>
            <Text style={styles.footerText}>Desenvolvido por:</Text>
            <View style={styles.row}>

              <RectButton  onPress={ () => Linking.openURL('http://ufape.edu.br/')}>
                <Image style={styles.iconeUfape} source={iconeUfape} />
              </RectButton>
              
              <RectButton  onPress={ () => Linking.openURL('http://lmts.uag.ufrpe.br/')}>
                <Image style={styles.image2} source={lmts} />
              </RectButton>
            </View>
          </View>
        </View>


      </View>

     

    </View>
  );
}

const styles = StyleSheet.create({

  footerText: {
    fontSize: 11,
  },

  image2: {
    width: 90,
    height: 50,
    resizeMode: 'contain',
  },
  iconeUfape:{
    width: 60,
    height: 80,
    resizeMode:'contain',

  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

  },
  iconeInstituto :{
    width: 80,
    height: 80,
    resizeMode:'contain',
  },
  instituto: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  lmts: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },

  cadastroButton: {
    backgroundColor: '#f3db00',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    width:320,
    marginTop: 7,
  },
            
  mapButton: {
    backgroundColor: '#2bd614',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    width:320,
    marginTop: 7,
  },
  
  exitButton: {
    backgroundColor: '#f5a700',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 7,
    width:320,

  },
  freiButton:{
    backgroundColor: '#23d0e7',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    width:320,
    marginTop: 7,

  },


  textButton: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 15,
    color: '#ffffff',
   // position: 'absolute',
    left:-25,
  },
  
  textButtonMap: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 15,
    color: '#ffffff',
    left:-69,
  },
  
  textButtonFrei: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 15,
    color: '#ffffff',
   // position: 'absolute',
    left:-15,
  },

  descText: {
    fontFamily: 'Nunito_600SemiBold',
    //fontSize: 15,
    lineHeight: 24,
    
    marginTop: 20,
    textAlign: 'center',
  },

  image: { 
    width: 350,
    height: 150,
    resizeMode: 'contain',
    marginTop: 20
  },

  footer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginTop: 10
  },
  Icones:{
      position: 'absolute',
      left:25,
      width: 25,
      height: 25,

  },
})