import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';

interface IProps {
    labelValue: string,
    placeHolderText: string,
    iconName: string
}
const FormInput = (props:IProps) => {
    return (
        <View>
            <View>
                {/* <AntDesign name={'iconType'} size={25} color="#666" /> */}
            </View>
            <Text style={styles.inputLabel}>{props.labelValue}</Text>
            <TextInput style={styles.input} placeholder={props.placeHolderText}/>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        padding: 10,
        flex: 1,
        fontSize: 16,
        color: '#333',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#c4c7ca',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15   
      },
      inputLabel:{
        marginBottom: 5,
        textTransform: 'capitalize'
      }
})

export default FormInput