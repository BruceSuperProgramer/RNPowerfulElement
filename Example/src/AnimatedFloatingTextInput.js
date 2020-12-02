import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export default function AnimatedFloatingTextInput(props) {
  const [inputValue, setInputValue] = useState(null);
  const [currentInputHeight, setCurrentInputHeight] = useState(null);
  const labelOffsetY = useSharedValue(0);

  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const labelStyle = useAnimatedStyle(() => {
    return {
      paddingBottom: withTiming(labelOffsetY.value, config),
    };
  });

  const onInputFocus = () => {
    if (inputValue == null || inputValue == '') {
      labelOffsetY.value += 25;
    }
  };

  const onInputBlur = () => {
    if (inputValue == null || inputValue == '') {
      labelOffsetY.value -= 25;
    }
  };

  return (
    <View style={{ justifyContent: 'center' }}>
      <Animated.Text style={labelStyle}>User Name</Animated.Text>
      <View
        style={{
          width: '100%',
          position: 'absolute',
        }}>
        <TextInput
          style={{
            width: '100%',
            borderBottomWidth: 1,
          }}
          onChangeText={(text) => setInputValue(text)}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          multiline={true}
          onContentSizeChange={({ nativeEvent }) => {
            const {
              contentSize: { height },
            } = nativeEvent;
            if (currentInputHeight !== height) {
              if (currentInputHeight == null) {
                labelOffsetY.value += 10;
                setCurrentInputHeight(height);
                return;
              }
              const heightDiffrence = height - currentInputHeight;
              labelOffsetY.value += heightDiffrence;
              setCurrentInputHeight(height);
            }
          }}
        />
      </View>
    </View>
  );
}
