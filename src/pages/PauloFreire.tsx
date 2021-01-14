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
      <View style={styles.buttonContainer}>

        <View style={styles.row}>
            <RectButton style={styles.cardPF} onPress={ () => {}}>
              <Image style={styles.iconeConheca} source={iconeConheca} />
              <Text style={styles.cardTextPF}>Conheça {'\n'}Paulo Freire</Text>
            </RectButton>

            <RectButton style={styles.card} onPress={ () => {}}>
              <Image style={styles.iconeLTempo} source={iconeLinha} />
              <Text style={styles.cardText}>Linha do Tempo</Text>
            </RectButton>          
        </View>

        <View style={styles.row}>
            <RectButton style={styles.card} onPress={ () => {}}>
              <Image style={styles.iconeAcervo} source={iconeAcervo} />
              <Text style={styles.cardText}>Acervo Digital</Text>
            </RectButton>

            <RectButton style={styles.card} onPress={ () => {}}>
              <Image style={styles.iconeBibli} source={iconeBibli} />
              <Text style={styles.cardText}>Biblioteca</Text>
            </RectButton>        

        </View>

        <View style={styles.row}>
            <RectButton style={styles.card} onPress={ () => {}}>
              <Image style={styles.iconeAcervo} source={iconeGlossario} />
              <Text style={styles.cardText}>Glossário</Text>
            </RectButton>

            <RectButton style={styles.card} onPress={ () => {}}>
              <Image style={styles.iconeAcervo} source={iconeContato} />
              <Text style={styles.cardText}>Contato</Text>
            </RectButton>        

        </View>
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

  iconeBibli: {
    width: 50,
    height: 100,
    resizeMode:'contain',
  },

  iconeConheca:{
    width: '100%',
    height: '100%',
    resizeMode:'contain',
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
    width: 60,
    height: 100,
    resizeMode:'contain',
  },
  iconeLTempo:{
    width: 70,
    height: 100,
    resizeMode:'contain',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 25
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
  },

  buttonContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    marginTop: 10
  },

  card: {
    width: 150,
    height: 150,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    elevation: 10,
    marginBottom: 10,
    padding: 10
  },

  cardPF: {
    width: 150,
    height: 150,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    elevation: 10,
    marginBottom: 10,
  },

  cardText: {
    fontSize:15.5,
    alignSelf: 'flex-start'
  },

  cardTextPF: {
    fontSize: 14.5,
    alignSelf: 'flex-start',
    position: 'absolute',
    backgroundColor: '#555',
    color: '#fff',
    padding: 2,
    bottom: 5,
    left: 5,
    fontWeight: 'bold'
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#FFF',
  },
})