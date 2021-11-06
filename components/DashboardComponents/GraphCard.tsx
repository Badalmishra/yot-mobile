import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from "react-native";
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
const GraphCard = ({ color, title }: Props) => {
  const [dataset, setdataset] = useState({});
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        setdataset({
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
            },
          ],
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
      <View style={styles.MessageBody}>
        
        {
          loading
          ?
          <ActivityIndicator color="black"/>
          :
          <LineChart
            data={dataset}
            width={Dimensions.get("screen").width-20} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8cf3",
              backgroundGradientTo: "#ffa726",
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
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        }
      </View>
    </View>
  );
};

export default GraphCard;

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
    overflow: "hidden",
    padding: 10,
  },
  MessageBodyText: {
    color: "black",
    flexWrap: "wrap",
  },
});
