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

// import SortableList from 'react-native-sortable-list';
import { TouchableOpacity } from 'react-native-gesture-handler';



const list = [...Array(30)].map((data, index) => index)

export default class StickyHeaderListScreen extends Component {

  /**
   * ScrollViewを縦横２つ設定するのは、表部分の動きは良いが
   * 固定ヘッダーがどうしても片方が実現出来ない。
   * ex 上ヘッダーを固定しても、横スクロールした時に一緒にscroll出来ない。
   *   refを使ってscrollToをすると、タイムラグが発生してしまう....
   * 
 */

  /**
   *  TODO:
   *  gestrueを取得して、scrollViewあるいはFlatListを動かすことを確認する
   * 
   *  ②のonScrollで複数のscrollを連携しようとすると、どうしても少しラグが発生する 
   *  scrollViewではgestureを受け取らないで、wrapperなりでgestureでscrollを受け取って、その値を複数のScrollViewに渡して
   *  実現するのが良さそう 
   *    
   * 
   * * gestureの取得→  react-native-swipe-gesturesを試す
   *   縦横のswipeは簡単に取得できたがのだが、結局手を話した時に移動量がでるので、
   *   ナチュラルにスクロール出来ない...
   *   ↓
   *   ReactNative Pan Responderを試して見るか..面倒なことになったが、
   *   これが理解出来ればドラッグアンドドロップも簡単!?
   *   
   *   ※斜めにscrollさせないようにするためにdirectionalLockEnabledをつかったがiOSは良いがandroidは、scrollしらしなくなった..
   * 
   *   
   *   ・PanResponder, Animated.eventでできそう..
   *    ⇒Animated.eventをonScrollで動かしたら、、やっぱりスクロールが終わってから動いてしまうので、だめ。PanResponderが必要..
   *    ScrollViewにPanResponderを設定出来るか...
   *    移動量を逆方向に動かしたい場合、どうすればよいのか.. Animated.eventではない形Animated.timingなどでtoValueを変換すればよいか..
   *    ⇒
   *    scrollViewでpanresponderを設定してしまうと、途中からscrollViewにscrollイベントを奪われてしまう。
   *    全部アニメーションで実現するのが良いかも..そうすると長いスクロール、の慣性スクロールとかが取得できない..
   * 
   * 
   *   ②のonScrollで別scrollのRefのscrollToを設定する方法でanimated:falseを設定したらかなり違和感なく動いた。これでいく
   *   Androidはちょっと連携先が遅れる。ちょっとだけ..
   */

  scrollX = new Animated.Value(0)
  constructor(props) {
    super(props);
    this.innerScrollViewRef = React.createRef();

  
    this.state = {
      list: list,
      backgroundColor: 'red'
    }

  }




  /************************************
  * Render
  *************************************/

  renderVerticalList = () => {
    const { list } = this.state

    return (
      <View>
        {list.map((item) => {
          return (
            <TouchableOpacity style={styles.listItem}>
              <Text> item {item}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    );
  };

  renderVerticalHeader = () => {
    return (
      <View style={styles.vheader}>
        {list.map((item, index) => {
          return (
            <TouchableOpacity style={styles.listHeader}>
              <Text> header {index}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }


  renderHorizontalHeader = () => {    
    const dStyle = {
      transform: [{ translateX: this.scrollX }]
    }

    return (
      <ScrollView 
        style={[styles.hheader]} 
        
        horizontal={true}
        ref={this.innerScrollViewRef}
      >
        <View style={[styles.listHeader,{ backgroundColor: '#aacccc' }]}></View>
        {list.map((item, index) => {
          return (
            <TouchableOpacity style={[styles.listHeader, { backgroundColor: '#aacccc' }]}>
              <Text> header {index}</Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    )
  }
  

  render() {

    return (
      <SafeAreaView style={styles.container}>

        <View style={{
          position:'absolute',
          width:100,
          height:48,
          left:0,
          top:0,
          zIndex:10,
          backgroundColor:"white",
          borderBottomWidth:0.5,
          borderRightWidth:0.5,
        }}
        ></View>
        {this.renderHorizontalHeader()}
        <ScrollView bounces={false} style={{overflow:'hidden'}}>
            {this.renderVerticalHeader()}

          <ScrollView
            style={[styles.scroll, styles.innerScrollView]}
            bounces={false}
            horizontal={true}
            scrollEventThrottle={1}
            onScroll={(e)=>{
              // console.log(e.nativeEvent.contentOffset.x)
              const node = this.innerScrollViewRef.current
              node.scrollTo({x:e.nativeEvent.contentOffset.x,y:e.nativeEvent.contentOffset.y, animated:false })
            }}

          >
            {this.renderVerticalList()}
            {this.renderVerticalList()}
            {this.renderVerticalList()}
            {this.renderVerticalList()}
            {this.renderVerticalList()}
            {this.renderVerticalList()}
            {this.renderVerticalList()}
            {this.renderVerticalList()}
            {this.renderVerticalList()}
            {this.renderVerticalList()}

          </ScrollView>
        </ScrollView>


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

  scroll: {
    flexDirection: 'row',

  },
  list: {
    flex: 1,
    width: "100%",
    padding: 20,

  },
  listItem: {
    width: 100,
    height: 50,
    padding: 10,

    borderWidth: 0.5,
    // marginBottom: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'

  },
  listHeader: {
    width: 100,
    height: 50,
    padding: 10,
    backgroundColor: '#ffdddd',
    
    borderWidth: 0.5,
  },
  vheader: {
    position: 'absolute',
    left: 0,
    
    // zIndex: 10,

  },
  hheader: {
    flexDirection: 'row',
    borderWidth: 0.5,
    // position: 'absolute',
    // left: 100,
    // top: 0,
    // zIndex: 20,
  },

  innerScrollView: {
    // position: 'absolute',
    top: 0,
    left: 100,

  }
});
