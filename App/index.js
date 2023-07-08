import React, { useEffect } from 'react'
import AppNavigator from './Navigations/AppNavigator'
import NavigatorService from '@NavigatorService'

const MobileTest = () => {

  return (
    <AppNavigator
      ref={navigatorRef => {
        NavigatorService.setContainer(navigatorRef)
      }}
    />
  )
}

export default MobileTest
