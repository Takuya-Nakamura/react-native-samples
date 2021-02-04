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
} from 'react-native-svg';

//anim config
const duration = 200
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default class CircleButtonAnim extends Component {

  constructor(props) {
    super(props);
    this.state = {
      //
      checked: false,
      // circle
      cricleStroke: new Animated.Value(0),
      circleSize: new Animated.Value(50),
      circleColor: new Animated.Value(0),

      // ripple
      rippleOpacity: new Animated.Value(0),
      rippleSize: new Animated.Value(0),

    };
  }

  _onClickCircle = () => {
    
    //parallelではなくて実行してもそこそこ同期取れる
    this._sizeAnimation()
    this._strokeAnimation()
    this._colorAnimation()
    this._rippleSizeAnimation()
    this._rippleOpacityAnimation()

    this.setState({
      checked: !this.state.checked
    })

  }

  _sizeAnimation = () => {
    const {checked, circleSize} = this.state
    Animated.timing(circleSize, {
      toValue: checked ? 0 : 100, //interpolate 値
      duration: duration,
      useNativeDriver: false,
    }).start();
  }
  _strokeAnimation = () => {
    const {checked, cricleStroke} = this.state
    Animated.timing(cricleStroke, {
      toValue: checked? 0 : 5,
      duration: duration,
      useNativeDriver: false,
    }).start();
  }
  _colorAnimation = () => {
    const {checked, circleColor} = this.state
    Animated.timing(this.state.circleColor, {
      toValue:  checked ? 0 : 100,
      duration: duration,
      useNativeDriver: false,
    }).start();
  }
  _rippleSizeAnimation = () => {
    const {checked,rippleSize} = this.state
    Animated.timing(rippleSize, {
      toValue: 100,
      duration: duration,
      useNativeDriver: false,
    }).start(
      //同じアニメーションを繰り返す場合はここで初期化
      rippleSize.setValue(0)
    );

  }
  _rippleOpacityAnimation = () => {
    const {checked,rippleOpacity} = this.state
    Animated.timing(rippleOpacity, {
      toValue: 100,
      duration: duration,
      useNativeDriver: false,
    }).start(()=>{
      //同じアニメーションを繰り返す場合はここで初期化
      rippleOpacity.setValue(0)
    });

  }


  /************************************
  * Render
  *************************************/
  render() {
    const { cricleStroke, circleSize, circleColor, rippleOpacity, rippleSize } = this.state


    // 色の変遷
    const _interPolateColor = this.state.circleColor.interpolate({
      inputRange: [0, 100],
      outputRange: ['#aa3333', '#3333aa'],
    });

    // サイズ
    const _interPolateSize = this.state.circleSize.interpolate({
      inputRange: [0, 10, 90, 100],
      outputRange: [50, 10,  70, 60],
    });

    //  
    // 波紋
    const _interPolateRippleSize = this.state.rippleSize.interpolate({
      inputRange: [0, 50, 100],
      outputRange: [0, 100, 0],
    });

    const _interPolateRippleOpacity = this.state.rippleOpacity.interpolate({
      inputRange: [0, 50, 100],
      outputRange: [0, 0.5, 0],
    });


    return (
      <Svg height="300" width="300" viewBox="0 0 300 300" >
        <AnimatedCircle
          onPress={this._onClickCircle}
          cx="150"
          cy="150"
          r={_interPolateSize}
          stroke="blue"
          strokeWidth={cricleStroke}
          // fill="green"
          fill={_interPolateColor}
        />


        <AnimatedCircle
          onPress={this._onClickCircle}
          cx="150"
          cy="150"
          r={rippleSize}
          stroke="blue"
          strokeWidth={20}
          fill="blue"

          opacity={_interPolateRippleOpacity}

        />
      </Svg>
    );
  }
}

const styles = StyleSheet.create({
});

