/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Button,
  Easing,
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Circle, ClipPath, G, Mask, Rect, Svg} from 'react-native-svg';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const WIDTH = 300;
const HEIGHT = 140;

const AnimatedRect = Animated.createAnimatedComponent(Rect);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const SlidingInClipPath: React.FC = () => {
  const animatedWidth = useRef(new Animated.Value(0)).current;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      Animated.timing(animatedWidth, {
        toValue: WIDTH,
        duration: 1200,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.ease),
      }).start();
    } else {
      animatedWidth.setValue(0);
    }
  }, [animatedWidth, isVisible]);
  return (
    <View>
      <Text>ClipPath sliding in</Text>
      <Svg width={WIDTH} height={HEIGHT} fill={'blue'}>
        <ClipPath id="clipPath">
          <AnimatedRect x={0} y={0} width={animatedWidth} height={HEIGHT} />
        </ClipPath>
        <G clipPath="url(#clipPath)">
          <Circle stroke={'green'} strokeWidth={3} cx={230} cy={50} r={30} />
          <Rect x={50} y={30} width={200} height={100} />
          <Circle stroke={'red'} strokeWidth={3} cx={80} cy={50} r={30} />
        </G>
      </Svg>
      <Button
        onPress={() => setIsVisible(current => !current)}
        title={isVisible ? 'Hide' : 'SHow'}
      />
    </View>
  );
};

const SlidingInMask: React.FC = () => {
  const animatedWidth = useRef(new Animated.Value(0)).current;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      Animated.timing(animatedWidth, {
        toValue: WIDTH,
        duration: 1200,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.ease),
      }).start();
    } else {
      animatedWidth.setValue(0);
    }
  }, [animatedWidth, isVisible]);
  return (
    <View>
      <Text>Mask sliding in</Text>
      <Svg width={WIDTH} height={HEIGHT} fill={'blue'}>
        <Mask id="mask">
          <Rect x={0} y={0} width={WIDTH} height={HEIGHT} fill="black" />
          <AnimatedRect
            x={0}
            y={0}
            width={animatedWidth}
            height={HEIGHT}
            fill="white"
          />
        </Mask>
        <G mask="url(#mask)">
          <Circle stroke={'green'} strokeWidth={3} cx={230} cy={50} r={30} />
          <Rect x={50} y={30} width={200} height={100} />
          <Circle stroke={'red'} strokeWidth={3} cx={80} cy={50} r={30} />
        </G>
      </Svg>
      <Button
        onPress={() => setIsVisible(current => !current)}
        title={isVisible ? 'Hide' : 'SHow'}
      />
    </View>
  );
};

const FadingIn: React.FC = () => {
  const animatedOpacity = useRef(new Animated.Value(0)).current;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      Animated.timing(animatedOpacity, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.ease),
      }).start();
    } else {
      animatedOpacity.setValue(0);
    }
  }, [animatedOpacity, isVisible]);
  return (
    <View>
      <Text>Mask fading in</Text>
      <Svg width={WIDTH} height={HEIGHT} fill={'blue'}>
        <Mask id="mask">
          <AnimatedRect
            x={0}
            y={0}
            width={WIDTH}
            opacity={animatedOpacity}
            height={HEIGHT}
            fill="white"
          />
        </Mask>
        <G mask="url(#mask)">
          <Circle stroke={'green'} strokeWidth={3} cx={230} cy={50} r={30} />
          <Rect x={50} y={30} width={200} height={100} />
          <Circle stroke={'red'} strokeWidth={3} cx={80} cy={50} r={30} />
        </G>
      </Svg>
      <Button
        onPress={() => setIsVisible(current => !current)}
        title={isVisible ? 'Hide' : 'SHow'}
      />
    </View>
  );
};

const RADIUS = 80;
const PulsatingCircle: React.FC = () => {
  const animatedRadius = useRef(new Animated.Value(0)).current;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      Animated.timing(animatedRadius, {
        toValue: RADIUS,
        duration: 1200,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.ease),
      }).start();
    } else {
      Animated.timing(animatedRadius, {
        toValue: 0,
        duration: 1200,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.ease),
      }).start();
    }
  }, [animatedRadius, isVisible]);
  return (
    <View>
      <Text>Pulsating Circle</Text>
      <Svg width={WIDTH} height={HEIGHT} fill={'blue'}>
        <G>
          <AnimatedCircle
            fill={'green'}
            strokeWidth={3}
            cx={80}
            cy={80}
            r={animatedRadius}
          />
        </G>
      </Svg>
      <Button
        onPress={() => setIsVisible(current => !current)}
        title={isVisible ? 'Hide' : 'SHow'}
      />
    </View>
  );
};

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <SlidingInClipPath />
      <SlidingInMask />
      <FadingIn />
      <PulsatingCircle />
    </SafeAreaView>
  );
}

export default App;
