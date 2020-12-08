import React from 'react';
import Header from './components/Header'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import { StyleSheet } from 'react-native';
const { Navigator, Screen } = createStackNavigator();
import Map from './pages/PFMap';
import Details from './pages/PFDetails';

import SelectMapPosition from './pages/createOrganization/SelectMapPosition';
import OrganizationData from './pages/createOrganization/OrganizationData';

export default function Routes() {
    return(
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false, cardStyle:{backgroundColor:'#f2f3f5'}}}>
                <Screen 
                name="PFMap" 
                component={Map}
                />

                <Screen 
                name="PFDetails" 
                component={Details}
                options={{
                    headerShown:true,
                    header:()=><Header showCancel={false} title="Paulo Freire" />
                }}
                />

                <Screen 
                name="SelectMapPosition" 
                component={SelectMapPosition}
                options={{
                    headerShown:true,
                    header:()=><Header title="Informe a Localização" />
                }}
                />

                <Screen 
                name="OrganizationData" 
                component={OrganizationData}
                options={{
                    headerShown:true,
                    header:()=><Header title="Informe Os Dados" />
                }}
                />

            </Navigator>
        </NavigationContainer>
    );

    
}
 