import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Defs, Pattern, Path, Rect } from 'react-native-svg';

const ChatBackground = () => {
  return (
    <View style={styles.container}>
      <Svg height="100%" width="100%" style={styles.svg}>
        <Defs>
          <Pattern id="pattern" width="100" height="100" patternUnits="userSpaceOnUse">
            {/* Light curved lines */}
            <Path
              d="M25,0 Q50,25 25,50 Q0,75 25,100"
              stroke="#E5E5E5"
              strokeWidth="0.5"
              fill="none"
            />
            <Path
              d="M75,0 Q100,25 75,50 Q50,75 75,100"
              stroke="#E5E5E5"
              strokeWidth="0.5"
              fill="none"
            />
            {/* Dots */}
            <Path
              d="M12.5,12.5 L13.5,12.5 L13.5,13.5 L12.5,13.5 Z"
              fill="#F0F0F0"
            />
            <Path
              d="M62.5,62.5 L63.5,62.5 L63.5,63.5 L62.5,63.5 Z"
              fill="#F0F0F0"
            />
          </Pattern>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="#FFFFFF" />
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)" />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#F0F2F5',
  },
  svg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.5,
  },
});

export default ChatBackground;
