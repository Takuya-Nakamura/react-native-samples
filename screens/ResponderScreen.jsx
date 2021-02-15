import React, { Component } from 'react';
import CircleButtonAnim from '../components/CircleButtonAnim'
import PathButtonAnim from '../components/PathButtonAnim'
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  StyleSheet,
  Animated,
  ScrollView,
  PanResponder
} from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';


const list = [...Array(30)].map((data, index) => index)


export default class ResponderScreen extends Component {

  /**
   * GestureResponderとPanResonderの調査
   * GestureResponderは
   * ViewをResponderにした時に操作に合わせて以下のような情報が取れる。
   * ・要素に対しての直前にタッチした位置座標
   * ・ルート要素に対しての直前にタッチした位置座標
   * https://reactnative.dev/docs/gesture-responder-system
   * スワイプ的に動かしても取れるので、どこを触ったのか、というのがわかる。
   * 
   * 
   * どの程度スクロールしたとか、指の移動用とかは計算すればとれるが、
   * それを取りやすくなっているのがPanResponderっぽい
   * 
   * 画面・要素に注目しているのがGestureHandler?
   * 指に注目しているのが、Panresponder?
   * 
   * ここをさらに上手くコントロールしているのがgesture-handlerらしい..
   * https://saitoxu.io/2020/09/react-native-android
   * 
   * 
   * 受け取ったものをAnimated.Valueに紐付けるのは Animated.eventがやりやすいらしい。これも調べる必要あり。
   * https://reactnative.dev/docs/animated
   * Animated.eventは native.eventの値とanimatedValueをmappingすることが出来る
   * 
  */


  pan = new Animated.ValueXY();

  constructor(props) {
    super(props);
    this._innerScrollViewRef = React.createRef();
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      // onPanResponderGrantと onPanResponderReleaseで以下をやらないと、
      //ドラッグ時にドラッグ位置と要素の位置がずれる。
      // 移動時の基準位置とかの初期化なのかなと
      //ここの仕組みがよく分かってないが..必要
      onPanResponderGrant:  () => {
        // setOffsetは..pan gestureの開始の補正などに便利らしい
        
        this.pan.setOffset({
          x: this.pan.x._value,
          y: this.pan.y._value
        });
      },

      onPanResponderRelease: () => {
        // オフセットをゼロにリセットします
        this.pan.flattenOffset();
      },
      // Animate Eventにevent, gestureStateの２つparamが渡される
      onPanResponderMove: Animated.event([
        null, //eventの
        { dx: this.pan.x, dy: this.pan.y }
      ]),
      // onPanResponderRelease: this._handlePanResponderEnd,
      // onPanResponderTerminate: this._handlePanResponderEnd,
    });

    
  }



  onResponderGrant = (event) => {
    console.log('onResponderGrant')
  }


  /************************************
  * Render
  *************************************/



  render() {
    const dStyle= {
      transform: [{ translateX: this.pan.x }, { translateY: this.pan.y }]
    }
    return (
      <SafeAreaView style={styles.container}>


        <Animated.View
          style={[styles.box, dStyle]}
          {...this._panResponder.panHandlers}          
        >
          <Text>Drag Drop 2</Text>
        </Animated.View>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {

    width: 200,
    height: 200,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }

});
