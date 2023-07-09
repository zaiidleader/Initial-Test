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

import {useNetInfo} from "@react-native-community/netinfo";
import NoConnection from '@NoConnection'

import moment from 'moment'
import CustomTextReply from '@CustomTextReply'
import TextAvatar from 'react-native-text-avatar'
import { username } from 'react-lorem-ipsum'

import localizationId from 'moment/locale/id'
import localizationEn from 'moment/locale/en-in'

import MockDataUsers from '../../Helper/MockData/MOCK_DATA_USERS.json'
import {database} from '../../Configs/firebase'
import strings from '@Dictionary'

import {
  postReply,
  patchPosting,
  getReply
}  from '@Apis'

const { width, height } = Dimensions.get('window')
type Props = {}
const ReplyPost = (props) => {

  const netInfo = useNetInfo();
  const [state, setState] = useState({
    item: props.navigation.state.params.item,
    loading: true,
    loadingReply: false,
    search: '',
    errorSearch: '',
    desciption: '',
    errorDesciption: '',
    arrayData: [],
  })

  useEffect(() => {
    console.log('item', props.navigation.state.params.item);
    realtimeReply()
  }, [])

  const realtimeReply = () => {
    database.ref('/reply').on('value', querySnapShot => {
      if(querySnapShot.val() !== null) {
        let data = Object.values(querySnapShot.val());
        let arrayData = []
        for (var i = 0; i < data.length; i++) {
          if(data[i].id_post === props.navigation.state.params.item.id_post) {
            arrayData.unshift(data[i])
          }
        }
        setState(state => ({...state, arrayData, loading: false}))
      } else {
        setState(state => ({...state, arrayData: [], loading: false}))
      }
    })
  }

  const loadReply = () => {
    getReply().then(response => {
      console.log('response', response);
      let data = Object.values(response.data);
      let arrayData = []
      for (var i = 0; i < data.length; i++) {
        if(data[i].id_post === props.navigation.state.params.item.id_post) {
          arrayData.unshift(data[i])
        }
      }
      setState(state => ({...state, arrayData, loading: false}))
    }).catch(error => {
      console.log('error', error);
      setState(state => ({...state, loading: false}))
    })
  }

  const post = () => {
    setState(state => ({...state, loadingReply: true}))
    let data = {
      "id": Math.floor((Math.random() * 100) + 1),
      "id_post": props.navigation.state.params.item.id_post,
      "fullname": username(),
      "image_url": MockDataUsers[Math.floor((Math.random() * 28) + 1)].image_url,
      "created_at": new Date(),
      "description": state.desciption,
    }
    postReply(data).then(response => {
      console.log('response', response);
      setState(state => ({...state, loadingReply: false}))
    }).catch(error => {
      console.log('error', error);
      setState(state => ({...state, loadingReply: false}))
    })

    let body = {
      "id": props.navigation.state.params.item.id,
      "fullname": props.navigation.state.params.item.fullname,
      "image_url": props.navigation.state.params.item.image_url,
      "created_at": props.navigation.state.params.item.created_at,
      "description": props.navigation.state.params.item.description,
      "location": props.navigation.state.params.item.location,
      "count_like": props.navigation.state.params.item.count_like,
      "count_comment": state.arrayData.length + 1,
    }
    patchPosting(body, props.navigation.state.params.item.id_post + '.json').then(response => {
      console.log('response', response);
      setState(state => ({...state, desciption: '', loadingReply: false}))
    }).catch(error => {
      console.log('error', error);
      setState(state => ({...state, loadingReply: false}))
    })
  }

  const renderHeader = () => {
    return (
      <View style={styles.viewSearch}>
        <View style={styles.viewUser}>
          <Image
            style={styles.imageUrl}
            source={{uri: state.item.image_url}}
          />
          <View style={styles.viewNameDate}>
            <View style={styles.viewSpace}>
              <Text style={styles.textName}>{state.item.fullname}</Text>
                {
                  state.language === 'en' ?
                    <Text style={styles.textDate}>{moment(state.item.created_at).locale("en-in", localizationEn).fromNow()}</Text>
                  :
                    <Text style={styles.textDate}>{moment(state.item.created_at).locale("id", localizationId).fromNow()}</Text>
                }
            </View>
            <Text style={[styles.textDate, {width: width * 0.7, marginTop: toDp(4)}]}>{state.item.location}</Text>
          </View>
        </View>
        <View style={styles.viewContent}>
          <Text style={styles.textDesc}>{state.item.description}</Text>
        </View>
      </View>
    )
  }

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.containerItem}>
        <View style={styles.header}>
          <View style={styles.viewUser}>
            <Image
              style={styles.imageUrl}
              source={{uri: item.image_url}}
            />
            <View style={styles.viewNameDate}>
              <View style={styles.viewSpace}>
                <Text style={styles.textName}>{item.fullname}</Text>
                {
                  state.language === 'en' ?
                    <Text style={styles.textDate}>{moment(item.created_at).locale("en-in", localizationEn).fromNow()}</Text>
                  :
                    <Text style={styles.textDate}>{moment(item.created_at).locale("id", localizationId).fromNow()}</Text>
                }
              </View>
              <Text style={[styles.textDate, {color: 'white',width: width * 0.7, marginTop: toDp(4)}]}>{item.description}</Text>
            </View>
          </View>
        </View>
        <View style={styles.lineRoot} />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor='#181818' barStyle={"light-content"} />

      <View style={styles.header}>
        <View style={styles.viewHeader}>
          <TouchableOpacity style={styles.touchBack} onPress={() => props.navigation.goBack()}>
            <Image source={allLogo.icBack} style={styles.icBack} />
          </TouchableOpacity>
          <Text style={styles.textTitle}>{strings.reply}</Text>
          <View style={styles.viewRight}>

          </View>
        </View>
      </View>

      <View style={styles.line} />

      {
        !netInfo.isConnected ?
          <NoConnection />
        :
        state.loading ?
          <View style={styles.viewLoadingCenter}>
            <ActivityIndicator size="large" color="white" />
          </View>
        :
          state.arrayData.length === 0 ?
            <View style={{flex: 1}}>
              {renderHeader()}
              <View style={styles.viewLoadingCenter}>
                <Text style={styles.textTitle}>{strings.dataEmpty}</Text>
              </View>
            </View>
          :
          <FlatList
            data={state.arrayData}
            renderItem={renderItem}
            ListHeaderComponent={() => renderHeader()}
            ListFooterComponent={() => <View style={{height: toDp(24)}} />}
          />
      }

      {
        netInfo.isConnected &&
        <View style={styles.viewCustomFooter}>
          <View style={styles.viewInput}>
            <CustomTextReply
              title={''}
              placeholder={strings.replyTo+' '+state.item.fullname}
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
          <View style={{width: toDp(16)}} />
          {
            state.desciption.length === 0 ?
              <View style={[styles.touchPost, {borderColor: '#F6F7F4', height: Platform.OS === 'ios' ? toDp(48) : toDp(60)}]}>
                <Text style={[styles.textPost, {color: '#F6F7F4'}]}>{strings.post}</Text>
              </View>
            :
              <TouchableOpacity style={[styles.touchPost, {height: Platform.OS === 'ios' ? toDp(48) : toDp(60)}]} onPress={() => post()}>
                {
                  state.loadingReply ?
                    <ActivityIndicator size="small" color="#269FE8" />
                  :
                    <Text style={styles.textPost}>{strings.post}</Text>
                }
              </TouchableOpacity>
          }
        </View>
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
    width: '100%',
    paddingHorizontal: toDp(16),
    marginTop: toDp(16),
    borderBottomWidth: toDp(1),
    borderBottomColor: '#E2E2E23D'
  },
  containerItem: {
    width: '100%',
    height: 'auto',
    paddingVertical: toDp(8),
    paddingHorizontal: toDp(16),
    borderBottomWidth: toDp(1),
    borderBottomColor: '#E2E2E23D',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  viewNameDate: {
    justifyContent: 'center',
    marginLeft: toDp(16),
  },
  userImage: {
    width: toDp(48),
    height: toDp(48)
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
  line2: {
    width: width,
    height: toDp(1),
    marginLeft: toDp(-16),
    backgroundColor: '#E2E2E23D',
    marginBottom: toDp(16)
  },

  viewSpace: {
    width: width * 0.8,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textName: {
    fontSize: toDp(18),
    color: 'white',
    fontWeight: '600',
  },
  textDate: {
    marginTop: toDp(4),
    fontSize: toDp(14),
    color: '#787878',
    marginRight: toDp(16)
  },
  viewUser: {
    flexDirection: 'row',
  },
  viewContent: {
    marginVertical: toDp(16),
  },
  textDesc: {
    fontSize: toDp(16),
    marginTop: toDp(4),
    color: 'white',
  },
  viewLoadingCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageUrl: {
    width: toDp(48),
    height: toDp(48),
    borderRadius: toDp(24),
    marginTop: toDp(4)
  },

  viewInput: {
    //width: '9',
    flex: 1,
    alignItems: 'center'
  },
  viewCustomFooter: {
    flexDirection: 'row',
    //alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: toDp(16),
    marginTop: toDp(8),
  },
  touchPost: {
    width: toDp(100),
    height: toDp(48),
    borderWidth: toDp(1),
    borderColor: '#269FE8',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: toDp(4)
  },
  textPost: {
    fontSize: toDp(16),
    color: '#269FE8',
    fontWeight: 'bold'
  },

})

export default ReplyPost
