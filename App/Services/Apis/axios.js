import axios from 'axios'
import { Platform, AsyncStorage } from 'react-native'
import NavigatorService from '@NavigatorService'

const xhr = async (url, method, data, headers) => {

  const token = await AsyncStorage.getItem('sessionkey')
  let defaultHeader = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': JSON.parse(token)?.accessToken
  }

  let config = {
    method,
    url,
    //headers: token !== null ? defaultHeader : headers,
    headers: headers ? headers : defaultHeader,
    data,
    timeout: 15000,
  }

  if(config.headers === undefined) {
    config = {
      method,
      url,
      data,
      timeout: 15000,
    }
  }

  // LOG ALL DATA
  console.log(config)
  try {
    const res = await axios(config)
    return res
  }
  catch ({response}) {
    console.log(response);
    throw response
  }
}

export default xhr
