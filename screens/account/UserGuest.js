import React from 'react'
import { StyleSheet, Text, ScrollView, Image } from 'react-native'
import {Button} from 'react-native-elements'
import {useNavigation} from '@react-navigation/native'


export default function UserGuest() {
    const navigation = useNavigation()
    return (
        <ScrollView
            style={styles.viewBody}
        >
            <Image
                source={require("../../assets/logo.png")}
                resizeMode="contain"
                style={styles.image}
            />
            <Text style={styles.title}>Consulta tu perfil en Restaurants</Text>
            <Text style={styles.description} >
                ¿como describirias tu mejor restaurante? Busca y visualiza los  mejores restaurantes
                de una manera sencilla, vota cual te ha gustado mas y comenta como ha sido tu experiencia.
            </Text>
            <Button 
            buttonStyle={styles.button}
            title="Ver tu perfil"
            onPress ={()=>navigation.navigate("Login")}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        marginHorizontal: 30
    },
    image: {
        height: 300,
        width: "100%",
        marginBottom: 10,
    },
    title:{

        fontWeight: "bold", 
        fontSize: 19,
        marginBottom: 10,
        textAlign:"center"
    },
    description:{
        textAlign: "justify",
        marginBottom: 20,
        color: "#a65273"
    },
    button:{
        backgroundColor:"#442484"
    }

})
