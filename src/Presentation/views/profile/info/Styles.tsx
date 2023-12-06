import { StyleSheet } from "react-native";


const ProfileInfoStyles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    imageBackground: {
        width: '100%',
        height: '100%'
    },
    logoContainer: {
        position: 'absolute',
        alignSelf: 'center',
        top: '14%'
    },
    logoImage: {
        alignSelf: 'center',
        width: 180,
        height: 180,
        borderRadius:100,
        borderWidth:2,
        borderColor:'white'

    },
    logoText: {
        color: 'white',
        fontSize: 70,
        fontFamily: '',
        textAlign: 'center',
        fontWeight: 'bold'

    },
    formText: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20
    },
    form: {
        backgroundColor: 'white',
        width: '100%',
        height: '45%',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 20
    },
    formImage:{
        height:30,
        width:30
    },
    formInfo:{
        flexDirection:"row",
        alignItems:'center'
    },
    formContent:{
        marginLeft:15,
        marginBottom:10,
    },
    formTextDescription:{
        fontSize:12,
        color:'gray'
    },
    logout:{
        position:'absolute',
        top:50,
        right:15
    },
    logoutImage:{
        width:40,
        height:40,
        
    }





})

export default ProfileInfoStyles