import React from 'react'
import { Image, StyleSheet, TextInput, View, KeyboardType } from 'react-native'

interface Props {
    image: any,
    placeholder: string,
    value: string,
    keyboardType: KeyboardType,
    secureTextEntry?: boolean,
    property: string,
    editable?: boolean
    onChangeText: (property: string, value: any) => void
}

export const CustomTextInput = ({
    image,
    placeholder,
    value,
    keyboardType,
    secureTextEntry = false,
    property,
    editable = true,
    onChangeText

}: Props) => {
    return (
        <View style={styles.formInput}>
            <Image
                source={image}
                style={styles.formIcon}
            />
            <TextInput
                placeholder={placeholder}
                style={styles.formTextInput}
                keyboardType={keyboardType}
                value={value}
                onChangeText={text => onChangeText(property, text)}
                secureTextEntry={secureTextEntry}
                editable={editable}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    formTextInput: {
        flex: 1,
        borderBottomWidth: 1,

        borderBottomColor: '#AAAAAA',
        marginLeft: 15
    },
    formInput: {
        flexDirection: 'row',
        marginTop: 30
    },
    formIcon: {
        height: 25,
        width: 25,
        marginTop: 5
    },
});