import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from "react-native";
import {  ScrollView } from "react-native-gesture-handler";
import Constants from "../../constants/Constants";
import Routes from "../../constants/Routes";
import { service } from "../../Services/Services";


const renderItem = ({_id, subject, _class, board, navigation }:{subject:String,_class:String, board:String, navigation:any}) => {

  return (
  <View style={styles.item}>
    <View style={styles.left}>
      <View style={styles.group}>
        <Text style={styles.label}>{'Subject: '}</Text>
        <Text style={styles.data}>{subject}</Text>
      </View>
      <View style={styles.group}>
        <Text style={styles.label}>{'Class: '}</Text>
        <Text style={styles.data}>{_class}</Text>
      </View>
      <View style={styles.group} >
        <Text style={styles.label}>{'Board: '}</Text>
        <Text style={styles.data}>{board}</Text>
      </View>
    </View>
    <TouchableOpacity style={styles.right} onPress={()=>{navigation.navigate(Routes.Details,{_id:_id})}}>
      <Text style={styles.rightText}>View</Text>
    </TouchableOpacity>
  </View>
)};

const Plate = ({navigation}) => {
  const [Data,setData] =useState([])
  const [refreshing, setresfreshing] = useState(false)
  const getAllEnquiry = () => {
    setresfreshing(true)
    service.enquiries().then((data)=>{
      setresfreshing(false)
      console.log("data in Plate",data)
      setData(data)
    })
  }
  useEffect(() => {
    getAllEnquiry()
  }, [])
  return (
    <SafeAreaView>
      <ScrollView style={styles.Plate}>
        <FlatList
           data={Data}
           onRefresh={()=>getAllEnquiry()}
           renderItem={({item})=>renderItem({...item,navigation})}
          refreshing={refreshing}
           keyExtractor={item => item._id}
        />
      </ScrollView>
  
      <StatusBar backgroundColor={Constants.colors.primary} />
    </SafeAreaView>
  );
};

export default Plate;

const styles = StyleSheet.create({
  Plate: {
    flexGrow: 1,
    height: "100%",
    backgroundColor:"white"
    // backgroundColor:"green"
    // justifyContent: "center",
  },
  ButtonContainer: {
   
    flexDirection: "row",
    padding: 40,
    alignItems: "center",
    justifyContent: "space-around",
    position:"absolute",
    bottom:80,
    right:0
  },
  item:{
    backgroundColor:"white",
    elevation:10,
    marginVertical:10,
    flexDirection:'row',
    width:"100%",
  },
  left:{
    padding:10,
    width:'75%',
    flexDirection:'row',
    justifyContent:"space-evenly",
    flexWrap:"wrap",
  },
  right:{
    flexGrow:1,
    backgroundColor:'steelblue',
    justifyContent:'center',
    alignItems:'center'
    
  },
  rightText:{
    color:'white',
    fontSize:18
  },
  subject:{
    fontSize:20
  },
  group:{
    // backgroundColor:"#d4d4d4",
    flexDirection:'row',
    marginRight:10
  },
  label: {
    color:'steelblue',
    fontWeight:"bold"
  },
  data:{
    color:"tomato"
  }

});
