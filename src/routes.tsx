import React from 'react';
import Header from './components/Header'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import { StyleSheet } from 'react-native';
const { Navigator, Screen } = createStackNavigator();
import Map from './pages/PFMap';
import Details from './pages/PFDetails';
import Home from './pages/home';
import PauloFreire from './pages/PauloFreire';

import OrganizationData from './pages/createOrganization/OrganizationData';
import { initialWindowMetrics } from 'react-native-safe-area-context';

export default function Routes() {
    return(
        <NavigationContainer>
            <Navigator initialRouteName= 'Home' screenOptions={{ headerShown: false, cardStyle:{backgroundColor:'#f2f3f5'}}}>
                
                <Screen 
                name="PauloFreire"
                component={PauloFreire}
                options={{
                    headerShown:true,
                    header:()=><Header title="Conheça Paulo Freire" />
                }}   
                />

                <Screen 
                name="Home"
                component={Home}
                />
                
                <Screen 
                name="PFMap" 
                component={Map}
                options={{
                    headerShown:true,
                    header:()=><Header title="Mapa" />
                }}                 
                />

                <Screen 
                name="PFDetails" 
                component={Details}
                options={{
                    headerShown:true,
                    header:()=><Header showCancel={false} title="Instituição" />
                }}
                />

                <Screen 
                name="OrganizationData" 
                component={OrganizationData}
                options={{
                    headerShown:true,
                    header:()=><Header title="SOLICITAR CADASTRO" />
                }}
                />

            </Navigator>
        </NavigationContainer>
    );

    
}
 