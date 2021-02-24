import React, {useState, useEffect } from 'react';
import { Card, Title } from 'react-native-paper';
import {View,  Image} from 'react-native';
import Header from './Header';
import AsyncStorage from '@react-native-community/async-storage';

const Home = (props) => {
    const [info, setInfo] = useState({
        name:"loading !!",
        temp:"loading",
        humidity:"loading",
        windspeed:"loading",
        desc:"loading",
        icon:"loading"
    })
    useEffect(()=>{
        getWeather()
     },[])
     const getWeather = async ()=>{
        let MyCity = await AsyncStorage.getItem("newcity")
        if(!MyCity){
           const {city} = props.route.params
           MyCity = city  
           console.log(MyCity)
        }
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${MyCity}&APPID=8c3226f4035e10426cabf5f03079ad98&units=metric`)
      .then(data=>data.json())
      .then(results=>{
         console.log(results)
         setInfo({
            name:results.name,
            temp:results.main.temp,
            humidity:results.main.humidity,
            windspeed:results.wind.speed,
            desc:results.weather[0].description,
            icon:results.weather[0].icon,
        })
      })
      .catch(err=>{
        alert(err.message)
    })
    }
    if(props.route.params.city != "london"){
        getWeather()
    }
    return(
        <View style={{flex: 1}}>
            <Header name="Weather App"/>
            <View style={{alignItems:"center"}}>
               <Title 
                    style={{
                        color:'#ff751a',
                        marginTop:30,
                        fontSize:30
                        }}>
                    {info.name}
               </Title>
               <Image 
                    style={{
                        width:120,
                        height:120
                    }}
                    source={{uri:"https://openweathermap.org/img/w/"+info.icon+".png"}}  
               />
           </View>

           <Card style={{
                margin:10,
                padding:12,
                backgroundColor: '#e2e8e9',
            }}>
            <Title style={{color:"#ff751a"}}>Temperature - {info.temp} °C</Title>
           </Card>
           <Card style={{
               margin:10,
               padding:12,
               backgroundColor: '#e2e8e9',
           }}>
           <Title style={{color:"#ff751a"}}>Humidity - {info.humidity} %</Title>
           </Card>
           <Card style={{
               margin:10,
               padding:12,
               backgroundColor: '#e2e8e9',
           }}>
           <Title style={{color:"#ff751a"}}>Wind Speed - {info.windspeed} m/s</Title>
           </Card>
           <Card style={{
               margin:10,
               padding:12,
               backgroundColor: '#e2e8e9',
           }}>
           <Title style={{color:"#ff751a"}}>Description - {info.desc}</Title>
           </Card>
        </View>
    )
}

export default Home;