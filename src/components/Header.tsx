import { HeaderBackground } from '@react-navigation/stack';
import React from 'react';
import {View,StyleSheet,Text} from 'react-native';
import {BorderlessButton} from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps{
    title:string;
    showCancel?:boolean;
}

export default function Header({title , showCancel=true}:HeaderProps){
    const navigation = useNavigation();
    
    function handleGoBackToAppHomePage(){
        navigation.goBack();
    }

    return(
        <View style={styles.container}>

            <BorderlessButton onPress={handleGoBackToAppHomePage}>
            <Feather name="arrow-left" size={24} color="#000000"/>
            </BorderlessButton>

            <Text style={styles.title}>{title}</Text>


        </View>
    );
}

const styles =StyleSheet.create({
    container:{
        padding:13,
        backgroundColor:'#f9fafc',
        borderBottomWidth:1,
        borderColor:'#dde3f0',
        paddingTop:44,

        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',

    },
    
    title:{
        fontFamily:'Nunito_800ExtraBold',
        color:'#000000',
        fontSize:19,
        flexDirection: 'row',
        paddingHorizontal: 20,
    },
    
    
})