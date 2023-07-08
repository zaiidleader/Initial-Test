import React, { Component } from 'react'
import {BackHandler, TextInput, Dimensions, StyleSheet, Text, View, Image, Alert, Platform, TouchableOpacity, AsyncStorage, ScrollView} from 'react-native'

import { allLogo } from '@Assets'
import { toDp } from '@percentageToDP'

let { width, height } = Dimensions.get('window')

class CustomTextArea extends Component {

  constructor(props) {
    super(props);
    this.state = {
      darkMode: false
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
        {
          title !== '' && <Text textType='regular' style={styles.textTitle}>{title}</Text>
        }
        <View style={[styles.viewText, error !== '' && styles.viewError, {height: Platform.OS === 'android' ? toDp(100) :  toDp(90)}]}>
          <TextInput
            ref={r => inputRef && inputRef(r)}
            onChangeText={text => onChangeText(text)}
            onSubmitEditing={() => onSubmitEditing && onSubmitEditing()}
            maxLength={maxLength}
            autoCapitalize={'none'}
            underlineColorAndroid={'transparent'}
            value={value}
            secureTextEntry={secureTextEntry}
            style={[styles.textInput, {color: this.state.darkMode ? 'white' : '#383B34'}]}
            placeholder={placeholder}
            placeholderTextColor={'grey'}
            {...this.props}
            multiline
            numberOfLines={3}
            textAlignVertical={'top'}
          />
        </View>
        {error !== '' && <Text style={styles.textError}>{error}</Text>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  viewForm: {
    width: '100%',
    height: toDp(67)
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
    backgroundColor: '#F6F7F4',
    paddingHorizontal: toDp(10)
  },
  textInput: {
    flex: 1,
    fontSize: toDp(16),
    color: '#273238',
    marginHorizontal: Platform.OS === 'android' ? toDp(-4) : 0,
    marginTop: toDp(8),
    fontWeight: '400',
  },
  textError: {
    marginTop: toDp(4),
    fontSize: toDp(14),
    color: '#F5493C',
    letterSpacing: toDp(0.05)
  },
  viewError: {
    marginTop: toDp(4),
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
  }
})


export default CustomTextArea
