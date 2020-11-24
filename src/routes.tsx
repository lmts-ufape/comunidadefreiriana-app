import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();
import Map from './pages/PFMap';
import Details from './pages/PFDetails';


export default function Routes() {
    return(
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false }}>
                <Screen name="PFMap" component={Map}/>
                <Screen name="PFDetails" component={Details}/>

            </Navigator>
        </NavigationContainer>
    );
}
 