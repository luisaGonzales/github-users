import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from './Screens/HomeScreen';
import DetailsScreen from './Screens/DetailScreen';

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Details: {
    screen: DetailsScreen
  }
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#333',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

export default AppContainer = createAppContainer(AppNavigator);
