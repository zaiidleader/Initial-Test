import React, { useRef, useEffect, useState } from 'react'
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  Text,
  Alert,
  ImageBackground,
  useWindowDimensions,
  ScrollView,
  StatusBar,
  Flatform
} from 'react-native'

import { allLogo } from '@Assets'
import { toDp } from '@percentageToDP'

import NavigatorService from '@NavigatorService'
import Modal from 'react-native-modal'

import Home from './Home'

const { width, height } = Dimensions.get('window')
type Props = {}
const Homepage = (props) => {

  const [state, setState] = useState({
    search: '',
    errorSearch: '',
    modalVisibleMenu: false,
  })


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor='white' barStyle={Platform.OS === 'ios' ? "light-content" : "dark-content"} />
      {
        Platform.OS === 'android' && <View style={{height: toDp(16)}} />
      }
      <View style={styles.content}>
        <Home />
      </View>



    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818'
  },
  header: {
    width,
    height: 'auto',
    paddingHorizontal: toDp(12),
    //backgroundColor: '#FFFFFF',
    //backgroundColor: 'cyan',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoHeader: {
    width: toDp(48),
    height: toDp(48),
    //tintColor: 'white'
  },
  touchMenu: {
    width: toDp(40),
    height: toDp(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  icMenu: {
    width: toDp(32),
    height: toDp(26)
  },
  viewSearch: {
    //width: '60%',
    width: toDp(234),
    marginHorizontal: toDp(12)
  },
  content: {
    flex: 1,
  },
  footer: {
    width,
    height: toDp(83),
    borderTopColor: '#11111180',
    borderTopWidth: toDp(0.5),
    backgroundColor: 'white',
    flexDirection: 'row'
  },
  touchFooter: {
    flex: 1,
    width: toDp(75),
    height: toDp(71),
  },
  leftModal: {
    width: toDp(347),
    marginLeft: 0,
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: '#FFFFFF',
  },
  containerModal: {
    flex: 1,
  },
  headerModal: {
    flexDirection: 'row',
    marginLeft: toDp(12),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: toDp(50),
    height: toDp(50)
  },
  viewNameDate: {
    marginLeft: toDp(16),
  },
  textName: {
    fontSize: toDp(18),
    color: '#363636',
    fontWeight: '600',
  },
  textProfile: {
    marginTop: toDp(2),
    fontSize: toDp(14),
    color: '#3DB799',
    fontWeight: '600',
  },
  touchClose: {
    padding: toDp(4),
    marginRight: toDp(8)
  },
  icClose: {
    width: toDp(24),
    height: toDp(24)
  },
  touchEmergency: {
    width: toDp(323),
    height: toDp(44),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAE6E3',
    flexDirection: 'row',
    borderRadius: toDp(10),
    marginHorizontal: toDp(12),
    marginTop: toDp(32)
  },
  icEmergency: {
    width: toDp(24),
    height: toDp(24)
  },
  textEmergency: {
    fontSize: toDp(16),
    color: '#EB5757',
    fontWeight: '600',
    marginLeft: toDp(8)
  },
  touchMenuModal: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: toDp(12),
    marginTop: toDp(24)
  },
  iconModal: {
    width: toDp(40),
    height: toDp(40)
  },
  textModal: {
    fontSize: toDp(18),
    color: '#363636',
    fontWeight: '600',
    marginLeft: toDp(8)
  },


})

export default Homepage
