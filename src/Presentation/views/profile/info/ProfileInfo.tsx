import React, { useEffect } from 'react'
import { Text, View, Image, TouchableOpacity, Pressable } from 'react-native'
import useViewModel from './ViewModel'
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'
import { RootStackParamList } from '../../../../../App'
import styles from './Styles'
import { Link, useNavigation } from '@react-navigation/native'
import { RoundedButton } from '../../../components/RoundedButton'

interface Props extends StackScreenProps<RootStackParamList> { }

export const ProfileInfoScreen = () => {

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  const { user,removeUserSession } = useViewModel()

  useEffect(() => {
    if(user.id === ''){
      navigation.replace('HomeScreen')
    }
  }, [user])
  

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../../../assets/background.jpg')}
        style={styles.imageBackground}
      />
      <Pressable
        style={styles.logout}
        onPress={() => {
          removeUserSession()
        }}
      >
        <Image
          source={require('../../../../../assets/logout.png')}
          style={styles.logoutImage}
        />
      </Pressable>

      <View style={styles.logoContainer}>
        {user?.image !== '' ? (
          <Image
            source={{ uri: user?.image }}
            style={styles.logoImage}
          />
        ) : (
          <Image
            source={require('../../../../../assets/user_image.png')}
            style={styles.logoImage}
          />
        )}
      </View>
      <View style={styles.form}>
        <View style={styles.formInfo}>
          <Image
            source={require('../../../../../assets/user.png')}
            style={styles.formImage}
          />
          <View style={styles.formContent}>
            <Text>{(user?.name)?.toLocaleUpperCase()} {(user?.lastname)?.toLocaleUpperCase()}</Text>
            <Text style={styles.formTextDescription}>Nombre y Apellido</Text>
          </View>
        </View>
        <View style={{ ...styles.formInfo, marginTop: 25 }}>
          <Image
            source={require('../../../../../assets/email.png')}
            style={styles.formImage}
          />
          <View style={styles.formContent}>
            <Text>{(user?.email)?.toLocaleUpperCase()}</Text>
            <Text style={styles.formTextDescription}>Correo Electronico</Text>
          </View>
        </View>
        <View style={{ ...styles.formInfo, marginTop: 25,marginBottom:30}}>
          <Image
            source={require('../../../../../assets/phone.png')}
            style={styles.formImage}
          />
          <View style={styles.formContent}>
            <Text>{(user?.phone)?.toLocaleUpperCase()}</Text>
            <Text style={styles.formTextDescription}>Numero de telefono</Text>

          </View>
        </View>
        
        <RoundedButton
          
          onPress={() => {
            navigation.navigate('ProfileUpdateScreen',{user:user!})
           }}
          text='ACTUALIZAR INFORMACIÓN'
          
        />
      </View>
    </View>
  )
}


{/*
<Button
onPress?{()=>{
  removeSession()
  navigation.navigate('HomeScreen')
}}
title='Cerrar Sesion' */}