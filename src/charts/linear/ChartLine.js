import React, { useContext } from 'react';
import Animated, { useAnimatedProps } from 'react-native-reanimated';
import { Svg, Line } from 'react-native-svg';
import ChartContext from '../../helpers/ChartContext';
import withReanimatedFallback from '../../helpers/withReanimatedFallback';

const AnimatedLine = Animated.createAnimatedComponent(Line);

function ChartLineFactory(style) {
  const isVertical = style == 'vertical';
  return function ChartLine({ color, thickness = 2, length, ...props }) {
    const { lineStyle, zeroLineStyle } = useContext(ChartContext);

    const animatedLineProps = useAnimatedProps(() => ({
      x1: 0,
      y1: 0,
      x2: isVertical ? thickness : length,
      y2: isVertical ? length + 20 : thickness,
    }));

    return (
      <Animated.View
        pointerEvents='none'
        style={[
          isVertical ? lineStyle : zeroLineStyle,
          {
            height: isVertical ? length + 20 : thickness,
            position: 'absolute',
            left: 0,
            top: 0,
            width: isVertical ? thickness : length,
          },
        ]}>
        <Svg height={isVertical ? length + 20 : thickness} width={isVertical ? thickness : length}>
          <AnimatedLine
            animatedProps={animatedLineProps}
            stroke={color}
            strokeWidth={thickness}
            strokeDasharray={10}
            {...props}
          />
        </Svg>
      </Animated.View>
    );
  };
}

export const ChartLine = withReanimatedFallback(ChartLineFactory('vertical'));
export const ChartZeroLine = withReanimatedFallback(ChartLineFactory('horizontal'));
