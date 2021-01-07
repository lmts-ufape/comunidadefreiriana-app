import React from 'react';
import { Image, View, StyleSheet, Text, Linking, BackHandler } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

import iconeUfape from '../images/png/logo_ufape.png';
import iconeInstituto from '../images/png/logo_instituto_PF.png'; 
import lmts from '../images/logo_lmts.png';
import iconeAcervo from '../images/png/logo_acervo_digital.png';
import iconeLinha from '../images/png/logo_linha_do_tempo.png';
import iconeConheca from '../images/png/logo_conheca_pf2.png';
import iconeBibli from '../images/png/logo_biblioteca.png';
import iconeGlossario from '../images/png/logo_glossario.png';
import iconeContato from '../images/png/logo_telefone2.png';


export default function PauloFreire() {   
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      <View style={styles.row}>
        
          <RectButton  onPress={ () => {}}>
            <Image style={styles.iconeConheca} source={iconeConheca} />
            <Text style={{fontSize:15.5, textAlign:'center'}}>Ataques</Text>
          </RectButton>

          <RectButton  onPress={ () => {}}>
            <Image style={styles.iconeLTempo} source={iconeLinha} />
            <Text style={styles.textContent}>Linha do Tempo</Text>
          </RectButton>          
      </View>

      <View style={styles.row}>
          <RectButton  onPress={ () => {}}>
            <Image style={styles.iconeAcervo} source={iconeAcervo} />
            <Text style={{fontSize:15.5}}>Acervo Digital</Text>
          </RectButton>

          <RectButton  onPress={ () => {}}>
            <Image style={styles.iconeBibli} source={iconeBibli} />
            <Text style={{fontSize:15.5}}>Biblioteca</Text>
          </RectButton>        

      </View>

      <View style={styles.row}>
          <RectButton  onPress={ () => {}}>
            <Image style={styles.iconeAcervo} source={iconeGlossario} />
            <Text style={{fontSize:15.5}}>Glossario</Text>
          </RectButton>

          <RectButton  onPress={ () => {}}>
            <Image style={styles.iconeAcervo} source={iconeContato} />
            <Text style={{fontSize:15.5}}>Contato</Text>
          </RectButton>        

      </View>
     
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
  );
}

const styles = StyleSheet.create({

  textContent: {
    fontSize: 15,
  },

  iconeBibli: {
    width: 80,
    height: 120,
    paddingLeft:20,
    resizeMode:'contain',
    left: 30,
  },

  iconeConheca:{
    width: 100,
    height: 140,
    paddingLeft:20,
    resizeMode:'contain',
    borderRadius: 10
  },

  rowContent:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

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

  iconeAcervo:{
    width: 80,
    height: 140,
    paddingRight:4,
    resizeMode:'contain',
  },
  iconeLTempo:{
    width: 100,
    height: 140,
    left:40,
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },

  footer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginTop: 10
  },
})