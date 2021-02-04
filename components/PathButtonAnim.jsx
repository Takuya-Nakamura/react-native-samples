import React, { Component } from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  StyleSheet,
  Animated

} from 'react-native';
import Svg, {
  Circle,
  Ellipse,
  G,
  Text as SVGText,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Image,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';

// 512 484
const path = "M373.597,0.736 C372.659,0.736 371.741,0.745 370.802,0.766 C313.675,1.864 276.726,30.028 256,64.182 C235.274,30.028 198.325,1.864 141.198,0.766 C140.27,0.745 139.332,0.736 138.402,0.736 C99.836,0.736 64.843,16.201 39.884,44.274 C13.797,73.626 0,114.789 0,163.309 C0,258.582 76.404,316.687 150.284,372.875 C178.797,394.559 208.259,416.973 233.767,441.563 L234.905,443.11 C239.967,449.35 247.324,453.014 255.201,453.244 L256.001,453.264 L256.839,453.244 C264.686,453.004 272.025,449.35 277.086,443.13 L278.244,441.552 C303.742,416.962 333.214,394.549 361.717,372.874 C435.596,316.687 512,258.583 512,163.309 C512,67.586 455.083,0.736 373.597,0.736 Z M371.391,328.748 C334.271,357.7 293.219,386.614 257.737,420.847 C257.048,421.515 256.489,422.085 255.99,422.624 C255.471,422.075 254.972,421.536 254.264,420.847 C206.961,375.232 149.744,338.952 105.148,299.645 C82.835,280.027 63.736,259.741 50.358,237.557 C36.98,215.353 29.174,191.393 29.143,163.309 C29.163,119.081 41.953,85.816 61.671,63.632 C81.428,41.468 108.244,29.927 138.404,29.868 L140.641,29.898 C174.416,30.606 198.476,42.568 215.658,59.579 C232.79,76.601 242.823,99.135 246.428,120.569 C247.216,125.251 251.249,128.666 256.002,128.666 C260.754,128.666 264.787,125.252 265.576,120.569 C269.18,99.135 279.214,76.602 296.346,59.579 C313.527,42.567 337.588,30.606 371.363,29.898 L373.599,29.868 C403.76,29.927 430.575,41.468 450.334,63.632 C470.051,85.816 482.841,119.081 482.86,163.309 C482.83,191.393 475.023,215.353 461.645,237.557 C441.605,270.833 408.54,299.815 371.391,328.748 Z"

//100 88
const path2 = "M49.4552846,13.9756098 C55.9674797,7.18699187 60.5284553,1.31707317 70.5609756,0.170731707 C89.398374,-1.99186992 106.723577,17.2926829 97.2113821,36.2764228 C94.504065,41.6829268 88.9918699,48.1138211 82.8943089,54.4227642 C76.203252,61.3495935 68.796748,68.1382114 63.6097561,73.2845528 L49.4634146,87.3170732 L37.7723577,76.0650407 C23.7073171,62.5203252 0.772357724,45.4715447 0.0162601626,24.3495935 C-0.512195122,9.55284553 11.1626016,0.0731707317 24.5934959,0.243902439 C36.5934959,0.406504065 41.6422764,6.37398374 49.4552846,13.9756098 L49.4552846,13.9756098 L49.4552846,13.9756098 Z"

//anim config
const duration = 200
const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const AnimatedPath = Animated.createAnimatedComponent(Path);

export default class PathButtonAnim extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      //svg
      svgSize: new Animated.Value(50),
      svgScale: new Animated.Value(50),
      // heart
      heartColor: new Animated.Value(0),
      heartY: new Animated.Value(0),

      heartTransformY: new Animated.Value(0),
      heartTransformX: new Animated.Value(0),

    };
  }

  _onPressHert = () => {
    console.log("_onPressHert")
    this._svgScaleAnimation()
    this._heartColorAnimation()
    this._heartYAnimation()
    this._heartTransformXAnimation()
    this._heartTransformYAnimation()

    this.setState({
      checked: !this.state.checked
    })
  }


  _svgScaleAnimation = () => {
    const { checked, svgScale } = this.state
    Animated.timing(svgScale, {
      toValue: checked ? 0 : 100, //interpolate 値
      duration: duration,
      useNativeDriver: false,
    }).start();
  }

  _heartColorAnimation = () => {
    const { checked, heartColor } = this.state
    Animated.timing(heartColor, {
      toValue: checked ? 0 : 100, //interpolate 値
      duration: duration,
      useNativeDriver: false,
    }).start();
  }

  _heartYAnimation = () => {
    const { checked, heartY } = this.state
    Animated.timing(heartY, {
      toValue: 100, //interpolate 値
      duration: duration,
      useNativeDriver: false,
    }).start(() => {
      heartY.setValue(0)
    });
  }

  _heartTransformYAnimation = () => {
    const { checked, heartTransformY } = this.state
    Animated.timing(heartTransformY, {
      toValue: 100, 
      duration: duration,
      useNativeDriver: false,
    }).start(() => {
      heartTransformY.setValue(0)
    });
  }
  _heartTransformXAnimation = () => {
    const { checked, heartTransformX } = this.state
    Animated.timing(heartTransformX, {
      toValue: 100, 
      duration: duration,
      useNativeDriver: false,
    }).start(() => {
      heartTransformX.setValue(0)
    });
  }
  
  /************************************
  * Render
  *************************************/
  render() {
    const { svgSize, svgScale, heartColor, heartY, heartTransformY, heartTransformX } = this.state


    // 色の変遷
    const _interHeartColor = heartColor.interpolate({
      inputRange: [0, 100],
      outputRange: ['#ddd', '#aa3333'],
    });

    // サイズ scale で変更してみる..?
    const _interPolateSvgSize = svgSize.interpolate({
      inputRange: [0, 10, 80, 100],
      outputRange: [100, 70, 110, 100],
    });
    const _interPolateSvgScale = svgScale.interpolate({
      inputRange: [0, 100],
      outputRange: [0.8, 1],
    });

    //move
    const _interPolateHeartY = heartY.interpolate({
      inputRange: [0, 70, 75, 80, 100],
      outputRange: [0, -15, 5, -3, 0]

    })
    //transform
    const _interPolateHeartTransformY = heartTransformY.interpolate({
      inputRange: [0, 75, 80, 100],
      outputRange: [1, 0.9, 1.1, 1]

    })
    const _interPolateHeartTransformX = heartTransformX.interpolate({
      inputRange: [0, 75, 80, 100],
      outputRange: [1, 1.3, 0.8, 1]
    })

    const dStyle = {
      transform: [
        { translateY: _interPolateHeartY },
        { scale: _interPolateSvgScale },
        { scaleX: _interPolateHeartTransformX },
        { scaleY: _interPolateHeartTransformY },
      ],
    };

    return (
      <AnimatedSvg height={100} width={100}  viewBox='-10 -10 120 120'  style={dStyle} >
        <AnimatedPath

          d={path2}
          fill={_interHeartColor}
          stroke="red"
          strokeWidth={5}
          onPress={this._onPressHert}
        />

      </AnimatedSvg>
    );
  }
}

const styles = StyleSheet.create({
});

