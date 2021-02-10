import React, { Component } from 'react';
import { SafeAreaView, View, Text, StyleSheet, AsyncStorage } from 'react-native';
import * as Google from 'expo-google-app-auth'


/************************************
* const
*************************************/

const scopes = ['https://www.googleapis.com/auth/drive',];
const iosClientId = '182147206388-03r4vju7e2h8up4hfsgh35oldttoo73t.apps.googleusercontent.com'
const config = {
  behavior: 'web',
  iosClientId: iosClientId,
  scopes: scopes
}
const refreshUrl = 'https://www.googleapis.com/oauth2/v4/token'
const ssUrl = 'https://sheets.googleapis.com/v4/spreadsheets'

/************************************
* Class
*************************************/

export default class GoogleDriveScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      token: '',
      refreshToken: ''
    };
  }

  /************************************
  * Action
  *************************************/
  componentDidMount = () => {
    this.auth();
  }

  onPressAuth = () => {
    this.signInWithGoogle()
  }

  onPressClear = () => {
    this.clearToken('refreshToken')
  }

  onPressCreateSpredSeet = async () => {
    const id = await this.ceateSpredSheet()
    this.updateSpredSheet(id)
  }


  /************************************
  * SpredSheet
  *************************************/
  headers = () => {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.state.token}`
    };
  }

  ceateSpredSheet = async () => {
    console.log("ceateSpredSheet")

    const method = 'post'
    const headers = this.headers()
    const body = {}
    // create
    return fetch(ssUrl, { method, headers, body })
      .then(response => response.json())
      .then(data => {
        return data.spreadsheetId
      })
  }

  updateSpredSheet = async (file_id) => {
    console.log("updateSpredSheet")

    const method = 'post'
    const headers = this.headers()
    const body = JSON.stringify(updateBody)
    const url = `${ssUrl}/${file_id}:batchUpdate`

    return fetch(url, { method, headers, body })
      .then(response => response.json())
      .then(data => console.log(data))
  }


  /************************************
  * Auth 
  *************************************/
  auth = async () => {
    // refresh tokenがstorageに保存してあったらrefreshを実行
    // なかったらauth認証を実行
    // refreshの場合はtokenをstateに保存
    // 認証後は storageにregreshを保存
    // stateにtokenとrefresh_tokenを保存

    const refreshToken = await this.getData('refreshToken')
    this.setState({ refreshToken: refreshToken })

    if (refreshToken) {
      this.refreshWithGoogle(refreshToken)
    } else {
      this.signInWithGoogle()
    }
  }

  // Google OAuth認証メソッド
  signInWithGoogle = async () => {
    try {
      const result = await Google.logInAsync(config);
      if (result.type === 'success') {
        this.setData('refreshToken', result.refreshToken)
        this.setState({
          token: result.accessToken,
          refreshToken: result.refreshToken
        })
      }
    } catch (e) {
      console.log(e);
    }
  }

  refreshWithGoogle = async (refreshToken) => {
    console.log("refreshWithGoogle")
    const obj = {
      refresh_token: refreshToken,
      client_id: iosClientId,
      grant_type: 'refresh_token',
    };

    const method = 'post';
    const body = Object.keys(obj).map((key) => key + "=" + encodeURIComponent(obj[key])).join("&");
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    };

    fetch(refreshUrl, { method, headers, body })
      .then(response => response.json())
      .then(data => {
        this.setData('refreshToken', data.access_token)
        this.setState({
          token: data.access_token,
        })
      })
  }

  //TODO:logoutした方が良い?
  clearToken = async (key) => {
    const val = await AsyncStorage.removeItem(key);
    this.setState({ refreshToken: null })
  }

  /************************************
  * Storage
  *************************************/
  setData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log(error);
    }
  }

  getData = async (key) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.log(error);
    }
  }


  /************************************
  * Render
  *************************************/
  render() {
    const { refreshToken,  } = this.state
    console.log(this.state)

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.item}>
          <Text onPress={this.onPressAuth}>Get Token</Text>
        </View>

        <View style={styles.item}>
          <Text onPress={this.onPressClear}>Clear Token</Text>
        </View>

        <View style={styles.item}>
          <Text onPress={() => this.refreshWithGoogle(refreshToken)}>refresh Token</Text>
        </View>

        <View style={styles.item}>
          <Text onPress={this.onPressCreateSpredSeet}>Create Spredsheet</Text>
        </View>

      </SafeAreaView>
    );
  }
} //class


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  item: {
    height: 100,
  }
});

const updateBody = {
  "requests": [
    //タイトルの変更
    {
      "updateSpreadsheetProperties": {
        "properties": {
          "title": "サンプルスプレッドシート"
        },
        "fields": "title"
      }
    },//updateSpreadsheetProperties
    //セルに入力
    {
      "updateCells": {
        "start": {
          "sheetId": 0,
          "rowIndex": 0,
          "columnIndex": 0
        },
        "fields": "userEnteredValue",
        "rows": [
          // 1行目
          {
            "values": [
              {
                "userEnteredValue": {
                  "stringValue": "A1"
                }
              },
              {
                "userEnteredValue": {
                  "stringValue": "B1"
                }
              },

            ]
          },
          // 2行目
          {
            "values": [
              {
                "userEnteredValue": {
                  "stringValue": "A2"
                }
              },
              {
                "userEnteredValue": {
                  "stringValue": "B2"
                }
              },
            ]//values
          },

        ]//rows
      }
    }//updateCells

  ] //requests
}//body