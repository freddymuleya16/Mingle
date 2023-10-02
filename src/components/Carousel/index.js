import React, { useRef } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const FIXED_BAR_WIDTH = 280;
const BAR_SPACE = 10;

const Carousel = (props) => {
  const numItems = props.images.length;
  const itemWidth = (FIXED_BAR_WIDTH / numItems) - ((numItems - 1) * BAR_SPACE);
  const animVal = useRef(new Animated.Value(0)).current;

  const imageArray = props.images.map((image, i) => (
    <Image
      key={`image${i}`}
      source={{ uri: image }}
      style={{ width: deviceWidth, backgroundColor: '#ccc', objectFit: 'cover' }}
    />
  ));

  const barArray = props.images.map((_, i) => {
    const scrollBarVal = animVal.interpolate({
      inputRange: [(deviceWidth * (i - 1)) + BAR_SPACE, (deviceWidth * (i + 1)) - BAR_SPACE],
      outputRange: [-itemWidth, itemWidth],
      extrapolate: 'clamp',
    });

    return (
      <View
        key={`bar${i}`}
        style={[
          styles.track,
          {
            width: itemWidth,
            marginLeft: i === 0 ? 0 : BAR_SPACE,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.bar,
            {
              width: itemWidth,
              transform: [{ translateX: scrollBarVal }],
            },
          ]}
        />
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={10}
        pagingEnabled
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: animVal } } }],
          { useNativeDriver: false }
        )}
      >
        {imageArray}
      </ScrollView>
      <View style={styles.barContainer}>{barArray}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  barContainer: {
    position: 'absolute',
    zIndex: 2,
    top: 20,
    flexDirection: 'row',
  },
  track: {
    backgroundColor: 'gray',
    overflow: 'hidden',
    height: 2,
    borderRadius: 10,
  },
  bar: {
    backgroundColor: '#darkgray',
    height: 2,
    position: 'absolute',
    left: 0,
    top: 0,
  },
});

export default Carousel;
