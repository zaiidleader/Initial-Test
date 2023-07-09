import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack'

import SplashScreen from '../Containers/SplashScreen'
import Homepage from '../Containers/Homepage'
import NewPost from '../Containers/NewPost'
import ReplyPost from '../Containers/ReplyPost'

const AppNavigator = createStackNavigator(
  {
    SplashScreen: { screen: SplashScreen },
    Homepage: { screen: Homepage },
    NewPost: { screen: NewPost },
    ReplyPost: { screen: ReplyPost },
  },
  {
    headerMode: 'none',
    initialRouteName: 'SplashScreen',
  }
);

export default createAppContainer(AppNavigator)
