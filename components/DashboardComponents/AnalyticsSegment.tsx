import { FontAwesome } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const AnalyticsSegment = () => {
  let a = 5
  a = a+5
  return (
    <View style={styles.box}>
      <View style={styles.InnerBox}>

        <View style={styles.row}>

        <FontAwesome name="users" style={styles.icon}/>
        <Text style={styles.count}>5</Text>
        </View>
        <Text style={styles.label}>Students</Text>
      </View>
      <View style={[styles.InnerBox,styles.dark]}>
        <View style={styles.row}>

          <FontAwesome name="calendar-check-o" style={[styles.bigIcon]}/>
          <View style={{marginLeft:10}}>
            <Text style={[styles.count,{color:"white",marginBottom:2,borderBottomWidth:2,borderBottomColor:'white'}]}>12</Text>
            <Text style={[{color:"white"}]}>Requests</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default AnalyticsSegment

const styles = StyleSheet.create({
  row:{
    flexDirection:"row",
   justifyContent:"space-around",
   alignItems:"center",
  },
 box:{
   height:200,
   width:"100%",
   padding:"5%",
   flexDirection:"row",
   justifyContent:"space-around",
   alignItems:"center",
   backgroundColor:"#fdfdfd"
 },
 count:{
   fontSize:42,
   fontWeight:"bold",
   color:"#fff",
 },
 label:{
   fontSize:18,
   fontWeight:"bold",
   color:"#fff",
 },
 InnerBox:{
  //  borderWidth:2,
   width:"30%",
   borderRadius:10,
   borderStyle:"dashed",
   padding:10,
  //  flexDirection:"row",
   justifyContent:"center",
   alignItems:"center",
   height:"100%",
   elevation:10,
   backgroundColor:"#ff3355"
 },
 icon:{
   fontSize:32,
   color:"#fff"
 },
 bigIcon:{
  fontSize:52,
  color:"white"
},
 dark:{
   width:"55%",
   backgroundColor: "#4286f4",
borderStyle:"solid",
borderColor:"#4286f4"
 }
})
