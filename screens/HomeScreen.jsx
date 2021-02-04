import React, { Component } from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  StyleSheet
} from 'react-native';
import { TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';

/* テストデータ */
const list = [
  { screen: 'Sample' },
  { screen: 'SortableList' },
];

export default class HomeScreen extends Component {

  navigate = (screen) => {
    this.props.navigation.navigate(screen)
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.listBox}
          data={list}
          renderItem={({ item }) => {
            return (
              <TouchableWithoutFeedback
                style={styles.listItem}
                onPress={() => { this.navigate(item.screen) }}
              >
                <Text style={styles.listItem__text}>{item.screen}</Text>
              </TouchableWithoutFeedback>
            );
          }}
          keyExtractor={item => item.todo}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItem: {
    justifyContent: 'center',
    alignItems: 'center',
    
    height: 64,
    width: 200,
    marginTop: 16,
    padding: 16,
    borderColor: 'gray',
    borderWidth: 1,
  },
  listItem__text:{
    fontSize: 24,
  }
});
