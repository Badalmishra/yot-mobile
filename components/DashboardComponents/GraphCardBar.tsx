import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

type Props = {
  color: string;
  title: string;
};
const GraphCardBar = ({ color, title }: Props) => {
  const [dataset, setdataset] = useState({});
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        setdataset({
          
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: [20, 45, 28, 80, 99, 43]
            }
          ]
          
        });
        setloading(false);
      }, 1000);
    };
    fetchData();
    return () => {
      console.log("unmounting GraphCard", title);
    };
  }, []);
  return (
    <View style={styles.InfoBox}>
      <View style={styles.CallMessage}>
        <Text style={styles.MessageText}>{title}</Text>
      </View>
      <ScrollView horizontal={true} style={styles.MessageBody}>
        {
          loading
          ?
          <View style={{flexDirection:"row",justifyContent:"center",width:Dimensions.get("screen").width-20}}>
            <ActivityIndicator color="black"/>
          </View>
          :
          <BarChart
  data={dataset}
  width={Dimensions.get("screen").width-20}
  height={220}
  yAxisLabel="$"
  chartConfig={{
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#373B44",
    backgroundGradientTo: "#4286f4",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726",
    },
  }}
  style={{
    marginVertical: 8,
    borderRadius: 16,
  }}
  verticalLabelRotation={30}
/>
        }
      </ScrollView>
    </View>
  );
};

export default GraphCardBar;

const styles = StyleSheet.create({
  MessageText: {
    color: "black",
    fontSize: 16,
  },
  CallMessage: {
    //   borderRadius:30,
    padding: 10,

    width: "100%",
    justifyContent: "center",
    backgroundColor: "#fafafa",
  },
  InfoBox: {
    backgroundColor: "white",
  },
  MessageBody: {
    // overflow: "hidden",
    padding: 10,
    width:"200%"
  },
  MessageBodyText: {
    color: "black",
    flexWrap: "wrap",
  },
});
