import React from 'react';
import { StatusBar, TouchableWithoutFeedback } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Search from './screens/Search'
import Home from './screens/Home'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Tab = createBottomTabNavigator()
const App= () => {
  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      console.log('dismissed');
    }}>
    <>
      <StatusBar barStyle = "dark-content" backgroundColor="#bfbfbf" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route})=>({
            tabBarIcon:({color})=>{
              let iconName;
              if(route.name==="home"){
                iconName = 'home-city-outline'
              }else if(route.name==="search"){
                iconName = "city"
              }
              return <MaterialCommunityIcons name={iconName} size={25} color={color} />
            }
          })}
          tabBarOptions={{
            activeTintColor:"white",
            inactiveTintColor:"gray",
            activeBackgroundColor:"#ff751a",
            inactiveBackgroundColor:"#ff751a"
          }}
        >
            <Tab.Screen name="home" component={Home} 
            initialParams={{city:"london"}}
            />
            <Tab.Screen name="search" component={Search} />
        </Tab.Navigator>
      </NavigationContainer>
   </>
   </TouchableWithoutFeedback>
  );
};

export default App;
