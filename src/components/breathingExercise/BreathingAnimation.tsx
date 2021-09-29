import { t } from 'i18n-js';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import useColorScheme from '../../hooks/useColorScheme';
import { Text } from '../ui/Themed';

interface Props {
  counter: number;
  duration: number;
  disableAnimation: boolean;
}

const getSmallerSize = () => {
  let smaller = Layout.window.width * 0.85;
  const heightLimit = Layout.window.height * (Layout.windowRatio < 0.5 ? 0.33 : 0.29);

  if (smaller > heightLimit) {
    smaller = heightLimit;
  }
  if (smaller > 250) {
    smaller = 250;
  } else {
    smaller = Math.floor(smaller);
  }

  return smaller;
};
const containerSize = getSmallerSize();

const animStartVal = 0;
const animEndValue = 100;

const inputRange = [
  animStartVal,
  animEndValue * 0.03,
  animEndValue * 0.43,
  animEndValue * 0.48,
  animEndValue * 0.97,
  animEndValue,
];
const outputRange = [1, 1.02, containerSize / 100, containerSize / 100, 1.03, 1];
const outputRangeTwo = [0.6, 0.64, 0.95, 0.95, 0.65, 0.6];
const outputRangeFour = [0.6, 0.64, 0.97, 0.97, 0.65, 0.6];

const opacityOutputRange = [0.8, 0.83, 1, 1, 0.83, 0.8];

const BreathingAnimation: React.FC<Props> = ({ counter, duration, disableAnimation }) => {
  const anim = useRef(new Animated.Value(animStartVal)).current;

  const scheme = useColorScheme();

  useEffect(() => {
    if (disableAnimation) {
      return;
    }
    anim.setValue(animStartVal);

    const animHandler = Animated.timing(anim, {
      toValue: animEndValue,
      duration,
      useNativeDriver: false,
    });

    animHandler.start();
    return () => {
      animHandler.stop();
    };
  }, [anim, counter, duration, disableAnimation]);

  return (
    <View
      style={[
        styles.container,
        {
          height: disableAnimation
            ? styles.container.height / 3
            : styles.container.height,
        },
      ]}>
      {disableAnimation ? (
        <Text style={{ color: Colors[scheme].textRGBA(0.3) }}>
          {t('ex.breathing.animation_disabled')}
        </Text>
      ) : (
        <Animated.View
          style={[
            styles.animated,
            styles.one,
            {
              opacity: anim.interpolate({
                inputRange,
                outputRange: opacityOutputRange,
              }),
              transform: [
                {
                  scale: anim.interpolate({
                    inputRange,
                    outputRange,
                  }),
                },
              ],
            },
          ]}>
          <Animated.View
            style={[
              styles.animated,
              styles.two,
              {
                transform: [
                  {
                    scale: anim.interpolate({
                      inputRange,
                      outputRange: outputRangeTwo,
                    }),
                  },
                ],
              },
            ]}>
            <Animated.View
              style={[
                styles.animated,
                styles.three,
                {
                  transform: [
                    {
                      scale: anim.interpolate({
                        inputRange,
                        outputRange: outputRangeTwo,
                      }),
                    },
                  ],
                },
              ]}>
              <Animated.View
                style={[
                  styles.animated,
                  styles.four,
                  {
                    transform: [
                      {
                        scale: anim.interpolate({
                          inputRange,
                          outputRange: outputRangeFour,
                        }),
                      },
                    ],
                  },
                ]}></Animated.View>
            </Animated.View>
          </Animated.View>
        </Animated.View>
      )}
    </View>
  );
};

export default BreathingAnimation;

const styles = StyleSheet.create({
  container: {
    width: containerSize,
    height: containerSize,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Layout.spacing(3),
  },
  animated: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    width: 100,
    height: 100,
  },
  one: {
    backgroundColor: 'rgb(106, 170, 170)',
  },
  two: {
    backgroundColor: 'rgb(246, 102, 78)',
  },
  three: {
    backgroundColor: 'rgb(194, 233, 135)',
  },
  four: {
    backgroundColor: 'rgb(171, 223, 247)',
    width: 90,
    height: 90,
  },
});
