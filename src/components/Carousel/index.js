
import React, { Component } from 'react'
import { Animated, View, StyleSheet, Image, Dimensions, ScrollView, Text } from 'react-native'

const deviceWidth = Dimensions.get('window').width 
const FIXED_BAR_WIDTH = 280
const BAR_SPACE = 10

// const this.props.images = [
//     'https://s-media-cache-ak0.pinimg.com/originals/ee/51/39/ee5139157407967591081ee04723259a.png',
//     'https://s-media-cache-ak0.pinimg.com/originals/40/4f/83/404f83e93175630e77bc29b3fe727cbe.jpg',
//     'https://s-media-cache-ak0.pinimg.com/originals/8d/1a/da/8d1adab145a2d606c85e339873b9bb0e.jpg',
// ]

export default class Carousel extends Component { 
    numItems = this.props.images.length
    itemWidth = (FIXED_BAR_WIDTH / this.numItems) - ((this.numItems - 1) * BAR_SPACE)
    animVal = new Animated.Value(0)

    render() { 
        let imageArray = []
        let barArray = []
        this.props.images.forEach((image, i) => { 
            const thisImage = (
                <Image
                    key={`image${i}`}
                    source={{ uri: image }}
                    style={{ width: deviceWidth,backgroundColor:'#ccc',objectFit:'cover' }}
                />
            )
            imageArray.push(thisImage)

            const scrollBarVal = this.animVal.interpolate({
                inputRange: [(deviceWidth * (i - 1))+BAR_SPACE, (deviceWidth * (i + 1))-BAR_SPACE],
                outputRange: [-this.itemWidth, this.itemWidth],
                extrapolate: 'clamp',
            })
 

            const thisBar = (
                <View
                    key={`bar${i}`}
                    style={[
                        styles.track,
                        {
                            width: this.itemWidth,
                            marginLeft: i === 0 ? 0 : BAR_SPACE,
                        },
                    ]}
                >
                    <Animated.View

                        style={[
                            styles.bar,
                            {
                                width: this.itemWidth,
                                transform: [
                                    { translateX: scrollBarVal },
                                ],
                            },
                        ]}
                    />
                </View>
            )
            barArray.push(thisBar)
        })

        return (
            <View
                style={styles.container}
                flex={1}
            >
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={10}
                    pagingEnabled
                    onScroll={
                        Animated.event(
                            [{ nativeEvent: { contentOffset: { x: this.animVal } } }],
                            { useNativeDriver: false }
                        )
                    }
                >

                    {imageArray}
                    {/* <View
                        style={styles.skip}
                    >
                        <Text style={{
                            backgroundColor: '#fff', color: "#F44", textAlign: "center", alignItems: 'center',
                            justifyContent: 'center',
                        }}>skip</Text>
                    </View> */}
                </ScrollView>
                <View
                    style={styles.barContainer}
                >
                    {barArray}
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'black'
    },
    barContainer: {
        position: 'absolute',
        zIndex: 2,
        top: 20,
        flexDirection: 'row',
    },
    skip: {
        position: 'absolute',
        zIndex: 2,
        bottom: 80,
        flexDirection: 'row',
    },
    track: {
        backgroundColor: 'gray',
        overflow: 'hidden',
        height: 2,
        borderRadius:10
    },
    bar: {
        backgroundColor: '#darkgray',
        height: 2,
        position: 'absolute',
        left: 0,
        top: 0,
    },
})