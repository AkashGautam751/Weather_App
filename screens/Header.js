import * as React from 'react';
import { Appbar ,Title} from 'react-native-paper';
export default Header =(props)=> {

    return (
      <Appbar.Header 
        theme={{
            colors:{
                primary:"#ff751a",
                
            }
        }}
        style={{flexDirection:"row",justifyContent:"center"}}
        >
        <Title style={{color:"white"}}>
            {props.name}
        </Title>
            
      </Appbar.Header>
    );

}


