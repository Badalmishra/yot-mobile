import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Image, RefreshControl } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Constants from "../../constants/Constants";
import FINAL_CONFIG from "../../constants/ENVIRONMENT";
import { service } from "../../Services/Services";
import AddDocument from "./AddDocument";


const Documents = () => {
  const [Data,setData] =useState([])
  const [showModal,setShowModal] =useState(false)
  const [refreshing, setresfreshing] = useState(false)
  const getAllDocuments = () => {
    setresfreshing(true)
    setShowModal(false)
    service.documents().then((data)=>{
      setresfreshing(false)
      console.log("data in Plate of documents",data)
      setData(data.documents)
    })
  }
  useEffect(() => {
    getAllDocuments()
  }, [])

const renderItem = ({ back,front, number, type }:{subject:String,_class:String, board:String}) => (
  <View style={styles.item}>
    <View style={styles.left}>
      <View style={{
        backgroundColor:"steelblue",
        alignSelf:"center",
        borderRadius:20,
        alignItems:"center",
        elevation:10,
        padding:10,
        width:"60%",
        paddingHorizontal:20,
      }}>
       
        <Text style={{color:"white",fontSize:16}}>{type}</Text>
      </View>
    </View>
    <View style={styles.left}>
      <View style={styles.group}>
        <Text style={[styles.label,{fontSize:18}]}>{'Number: '}</Text>
        <Text style={[styles.data,{fontSize:18}]}>{number}</Text>
      </View>
    </View>
    <View style={{flexDirection:"row",justifyContent:"space-between",paddingHorizontal:10}}>

      <View style={{width:"48%",borderRadius:10,elevation:10,borderColor:"#dfdfdf",borderWidth:1}}>
        <Image style={{resizeMode:"cover",height:100,width:"100%",borderRadius:10,}} source={{uri:FINAL_CONFIG.server_url+"/" + front}}  />
      </View>
      <View style={{width:"48%",borderRadius:10,elevation:10,borderColor:"#dfdfdf",borderWidth:1}}>
        <Image style={{resizeMode:"cover",height:100,width:"100%",borderRadius:10,}} source={{uri:FINAL_CONFIG.server_url+"/" + back}}  />
      </View>
    </View>
   
    
  </View>
);

  return (
   
        <View style={styles.InfoBox}>
          <View style={styles.CallMessage}>
            <Text style={styles.MessageText}>Documents</Text>
            <TouchableOpacity onPress={()=>setShowModal(true)} style={{flexDirection:"row",height:40,paddingHorizontal:30,justifyContent:"center",alignItems:"center",backgroundColor:"steelblue",borderRadius:45,elevation:10}}>
              <FontAwesome name="edit" size={20} color="white" /> 
              <Text style={{color:"white",marginLeft:10}}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={getAllDocuments} style={{height:40,width:40,justifyContent:"center",alignItems:"center",backgroundColor:"steelblue",borderRadius:45,elevation:10}}>
              <FontAwesome name="refresh" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <View style={[styles.MessageBody]}>
          <FlatList
           data={Data}
           onRefresh={()=>getAllDocuments()}
           renderItem={({item})=>renderItem(item)}
          refreshing={refreshing}
           keyExtractor={item => item.type}
        />
          </View>
          <AddDocument show={showModal} refreshParentData={getAllDocuments} parentData={Data} />
        </View>


  );
};

export default Documents;

const styles = StyleSheet.create({


  PrimaryText: {
    color: Constants.colors.primary,
    fontSize: 32,
    fontWeight:'bold'
  },
  NameStyle: {
    // borderRadius: 30,
    // paddingHorizontal: 30,
    // paddingVertical: 5,
    padding:15,

    borderColor: Constants.colors.primary,
    // borderWidth: 1,
    //   elevation:5,
    // marginTop: -18,
    // backgroundColor: "white",
  },
  MessageText: {
    color: "black",
    fontSize: 16,
  },
  CallMessage: {
    //   borderRadius:30,
    padding:10,
alignItems:"center",
   flexDirection:"row",
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: "#fafafa",
  },
  InfoBox: {
   
  },
  MessageBody: {
    overflow: "hidden",
    padding: 10,
  },
  MessageBodyText: {
    color: "black",
    flexWrap: "wrap",
  },
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
    backgroundColor:"rgb(215, 224, 247)",
    elevation:10,
    marginVertical:10,
    borderRadius:10,
    padding:10,
    width:"100%",
  },
  left:{
    padding:10,
    width:'100%',
    alignItems:"center",
    flexDirection:'row',
    justifyContent:"space-evenly",
    flexWrap:"wrap",
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
