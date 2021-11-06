import React from 'react'

import { StyleSheet, Text, View } from 'react-native'
import Constants from "../../constants/Constants";

const AccentText = ({text}:{text:string}) => {
    return (
        <View style={styles.AccentText}>
            <Text style={styles.AccentTextContent}>{text}</Text>
        </View>
    )
}

export default AccentText

const styles = StyleSheet.create({
    AccentText:{
        backgroundColor:'black',
        paddingVertical:5,
        paddingHorizontal:20,
        borderRadius:30,
        marginTop:"6%",
        elevation:10,
        marginRight:3
    },
    AccentTextContent:{
        color:"white",
        fontSize:14,
    }
})
