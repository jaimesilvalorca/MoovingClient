import { StyleSheet } from "react-native";


const RegisterStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    imageBackground: {
      width: '100%',
      height: '100%'
    },
    form: {
      backgroundColor: 'white',
      width: '100%',
      height: '70%',
      position: 'absolute',
      bottom: 0,
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      padding: 20
    },
    logoContainer: {
      position: 'absolute',
      alignSelf: 'center',
      top: '5%'
    },
    logoImage: {
      alignSelf: 'center',
      width: 100,
      height: 100,
  
    },
    logoText: {
      color: 'white',
      fontSize: 20,
      marginTop: 10,
      fontFamily: '',
      textAlign: 'center',
      fontWeight: 'bold'
  
    },
    formText: {
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 20
    },
    loading:{
      position:'absolute',
      bottom:0,
      top:0,
      right:0,
      left:0,
      


    }
  });

  export default RegisterStyles