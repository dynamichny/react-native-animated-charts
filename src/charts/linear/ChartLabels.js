import React, { useContext } from 'react';
import { TextInput } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';

import ChartContext from '../../helpers/ChartContext';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

function ChartLabelFactory(style) {
  return function ChartLabel({ format, ...props }) {
    const { [style]: val = 0, providedData } = useContext(ChartContext);
    
    const formattedValue = useDerivedValue(() => {
      if(val.value === '') {
        const lastPosition = providedData?.points?.length - 1 || 0
        const lastPoint = providedData?.points?.[`${lastPosition}`]
        if(lastPoint) {
          val.value = style == 'originalY' ? lastPoint.y : lastPoint.x
        }
      }
    return format ? format(val.value) : val.value;
    }, []);
    const textProps = useAnimatedStyle(() => {
      return {
        text: formattedValue.value,
      };
    }, []);
    return (
      <AnimatedTextInput
        {...props}
        animatedProps={textProps}
        defaultValue={format ? format(val.value) : val.value}
        editable={false}
      />
    );
  };
}

export const ChartYLabel = ChartLabelFactory('originalY');
export const ChartXLabel = ChartLabelFactory('originalX');
