import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Picker, Toast } from "native-base";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  RefreshControl,
  Modal,
  TouchableOpacity,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import Constants from "../../constants/Constants";
import { service } from "../../Services/Services";
import * as ImagePicker from 'expo-image-picker';
const AddDocument = ({
  show,
  refreshParentData,
  parentData,
}: {
  show: boolean;
  refreshParentData: Function;
  parentData: any;
}) => {
  const [Data, setData] = useState({});
  const [refreshing, setresfreshing] = useState(false);
  const [type, setType] = useState("ADHAAR CARD");
  const [front, setFront] = useState("");
  const [back, setbBack] = useState("");
  const [number, setNumber] = useState("");

  useEffect(() => {
    const data = parentData.find((e: any) => e.type === "ADHAAR CARD");
    if (data) {
      setData(data);
    } else {
      setData({ type: "ADHAAR CARD" });
    }
  }, [show]);
  useEffect(() => {
    const data = parentData.find((e: any) => e.type === type);
    if (data) {
      setData(data);
    } else {
      setData({ type: "ADHAAR CARD" });
    }
  }, [type]);
  useEffect(() => {
    setNumber("")
    setFront("")
    setbBack("")
    setType("ADHAAR CARD")
  }, [show]);
  const saveDocument = () => {
    const payload: {
      front: File | string;
      back: File | string;
      number: string | Blob;
      type: string | Blob;
    } = {
      type,
      front,
      back,
      number,
    };
    if (type && front && back && number) {
      console.log("payload",payload)
      service.addDocuments(payload).then((data) => {
        Toast.show({
          type: "success",
          text: "Document Updated",
          duration: 5000,
        });
        refreshParentData()
      });
    } else {
      alert("Error: please fill all fields, choose all images")
      Toast.show({
        type: "danger",
        text: "Error please fill all fields",
        duration: 5000,
      });
    }
  };
  const pickImage = async (front:boolean) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      let fileName = result.uri.split('.');
      let match = /\.(\w+)$/.exec(fileName);
      let fileType = match ? `image/${match[1]}` : `image`;
      var fileToUpload = {
        uri: result.uri.replace('file://', ''),
        name:(front?"front.":"back.")+fileName[fileName.length-1],
        type: "application/" + fileType
      };
      if (front) {
        
        setFront(fileToUpload);
      }else{
        setbBack(fileToUpload)
      }
    }
  };
  return (
    <Modal visible={show} onRequestClose={() => refreshParentData()}>
      <ScrollView style={styles.InfoBox}>
        <View style={[styles.CallMessage,{elevation:10}]}>
          <Text style={[styles.MessageText,{fontSize:22}]}>Add Document</Text>
        </View>

        <View style={styles.CallMessage}>
          <Text style={styles.MessageText}>Type</Text>
        </View>
        <View style={[styles.MessageBody]}>
          <Picker  selectedValue={type} onValueChange={(val,pos)=>setType(val)} style={[styles.saveButton,{backgroundColor:"#dfdfdf"}]} >
            
           <Picker.Item label="PAN CARD" value="PAN CARD" />
           <Picker.Item label="ADHAAR CARD" value="ADHAAR CARD" />
          </Picker>
        </View>

        <View style={styles.CallMessage}>
          <Text style={styles.MessageText}>Front</Text>
        </View>
        <View style={[styles.MessageBody]}>
        {
    front
    ?
<Image source={{uri:front?front.uri:""}} style={{resizeMode:"contain",height:200,width:"100%"}} />
:
<Image style={{resizeMode:"contain",height:200,width:"100%"}}  source={require("../../assets/images/not_available.png")}/>
  } 
 <TouchableOpacity onPress={()=>pickImage(true)} style={[styles.saveButton,{backgroundColor:"#3d3d3d"}]} >
            
            <FontAwesome color={"white"} name="upload" size={22} />
            <Text style={styles.saveText} >Upload front image</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.CallMessage}>
          <Text style={styles.MessageText}>Back</Text>
        </View>
<View style={[styles.MessageBody]}>
  {
    back
    ?
<Image source={{uri:back?back.uri:""}} style={{resizeMode:"contain",height:200,width:"100%"}} />
:
<Image style={{resizeMode:"contain",height:200,width:"100%"}}  source={require("../../assets/images/not_available.png")}/>
  }
          <TouchableOpacity onPress={()=>pickImage(false)} style={[styles.saveButton,{backgroundColor:"#3d3d3d"}]} >
            
            <FontAwesome color={"white"} name="upload" size={22} />
            <Text style={styles.saveText} >Upload back image</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.CallMessage}>
          <Text style={styles.MessageText}>Number</Text>
        </View>
        <View style={[styles.MessageBody]}>
          <TextInput value={number} onChangeText={(text)=>setNumber(text)} placeholder={"Card Number"} style={[styles.saveButton,{backgroundColor:"#dfdfdf"}]} />
        </View>


        <View style={[styles.MessageBody]}>
          <TouchableOpacity
          onPress={saveDocument}
            style={styles.saveButton}
          >
            <FontAwesome color={"white"} name="save" size={22} />
            <Text style={styles.saveText} >Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default AddDocument;

const styles = StyleSheet.create({
  PrimaryText: {
    color: Constants.colors.primary,
    fontSize: 32,
    fontWeight: "bold",
  },
  saveButton:{
    width: "100%",
    backgroundColor: "steelblue",
    borderRadius: 10,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
  },
  saveText:{
    color:"white",
    fontSize:22,
    marginLeft:10
  },
  NameStyle: {
    // borderRadius: 30,
    // paddingHorizontal: 30,
    // paddingVertical: 5,
    padding: 15,

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
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: "#fafafa",
  },
  InfoBox: {},
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
    backgroundColor: "white",
    // backgroundColor:"green"
    // justifyContent: "center",
  },
  ButtonContainer: {
    flexDirection: "row",
    padding: 40,
    alignItems: "center",
    justifyContent: "space-around",
    position: "absolute",
    bottom: 80,
    right: 0,
  },
  item: {
    backgroundColor: "white",
    elevation: 10,
    marginVertical: 10,
    width: "100%",
  },
  left: {
    padding: 10,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },

  subject: {
    fontSize: 20,
  },
  group: {
    // backgroundColor:"#d4d4d4",
    flexDirection: "row",
    marginRight: 10,
  },
  label: {
    color: "steelblue",
    fontWeight: "bold",
  },
  data: {
    color: "tomato",
  },
});
