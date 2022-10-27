import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Canvas from 'react-native-canvas';

const defaultProps = {
  width: 370,
  height: 100,
  timeWidth: 3000, // in milliseconds
  scanBarWidth: 20,
};

type ECGProps = {
  width: number;
  height: number;
  timeWidth: number; // in milliseconds
  scanBarWidth: number;
  amplitudeRange: {
    top: number;
    bottom: number;
  };
  data: {
    amplitude: number;
    timeStamp: Date;
  };
};

export function ECG(elProps: ECGProps) {
  const canvas = useRef<Canvas>();
  const start = new Date().getTime();
  let opx = 0;
  let opy = 0;

  const handleCanvas = () => {
    if (canvas.current) {
      const ctx = canvas.current.getContext('2d');
      ctx.strokeStyle = '#00bd00';

      ctx.lineWidth = 1;
      ctx.strokeStyle = '#00bd00';
    }
  };

  const updateCanvas = (_, props: ECGProps) => {
    const context = canvas.current?.getContext('2d');
    const time = (props.data.timeStamp.getTime() - start) % props.timeWidth;
    const px = (time * props.width) / props.timeWidth;
    const amplitudeHeight =
      props.amplitudeRange.top - props.amplitudeRange.bottom;
    const py =
      ((props.data.amplitude - props.amplitudeRange.bottom) * props.height) /
      amplitudeHeight;
    context?.clearRect(px, 0, props.scanBarWidth, props.height);
    context?.beginPath();

    if (px < opx) {
      opx = 0;
    }

    context?.moveTo(opx, opy);
    context?.lineTo(px, py);

    opx = px;
    opy = py;
  };

  useEffect(() => {
    updateCanvas(canvas, elProps);
  }, [elProps, updateCanvas]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ECG Graph</Text>
      <Canvas
        ref={handleCanvas}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          backgroundColor: '#000',
          width: defaultProps.width,
          height: defaultProps.height,
        }}
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
