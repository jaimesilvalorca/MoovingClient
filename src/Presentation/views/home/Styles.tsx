import { StyleSheet } from "react-native";
import { MyColors } from "../../theme/AppTheme";

const HomeStyles = StyleSheet.create({
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
        height: '40%',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 20
    },
    logoContainer: {
        position: 'absolute',
        alignSelf: 'center',
        top: '15%'
    },
    logoImage: {
        alignSelf: 'center',
        width: 200,
        height: 200,

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
    formRegister: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,

    },
    registerText: {
        fontStyle: 'italic',
        color: MyColors.primary,
        borderBottomWidth: 1,
        borderBottomColor: MyColors.primary,
        fontWeight: 'bold',
        marginLeft: 10
    }
});

export default HomeStyles