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
  Flatform,
  FlatList,
  Presable,
  ActivityIndicator,
} from 'react-native'

import { allLogo } from '@Assets'
import { toDp } from '@percentageToDP'

import CustomTextArea from '@CustomTextArea'
import GetLocation from 'react-native-get-location'

import { username } from 'react-lorem-ipsum'
import MockDataUsers from '../../Helper/MockData/MOCK_DATA_USERS.json'

import strings from '@Dictionary'
import {
  getGeocode,
  postPosting
}  from '@Apis'

const { width, height } = Dimensions.get('window')
type Props = {}
const NewPost = (props) => {

  const [state, setState] = useState({
    loading: false,
    search: '',
    errorSearch: '',
    desciption: '',
    errorDesciption: '',
    location: ''
  })

  useEffect(() => {
    loadLocation()
  }, [])

  const loadLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 10000,
    }).then(location => {
      console.log(location);
      getGeocode('?latlng='+location.latitude+','+location.longitude+'&key=AIzaSyBsLfAH7jg-kUJBiwrjZyfpLsR3ELcCXG4').then(response => {
        console.log('response', response);
        setState(state => ({...state, location: response.data?.plus_code?.compound_code, loading: false}))
      }).catch(error => {
        console.log('error', error);
        setState(state => ({...state, loading: false}))
      })
    }).catch(error => {
      console.log(error)
    })
  }

  const post = () => {
    setState(state => ({...state, loading: true}))
    let data = {
      "id": Math.floor((Math.random() * 100) + 1),
      "fullname": username(),
      "image_url": MockDataUsers[Math.floor((Math.random() * 28) + 1)].image_url,
      "created_at": new Date(),
      "description": state.desciption,
      "location": state.location,
      "count_like": 0,
      "count_comment": 0
    }
    postPosting(data).then(response => {
      console.log('response', response);
      setState(state => ({...state, loading: false}))
      props.navigation.goBack()
    }).catch(error => {
      console.log('error', error);
      setState(state => ({...state, loading: false}))
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor='white' barStyle="light-content" />

      <View style={styles.header}>
        <View style={styles.viewHeader}>
          <TouchableOpacity style={styles.touchBack} onPress={() => props.navigation.goBack()}>
            <Image source={allLogo.icBack} style={styles.icBack} />
          </TouchableOpacity>
          <Text style={styles.textTitle}>{strings.newPost}</Text>
          <View style={styles.viewRight}>

          </View>
        </View>
      </View>

      <View style={styles.line} />

      <View style={styles.viewSearch}>
        <CustomTextArea
          title={strings.newPost}
          placeholder={strings.whatDo}
          error={state.errorDesciption}
          value={state.desciption}
          onChangeText={(desciption) => {
            setState(state => ({...state, desciption}))
            if(desciption.trim() === '') {
              setState(state => ({...state, errorDesciption: strings.errorEmtpy}))
            } else {
              setState(state => ({...state, errorDesciption: ''}))
            }
          }}
          autoCapitalize={'sentences'}
          returnKeyType={'next'}
          maxLength={100}
        />
      </View>

      {
        state.desciption.length === 0 ?
          <View style={[styles.touchPost, {borderColor: 'grey'}]}>
            <Text style={[styles.textPost, {color: 'grey'}]}>{strings.post}</Text>
          </View>
        :
          <TouchableOpacity style={styles.touchPost} onPress={() => post()}>
            {
              state.loading ?
                <ActivityIndicator size="small" color="#269FE8" />
              :
                <Text style={styles.textPost}>{strings.post}</Text>
            }
          </TouchableOpacity>
      }


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
    backgroundColor: '#181818',
    paddingBottom: toDp(12),
    paddingTop: toDp(12)
  },
  viewHeader: {
    width,
    height: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: toDp(12),
  },
  touchBack: {
    width: toDp(80),
    padding: toDp(4)
  },
  icBack: {
    width: toDp(20),
    height: toDp(17.08),
    tintColor: 'white'
  },
  textTitle: {
    color: 'white',
    fontSize: toDp(18),
    fontWeight: '700'
  },
  viewRight: {
    width: toDp(80),
    flexDirection: 'row',
    alignItems: 'center'
  },
  icPlus: {
    width: toDp(28),
    height: toDp(28)
  },
  icMoreVertical: {
    width: toDp(32),
    height: toDp(8),
    marginLeft: toDp(12)
  },
  viewSearch: {
    width: '92.5%',
    marginHorizontal: toDp(16),
    marginTop: toDp(16)
  },
  containerItem: {
    width: '90%',
    height: toDp(82),
    backgroundColor: 'white',
    marginHorizontal: toDp(12),
    marginBottom: toDp(12),
    borderRadius: toDp(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  viewUser: {
    flexDirection: 'row',
    marginLeft: toDp(16)
  },
  viewNameDate: {
    justifyContent: 'center',
    marginLeft: toDp(16),
  },
  userImage: {
    width: toDp(48),
    height: toDp(48)
  },
  textName: {
    fontSize: toDp(16),
    color: '#363636',
    fontWeight: '600',
  },
  textDate: {
    marginTop: toDp(4),
    fontSize: toDp(14),
    color: '#4F5E7B',
    fontWeight: '400'
  },
  viewTime: {
    width: toDp(48),
    height: toDp(48),
    margin: toDp(12),
    alignItems: 'center'
  },
  textTime: {
    fontSize: toDp(12),
    color: '#333333',
    fontWeight: '400'
  },
  viewNotif: {
    width: toDp(24),
    height: toDp(24),
    borderRadius: toDp(12),
    backgroundColor: '#EB5757',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: toDp(6)
  },
  textNotif: {
    fontSize: toDp(12),
    color: 'white',
    fontWeight: '700'
  },
  line: {
    width,
    height: toDp(1),
    backgroundColor: '#E2E2E23D',
    marginTop: toDp(16),
  },
  touchPost: {
    width: '92.5%',
    height: toDp(48),
    marginHorizontal: toDp(16),
    borderWidth: toDp(2),
    borderColor: '#269FE8',
    marginTop: Platform.OS === 'ios' ? toDp(92) : toDp(128),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: toDp(4)
  },
  textPost: {
    fontSize: toDp(16),
    color: '#269FE8',
    fontWeight: 'bold'
  }
})

export default NewPost
