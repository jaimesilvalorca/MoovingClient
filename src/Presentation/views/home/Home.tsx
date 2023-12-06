import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import {Text, View, Image,TouchableOpacity, ToastAndroid } from 'react-native';
import { RoundedButton } from '../../components/RoundedButton';
import { StackNavigationProp, StackScreenProps} from '@react-navigation/stack'
import { RootStackParamList } from '../../../../App';
import useViewModel from './ViewModel'
import { CustomTextInput } from '../../components/CustomTextInput';
import styles from './Styles'

interface Props extends StackScreenProps<RootStackParamList,'HomeScreen'>{}

export const HomeScreen = ({navigation,route}:Props) => {

    const {email,password,onChange,errorMessage,login,user,forggotPassword} = useViewModel()


    
    useEffect(() => {
        if(errorMessage != ''){
            ToastAndroid.show(errorMessage,ToastAndroid.LONG)  
          }
    }, [errorMessage])

    useEffect(() => {
        if(user?.id !== null && user?.id !== undefined && user.id !== ''){
            navigation.replace('UserTabsNavigator')
        }      
    }, [user])
    

    

    return (
        <View style={styles.container}>
            <Image
                source={require('../../../../assets/background.jpg')}
                style={styles.imageBackground}
            />
            <View style={styles.logoContainer}>
                <Image
                    source={require('../../../../assets/logo.png')}
                    style={styles.logoImage}

                />
                <Text style={styles.logoText}>
                    Mooving
                </Text>
            </View>
            <View style={styles.form}>
                <Text style={styles.formText}>
                    INGRESAR
                </Text>
                <CustomTextInput
                image={require('../../../../assets/email.png')}
                placeholder='Correo Electronico'
                keyboardType='email-address'
                property='email'
                value={email}
                onChangeText={onChange}
                />
                
                <CustomTextInput
                image={require('../../../../assets/password.png')}
                placeholder='Contraseña'
                keyboardType='default' 
                secureTextEntry={true}
                property='password'
                value={password}
                onChangeText={onChange}
                />

                <View style={{ marginTop: 30 }}>
                    <RoundedButton
                        text='Iniciar Sesión'
                        onPress={() => {
                            login()
                        }} />
                </View>
                <View>
                    <TouchableOpacity
                    onPress={()=>{
                        forggotPassword()
                    }}
                    >
                    <Text style={{textAlign:'center',paddingTop:10}}>
                        ¿Olvidaste tu contraseña?
                    </Text>
                    </TouchableOpacity>

                </View>
                <View style={styles.formRegister}>
                    <Text>No tienes cuenta</Text>
                    <TouchableOpacity onPress={()=>navigation.navigate('RegisterScreen')}>
                        <Text style={styles.registerText}>Registrate</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    )
}

