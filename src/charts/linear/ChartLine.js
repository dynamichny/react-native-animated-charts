import React, { useContext } from 'react';
import Animated, {useAnimatedProps} from 'react-native-reanimated';
import {Svg, Line} from 'react-native-svg'
import ChartContext from '../../helpers/ChartContext';
import withReanimatedFallback from '../../helpers/withReanimatedFallback';

const AnimatedLine = Animated.createAnimatedComponent(Line)

function ChartLine({ color, thickness = 2, height, ...props }) {
  const { lineStyle } = useContext(ChartContext);

  const animatedLineProps = useAnimatedProps(() => ({
    x1: 0,
    y1: 0,
    x2: thickness,
    y2: height + 20,
  }))

  return (
    <Animated.View
      {...props}
      pointerEvents="none"
      style={[
        lineStyle,
        {
          height: height + 20,
          position: 'absolute',
          left: 0,
          top: 0,
          width: thickness,
        },
      ]}
    >
      <Svg height={height + 20} width={thickness}>
        <AnimatedLine animatedProps={animatedLineProps} stroke={color} strokeWidth={thickness} strokeDasharray={10} />
      </Svg>
    </Animated.View>
  );
}

export default withReanimatedFallback(ChartLine);
