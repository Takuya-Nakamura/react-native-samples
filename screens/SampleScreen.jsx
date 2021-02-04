import React, { Component } from 'react';
import CircleButtonAnim from '../components/CircleButtonAnim'
import PathButtonAnim from '../components/PathButtonAnim'
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

//animated elements
const duration = 200
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default class SampleScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // circle action
      cricleStroke: new Animated.Value(2.5),
      circleSize: new Animated.Value(50),
      circleColor: new Animated.Value(0),

      //
      rippleOpacity: new Animated.Value(0),
      rippleSize: new Animated.Value(0),

    };
  }

  _onClickCircle = () => {
    this._sizeAnimation()
    this._strokeAnimation()
    this._colorAnimation()
    this._rippleSizeAnimation()
    this._rippleOpacityAnimation()
  }

  _sizeAnimation = () => {
    Animated.timing(this.state.circleSize, {

      toValue: 100, //interpolate 
      duration: duration,
    }).start();
  }
  _strokeAnimation = () => {
    Animated.timing(this.state.cricleStroke, {
      toValue: 2.5,
      duration: duration,
    }).start();
  }
  _colorAnimation = () => {
    Animated.timing(this.state.circleColor, {
      toValue: 100,
      duration: duration,
    }).start();
  }
  _rippleSizeAnimation = () => {
    Animated.timing(this.state.rippleSize, {
      toValue: 100,
      duration: 200,
    }).start();
  }
  _rippleOpacityAnimation = () => {
    Animated.timing(this.state.rippleOpacity, {
      toValue: 100,
      duration: 200,
    }).start();
  }
  /************************************
  * Render
  *************************************/
  render() {

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.item}>
          <CircleButtonAnim />
        </View>

        <View style={styles.item}>
          <PathButtonAnim />
        </View>


      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  item: {
    flex:1,
    // backgroundColor:"#ddd"
  }
});
