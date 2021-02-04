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

// import SortableList from 'react-native-sortable-list';
import DraggableFlatList from 'react-native-draggable-flatlist'
import { TouchableOpacity } from 'react-native-gesture-handler';

const list =  [...Array(20)].map((data, index) => index)

export default class SortableListScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      itemScale: new Animated.Value(1),
      list: list
    }
  }


  _itemOnLongPress = (drag) => {
    this._itemTransformAnimation();
    drag();
  }

  _onDragEnd = ({ data }) => {
    //設定後のデータが帰ってくる
    //必要ならここでorderをDBに保存などの処理を行う
    this.setState({ list: data })
  }


  /************************************
  * Animation
  *************************************/
  _itemTransformAnimation = () => {
    const { checked, itemScale } = this.state
    Animated.timing(itemScale, {
      toValue: 1.1,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {

    });
  }

  /************************************
  * Render
  *************************************/

  renderItem = ({ item, index, drag, isActive }) => {
    const activeStyle = {
      backgroundColor:"#ffdddd",
      borderColor: "red",
      transform: [
        { scale: this.state.itemScale },
      ],
    };
    const dStyle = isActive ? activeStyle : []
    return (
      <TouchableOpacity style={[styles.listItem, dStyle]} onLongPress={() => this._itemOnLongPress(drag)}>
        <Text>  item {item}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <DraggableFlatList
          style={styles.list}
          data={this.state.list}
          keyExtractor={(item, index) => `draggable-item-${index}`}
          renderItem={this.renderItem}
          onDragEnd={this._onDragEnd}
        />


        {/* <SortableList
          style={styles.list}
          data={list}
          // renderItem={this.renderItem}
          renderRow={this.renderItem}
          showsVerticalScrollIndicator={true}
          onChangeOrder={this.onChangeOrder}
        /> */}


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
  list: {
    flex: 1,
    width: "100%",
    padding: 20,

  },
  listItem: {
    width: 200,
    height: 50,
    padding: 10,

    borderWidth: 2,
    marginBottom: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'

  }
});
