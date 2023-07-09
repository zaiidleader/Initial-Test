import React, { Component } from 'react'
import {BackHandler, StatusBar, Dimensions, StyleSheet, Text, View, Image, Alert, Platform, TouchableOpacity, AsyncStorage, ScrollView} from 'react-native'

import LinearGradient from 'react-native-linear-gradient'
import { allLogo } from '@Assets'
import { toDp } from '@percentageToDP'

let { width, height } = Dimensions.get('window')

import strings from '@Dictionary'

class NoConnection extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Image source={allLogo.imgNoConnection} style={styles.imgNoConnection} />
        <Text allowFontScaling={false} style={styles.title}>{strings.noConnection}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imgNoConnection: {
    width: toDp(100),
    height: toDp(100),
    tintColor: 'white',
    marginTop: toDp(-48)
  },
  title: {
    color: 'white',
    fontSize: toDp(16),
    marginTop: toDp(8)
  },

})


export default NoConnection
