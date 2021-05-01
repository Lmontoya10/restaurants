import React, { useState, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Toast from 'react-native-easy-toast'
import { AirbnbRating, Button, Input } from 'react-native-elements'
import { isEmpty } from 'lodash'


import Loading from '../../components/Loading' 
import { addDocumentWithoutId, getCurrentUser, getDocumentById, updateDocument } from '../../utils/actions'

export default function AddReviewRestaurant({ navigation, route }) {
    const { idRestaurant } = route.params
    const toastRef = useRef()

    const [rating, setRating] = useState(null)
    const [title, setTitle] = useState(" ")
    const [errorTitle, setErrorTitle] = useState(null)
    const [review, setReview] = useState("")
    const [errorReview, setErrorReview] = useState(null)
    const [loading, setLoading] = useState(false)

    const addReview = async() => {
        if (!validForm()) {
            return
        }
        setLoading(true)
        const user = getCurrentUser()
        const data = {
            idUser:user.uid,
            avatarUser: user.photoURL,
            idRestaurant:idRestaurant,
            title,
            review,
            rating,
            createAt:new Date()
        }
        const responseAddReview = await addDocumentWithoutId("reviews", data)
        if (!responseAddReview.statusResponse) {
            setLoading(false)
            toastRef.current.show("error al enviar el comentario, por favor intenta mas tarde",3000)
            return
        }
        const responseGetRestaurant = await getDocumentById("restaurants", idRestaurant)

        if (!responseGetRestaurant.statusResponse) {
            setLoading(false)
            toastRef.current.show("error al obtener el restaurante, por favor intenta mas tarde",3000)
            return 
        }

        const restaurant = responseGetRestaurant.document
        const ratingTotal = restaurant.ratingTotal + rating
        const quantityVoting = restaurant.quantityVoting + 1
        const ratingResult = ratingTotal/quantityVoting
        const responseUpdateRestaurant = await updateDocument("restaurants", idRestaurant, {
            ratingTotal, 
            quantityVoting,
            rating: ratingResult
        })

        setLoading(false)

        if (!responseUpdateRestaurant.statusResponse) {
           toastRef.current.show("Error al actualizar el restaurante, por favor intenta mas tarde", 3000)
           return
        }

        navigation.goBack()
       
    }

    const validForm = () => {
        setErrorTitle(null)
        setErrorReview(null)
        let isValid = true

        if (!rating) {
            toastRef.current.show("Debes darle una puntuacion al restaurante", 3000)
            isValid = false
        }
        if (isEmpty(title)) {
            setErrorTitle("Debes ingresar un titulo a tu comentario")
            isValid= false
        }
        if (isEmpty(review)) {
            setErrorReview("Debes ingresar un comentario")
            isValid=false
        }

        return isValid
    }
    return (
        <View style={styles.viewBody}>
            <View style={styles.viewRating}>
                <AirbnbRating
                    count={5}
                    reviews={["Malo", "Regular", "Normal", "Muy bueno", "Excelente"]}
                    defaultRating={0}
                    size={35}
                    onFinishRating={(value) => setRating(value)}
                />
            </View>
            <View style={styles.formReview}>
                <Input
                    placeholder="Titulo..."
                    containerStyle={styles.input}
                    onChange={(e) => setTitle(e.nativeEvent.text)}
                    errorMessage={errorTitle}
                />
                <Input
                    placeholder="Comentario..."
                    containerStyle={styles.input}
                    style={styles.textArea}
                    multiline
                    onChange={(e) => setReview(e.nativeEvent.text)}
                    errorMessage={errorReview}
                />
                <Button
                    title="Enviar Comentario"
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.btn}
                    onPress={addReview}
                />
            </View>
            <Toast ref={toastRef} />
            <Loading isVisible={loading} text="Enviando comentario..."/>
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1
    },
    viewRating: {
        height: 110,
        backgroundColor: "#f2f2f2"
    },
    formReview: {
        flex: 1,
        alignItems: "center",
        margin: 10,
        marginTop: 40
    },
    input: {
        marginBottom: 10
    },
    textArea: {
        height: 150,
        width: "100%",
        padding: 0,
        margin: 0
    },
    btnContainer: {
        flex: 1,
        justifyContent: "flex-end",
        marginTop: 20,
        marginBottom: 10,
        width: "95%"
    },
    btn: {
        backgroundColor: "#442484"
    }
})
