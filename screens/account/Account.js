import React,{useEffect, useState} from 'react'
import { StyleSheet} from 'react-native'
import Loading from '../../components/Loading'
import { isUserLogged } from '../../utils/actions'

import UserGuest from './UserGuest'
import UserLogged from './UserLogged'

export default function Account() {
    const [Login, setLogin] = useState(null)

    useEffect(() => {
      setLogin(isUserLogged())
    }, [])


    if (Login == null) 
    {
        return <Loading isVisible={true} text ="Cargando.."/>
    }
    return Login ? <UserLogged/>: <UserGuest/>
}

const styles = StyleSheet.create({})
