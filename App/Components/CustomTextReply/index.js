import React, { Component } from 'react'
import {BackHandler, TextInput, Dimensions, StyleSheet, Text, View, Image, Alert, Platform, TouchableOpacity, AsyncStorage, ScrollView} from 'react-native'

import { allLogo } from '@Assets'
import { toDp } from '@percentageToDP'

let { width, height } = Dimensions.get('window')

class CustomTextReply extends Component {

  constructor(props) {
    super(props);
    this.state = {
      darkMode: false,
    }
  }

  async componentDidMount() {
    let darkMode = await AsyncStorage.getItem('darkMode')
    this.setState({darkMode: JSON.parse(darkMode)})
  }

  render() {
    const {
        title,
        error,
        maxLength,
        value,
        inputRef,
        onChangeText,
        onSubmitEditing,
        placeholder,
        secureTextEntry,
        onChangeSecure,
        type
    } = this.props
    return (
      <View style={styles.viewForm}>
        <View style={[styles.viewText, error !== '' && styles.viewError, {height: Platform.OS === 'android' ? toDp(60) :  toDp(48)}]}>
          <TextInput
            ref={r => inputRef && inputRef(r)}
            onChangeText={text => onChangeText(text)}
            onSubmitEditing={() => onSubmitEditing && onSubmitEditing()}
            maxLength={maxLength}
            autoCapitalize={'none'}
            underlineColorAndroid={'transparent'}
            value={value}
            secureTextEntry={secureTextEntry}
            style={[styles.textInput, {color: 'white'}]}
            placeholder={placeholder}
            placeholderTextColor={'grey'}
            {...this.props}
            multiline
            numberOfLines={3}
            textAlignVertical={'top'}
          />
        </View>
        <View style={styles.viewFooter}>
          {error !== '' ? <Text style={styles.textError}>{error}</Text> : <View />}
          <Text style={styles.textCount}>{value.length} / 100</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  viewForm: {
    width: '100%',
    //height: toDp(67)
  },
  textTitle: {
    fontSize: toDp(18),
    color: '#9B9F95',
    letterSpacing: toDp(0.6),
    height: toDp(24),
    marginBottom: toDp(2)
  },
  viewText: {
    width: '100%',
    borderRadius: toDp(8),
    //backgroundColor: '#F6F7F4',
    //paddingHorizontal: toDp(10),
    borderWidth: toDp(1),
    borderColor: '#F6F7F4'
  },
  textInput: {
    flex: 1,
    fontSize: toDp(16),
    color: 'white',
    marginHorizontal: Platform.OS === 'android' ? toDp(8) : toDp(8),
    marginTop: toDp(8),
    fontWeight: '400',
  },
  textError: {
    fontSize: toDp(14),
    color: '#F5493C',
    letterSpacing: toDp(0.05)
  },
  viewError: {
    //marginTop: toDp(4),
    borderColor: '#F5493C',
    borderWidth: toDp(2)
  },
  customRow: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'red'
  },
  touchEye: {
    position: 'absolute',
    right: toDp(8),
    bottom: toDp(8)
  },
  icEye: {
    width: toDp(20.3),
    height: toDp(20),
    tintColor: '#B0BEC5',
    resizeMode: 'contain'
  },
  viewFooter: {
    //marginTop: toDp(4),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textCount: {
    color: 'white'
  }
})


export default CustomTextReply
