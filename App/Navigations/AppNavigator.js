import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack'

import Homepage from '../Containers/Homepage'
import NewPost from '../Containers/NewPost'

const AppNavigator = createStackNavigator(
  {
    Homepage: { screen: Homepage },
    NewPost: { screen: NewPost },
  },
  {
    headerMode: 'none',
    initialRouteName: 'Homepage',
  }
);

export default createAppContainer(AppNavigator)
