import React, { useReducer, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/Login';
import SensorData from './components/SensorData';
import UtilityScreen from './components/utilities/UtilityScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MyDispatchContext, MyUserContext } from './configs/MyContext';
import MyAccountReducer from './configs/MyAccountReducer';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Tiện ích" component={UtilityScreen} />
    <Tab.Screen name="Thiết bị" component={SensorData} />
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
              <Stack.Screen name="MainApp" component={MainApp} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </MyDispatchContext.Provider>
    </MyUserContext.Provider>
  );
};

export default App;
