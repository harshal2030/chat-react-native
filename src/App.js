import React from 'react';
import Home from './screens/Home';
import Chat from './screens/Chat';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => (
    <Stack.Navigator headerMode="none">
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="chat" component={Chat} />
    </Stack.Navigator>
);

export default App;
