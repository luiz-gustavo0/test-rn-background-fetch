/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { LineChart, YAxis, XAxis, Grid } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

const vitalSignsData = {
  bpm: 68,
  spO2: 98,
  respirationRate: 16,
  bodyTemperature: 36.6,
  bloodPressure: [120, 80],
  time: 1662992891972,
};

const { width } = Dimensions.get('window');

export function ECG() {
  const YValues = ['DI', 'aVR', 'V1', 'V4'];
  const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];
  const XValues = [
    50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80,
  ];
  const contentInset = { top: 20, bottom: 20 };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chart</Text>
      <LineChart
        style={{ height: 200 }}
        data={data}
        svg={{ stroke: 'rgb(134, 65, 244)' }}
        contentInset={contentInset}
        curve={shape.curveNatural}>
        <Grid />
      </LineChart>
      <LineChart
        style={{ height: 200 }}
        data={data}
        svg={{ stroke: 'rgb(134, 65, 244)' }}
        contentInset={contentInset}
        curve={shape.curveNatural}>
        <Grid />
      </LineChart>
      <XAxis
        style={{ marginHorizontal: -10 }}
        data={data}
        formatLabel={(value, index) => index}
        contentInset={{ left: 10, right: 10 }}
        svg={{ fontSize: 10, fill: 'black' }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 30,
    marginBottom: 40,
  },
});
