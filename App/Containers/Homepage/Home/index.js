import React, { useEffect, useRef, useState } from 'react'
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  ImageBackground,
  ActivityIndicator,
  Alert,
  ScrollView,
  Linking,
  RefreshControl,
} from 'react-native'

import { allLogo } from '@Assets'
import { toDp } from '@percentageToDP'

import Modal from 'react-native-modal'
import NavigatorService from '@NavigatorService'
import LinearGradient from 'react-native-linear-gradient'

import TextAvatar from 'react-native-text-avatar'
import moment from 'moment'

import {getPosting}  from '@Apis'

import {database} from '../../../Configs/firebase'

const { width, height } = Dimensions.get('window')
type Props = {}
const Home = (props) => {

  const refToast = useRef()
  const [state, setState] = useState({
    loading: true,
    modalVisible: false,
    arrayData: [],
  })

  useEffect(() => {
    realtimePosting()
  }, [])

  const realtimePosting = () => {
    database.ref('/posting').on('value', querySnapShot => {
      let keys = Object.keys(querySnapShot.val());
      let data = Object.values(querySnapShot.val());
      let arrayData = []
      for (var i = 0; i < data.length; i++) {
        arrayData.unshift({
          id: data[i].id,
          id_post: keys[i],
          fullname: data[i].fullname,
          image_url: data[i].image_url,
          description: data[i].description,
          created_at: data[i].created_at,
          location: data[i].location,
          count_comment: data[i].count_comment,
          count_like: data[i].count_like,
        })
      }
      setState(state => ({...state, arrayData, loading: false}))
    })
  }

  const renderModal = () => {
    return (
      <Modal
        onBackdropPress={() => setState(state => ({...state, modalVisible: false}))}
        isVisible={state.modalVisible}
        style={styles.bottomModal}
      >
        <View style={styles.viewRootModal}>
          <View style={[styles.modalBox, {backgroundColor: '#FFFFFF'}]}>
            <View style={styles.viewCenter}>
              <View style={styles.lineModal} />
              <Text style={styles.titleModal}>Post Filer</Text>
            </View>
            <View style={styles.rowModal}>
              <Text style={styles.textModal}>See your post on</Text>
              <TouchableOpacity style={styles.touchButtonModal}>
                <Text style={styles.textButtonModal}>All Post</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.rowModal, {marginTop: toDp(20)}]}>
              <Text style={styles.textModal}>Privacy</Text>
              <TouchableOpacity style={styles.touchButtonModal}>
                <Text style={styles.textButtonModal}>Everyone</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </Modal>
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
                <Text style={styles.textDate}>{moment(item.created_at).fromNow()}</Text>
              </View>
              <Text style={[styles.textDate, {width: width * 0.7, marginTop: toDp(4)}]}>{item.location}</Text>
            </View>
          </View>
        </View>
        <View style={styles.viewContent}>
          <Text style={styles.textDesc}>{item.description}</Text>
          <View style={styles.viewFooter}>
            <TouchableOpacity style={styles.touchRow}>
              <Image source={allLogo.icLike} style={styles.icLike} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchRow} onPress={() => NavigatorService.navigate('ReplyPost', {item})}>
              <Image source={allLogo.icComment} style={styles.icComment} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchRow}>
              <Image source={allLogo.icShare} style={styles.icShare} />
            </TouchableOpacity>
          </View>
          <View style={styles.viewComment}>
            {
              item.count_comment >= 1 ?
                <Text style={styles.textCommentsLike}>{item.count_comment+' Comments'}</Text>
              :
                <Text style={styles.textCommentsLike}>{item.count_comment+' Comment'}</Text>
            }
            <View style={{width: toDp(12)}} />
            <Text style={styles.textCommentsLike}>{item.count_like+' Like'}</Text>
          </View>
        </View>
        <View style={styles.line} />
      </View>
    )
  }

  const renderHeader = () => {
    return (
      <View style={styles.viewHeaderCustom}>
        <TouchableOpacity style={[styles.touchMore, {marginLeft: toDp(8)}]}>
          <Image source={allLogo.icMenu} style={styles.icMore} />
        </TouchableOpacity>
        <Image source={allLogo.logo} style={styles.logoHeader} />
        <TouchableOpacity
          onPress={() => setState(state => ({...state, modalVisible: true}))}
          style={[styles.touchMore, {marginRight: toDp(8)}]}
        >
          <Image source={allLogo.icMore} style={styles.icMore} />
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {renderModal()}
      {
        state.loading ?
          <View style={styles.viewLoadingCenter}>
            <ActivityIndicator size="large" color="white" />
          </View>
        :
          <FlatList
            data={state.arrayData}
            renderItem={renderItem}
            ListHeaderComponent={() => renderHeader()}
            ListFooterComponent={() => <View style={{height: toDp(24)}} />}
          />
      }
      <TouchableOpacity style={styles.touchFab} onPress={() => NavigatorService.navigate('NewPost') }>
        <Image source={allLogo.fab} style={styles.fab} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerItem: {
    width: '100%',
    height: 'auto',
    //backgroundColor: 'white',
    //margin: toDp(12),
    borderRadius: toDp(8),
    paddingBottom: toDp(16)
  },
  header: {
    width: '100%',
    height: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    //padding: toDp(16),
    justifyContent: 'space-between'
  },
  viewUser: {
    flexDirection: 'row',
    marginHorizontal: toDp(16)
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
  viewContent: {
    marginTop: toDp(16),
    marginHorizontal: toDp(16),
  },
  postImage: {
    width: toDp(358),
    height: toDp(358),
    borderRadius: toDp(8)
  },
  viewImage: {
    width: toDp(358),
    height: toDp(358),
    position: 'absolute',
    borderRadius: toDp(8)
  },
  textDesc: {
    fontSize: toDp(16),
    marginTop: toDp(4),
    color: 'white',
  },
  icGroup: {
    marginTop: toDp(16),
    width: toDp(358),
    height: toDp(20),
  },
  line: {
    width,
    height: toDp(1),
    backgroundColor: '#E2E2E23D',
    marginTop: toDp(16),
  },
  icVideo: {
    width: toDp(29.48),
    height: toDp(21.79),
    position: 'absolute',
    right: toDp(16),
    top: toDp(16)
  },
  gradientTop: {
    width: '100%',
    height: toDp(74),
    borderTopLeftRadius: toDp(8),
    borderTopRightRadius: toDp(8)
  },
  gradientBottom: {
    width: '100%',
    height: toDp(74),
    borderBottomLeftRadius: toDp(8),
    borderBottomRightRadius: toDp(8),
    position: 'absolute',
    bottom: 0
  },
  viewFooter: {
    flexDirection: 'row',
    marginTop: toDp(16),
  },
  touchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: toDp(20)
  },
  icLike: {
    width: toDp(21.54),
    height: toDp(20.13),
    resizeMode: 'contain',
    tintColor: 'white'
  },
  icComment: {
    width: toDp(19.49),
    height: toDp(19),
    resizeMode: 'contain',
    tintColor: 'white'
  },
  icShare: {
    width: toDp(19.49),
    height: toDp(17),
    resizeMode: 'contain',
    tintColor: 'white'
  },
  text: {
    fontSize: toDp(16),
    marginLeft: toDp(8),
    color: '#787878'
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  viewRootModal: {
    width,
    position: 'absolute',
    bottom: 0
  },
  modalBox: {
    width,
    height: toDp(260),
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: toDp(16),
    borderTopRightRadius: toDp(16)
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  viewCenter: {
    width: '100%',
    alignItems: 'center',
    marginTop: toDp(8)
  },
  lineModal: {
    width: toDp(48),
    height: toDp(4),
    borderRadius: toDp(2.5),
    backgroundColor: '#C4C4C4',
  },
  titleModal: {
    fontSize: toDp(16),
    color: '#363636',
    fontWeight: '700',
    marginTop: toDp(20)
  },
  rowModal: {
    marginTop: toDp(48),
    marginHorizontal: toDp(24),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  textModal: {
    fontSize: toDp(17),
    color: '#363636',
    fontWeight: '600',
  },
  touchButtonModal: {
    width: toDp(160),
    height: toDp(40),
    borderWidth: toDp(1),
    borderColor: '#3EB89A',
    borderRadius: toDp(8),
    justifyContent: 'center',
    alignItems: 'center'
  },
  textButtonModal: {
    fontSize: toDp(16),
    color: '#3EB89A',
    fontWeight: '700',
  },
  viewComment: {
    flexDirection: 'row',
    marginTop: toDp(16),
    justifyContent: 'flex-end'
  },
  textCommentsLike: {
    fontSize: toDp(12),
    color: '#787878'
  },
  viewHeaderCustom: {
    width,
    height: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: toDp(36)
  },
  logoHeader: {
    width: toDp(48),
    height: toDp(48),
    tintColor: 'white'
  },
  viewLoadingCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  touchFab: {
    position: 'absolute',
    right: toDp(16),
    bottom: toDp(16),
  },
  fab: {
    width: toDp(64),
    height: toDp(64),

  },
  viewSpace: {
    width: width * 0.8,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewNameDate: {
    justifyContent: 'center',
    marginLeft: toDp(16),
  },
  imageUrl: {
    width: toDp(48),
    height: toDp(48),
    borderRadius: toDp(24),
    marginTop: toDp(4)
  },
  touchMore: {
    width: toDp(48),
    height: toDp(48),
    justifyContent: 'center',
    alignItems: 'center',
  },
  icMore: {
    width: toDp(24),
    height: toDp(24),
    tintColor: 'white'
  },


})

export default Home
