import React, {useState} from 'react';
import { TextInput, Button, Card } from 'react-native-paper';
import {View, Text, FlatList} from 'react-native';
import Header from './Header';
import AsyncStorage from '@react-native-community/async-storage';

const Search = ({navigation}) => {
  const [city, setCity] = useState('');
  const [cities, setCities] = useState([]);
  const fetchCities = (text) =>{
        setCity(text)
        fetch("https://api.weather.com/v3/location/search?apiKey=6532d6454b8aa370768e63d6ba5a832e&language=en-US&query="+text+"&locationType=city&format=json")
        .then(item=>item.json())
        .then(cityData=>{
            setCities(cityData.location.address.slice(0,9))
            console.log(cityData.location.address.slice(0,9))
        }) 
        .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            });
  }
  const btnClick = async ()=>{
    await AsyncStorage.setItem("newcity",city)
    navigation.navigate("home",{city:city})
  }
  const listClick = async (cityname)=>{
    setCity(cityname)
    await AsyncStorage.setItem("newcity",cityname)
    navigation.navigate("home",{city:cityname})
  }
  return (
    <View style={{flex:1}}>
        <Header name="Search Cities"/>
        <TextInput
        label="City Name"
        theme={{colors:{primary:"#ff751a"}}}
        value={city}
        onChangeText={(text)=>fetchCities(text)}/>

        <Button 
            icon="content-save" 
            mode="contained" 
            theme={{colors:{primary:"#ff751a"}}}
            style={{margin:20}}
            onPress={() => btnClick()}>
            <Text style={{color:"white"}}>Search</Text>
        </Button>
        <FlatList 
        data={cities}
        renderItem={({item})=>{
            return(
                <Card 
                    style={{margin:2, padding:12}}
                    onPress={() => listClick(item)}   
                >        
                    <Text>{item}</Text>
                </Card>
            )
        }}
        keyExtractor={item => item}
        />
    </View>
  );
};

export default Search;

