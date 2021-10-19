import React, { useContext } from 'react';
import Animated, {useAnimatedProps} from 'react-native-reanimated';
import {Svg, Line} from 'react-native-svg'
import ChartContext from '../../helpers/ChartContext';
import withReanimatedFallback from '../../helpers/withReanimatedFallback';

const AnimatedLine = Animated.createAnimatedComponent(Line)

function ChartLine({ color, thickness = 2, width, ...props }) {
  const { zeroLineStyle } = useContext(ChartContext);

  const animatedLineProps = useAnimatedProps(() => ({
    x1: 0,
    y1: 0,
    x2: width,
    y2: thickness,
  }))

  return (
    <Animated.View
      {...props}
      pointerEvents="none"
      style={[
        zeroLineStyle,
        {
          height: thickness,
          position: 'absolute',
          left: 0,
          top: 0,
          width,
        },
      ]}
    >
      <Svg height={thickness} width={width}>
        <AnimatedLine animatedProps={animatedLineProps} stroke={color} strokeWidth={thickness} strokeDasharray={5} />
      </Svg>
    </Animated.View>
  );
}

export default withReanimatedFallback(ChartLine);
