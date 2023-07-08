import xhr from './axios'

import {
  URL_POSTING,
  URL_GEOCODE
} from '../../Configs/Api'

export const getPosting = () => {
  return xhr(URL_POSTING, 'GET')
}

export const postPosting = (data) => {
  return xhr(URL_POSTING, 'POST', data)
}

export const getGeocode = (params) => {
  return xhr(URL_GEOCODE + params, 'GET')
}
