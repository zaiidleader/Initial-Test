import xhr from './axios'

import {
  URL_POSTING,
  URL_GEOCODE,
  URL_REPLY,
  URL_UPDATE_POSTING
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

export const postReply = (data) => {
  return xhr(URL_REPLY, 'POST', data)
}

export const patchPosting = (body, params) => {
  return xhr(URL_UPDATE_POSTING + params, 'PATCH', body)
}

export const getReply = () => {
  return xhr(URL_REPLY, 'GET')
}
