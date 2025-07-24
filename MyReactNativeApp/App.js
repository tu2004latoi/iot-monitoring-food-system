import React, { useReducer, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/Login';
import SensorData from './components/devices/SensorData';
import UtilityScreen from './components/UtilityScreen';
import DeviceScreen from './components/DeviceScreen';
import ScanScreen from './components/utilities/ScanScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MyDispatchContext, MyUserContext } from './configs/MyContext';
import MyAccountReducer from './configs/MyAccountReducer';
import AddDevice from './components/utilities/AddDevice';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabScreens = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Tiện ích" component={UtilityScreen} />
    <Tab.Screen name="Thiết bị" component={DeviceScreen} />
  </Tab.Navigator>
);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, dispatch] = useReducer(MyAccountReducer, null);

  return (
    <MyUserContext.Provider value={user}>

      <MyDispatchContext.Provider value={dispatch}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!isLoggedIn ? (
              <Stack.Screen name="Login">
                {props => <Login {...props} onLoginSuccess={() => setIsLoggedIn(true)} />}
              </Stack.Screen>
            ) : (
              <>
                <Stack.Screen name="MainApp" component={TabScreens} />
                <Stack.Screen name="Scan" component={ScanScreen} />
                 <Stack.Screen name="AddDevice" component={AddDevice} />
              </>

            )}
          </Stack.Navigator>
        </NavigationContainer>
      </MyDispatchContext.Provider>
    </MyUserContext.Provider>
  );
};

export default App;
