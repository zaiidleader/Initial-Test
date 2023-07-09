import React, {useEffect} from 'react';
import {
    View,
    Text,
    Alert,
    StatusBar,
    StyleSheet,
    Dimensions,
    Image,
    SafeAreaView,
    Button,
    Linking,
    BackHandler,
    Platform
} from 'react-native'

import { allLogo } from '@Assets'
import { toDp } from '@percentageToDP'

import NavigatorService from '@NavigatorService'

const { width, height } = Dimensions.get('window')
const SplashScreen = () => {

  useEffect(() => {
    setTimeout(function () {
      NavigatorService.reset('Homepage')
    }, 500);
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor='#181818' barStyle={"light-content"} />
      <View style={styles.viewContent}>
        <Image source={allLogo.logo} style={styles.logo} />
      </View>
      <View style={styles.viewFooter}>
        <Text style={styles.textFrom}>from</Text>
        <Text style={styles.textName}>Zaini Jamathsani</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#181818',
    },
    viewContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    logo: {
      width: toDp(120),
      height: toDp(120),
      resizeMode: 'contain'
    },
    viewFooter: {
      alignItems: 'center'
    },
    textFrom: {
      fontSize: toDp(14),
      color: 'grey'
    },
    textName: {
      marginTop: toDp(4),
      fontSize: toDp(18),
      color: '#00D8FF',
      fontWeight: 'bold'
    }
  });


  export default SplashScreen
