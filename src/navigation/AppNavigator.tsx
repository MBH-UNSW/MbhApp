import {
  createBottomTabNavigator,
  type BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import {
  createNativeStackNavigator,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React from 'react';
import { View } from 'react-native';

import { Button } from '../components/Button';
import { Navbar, type NavbarTab } from '../components/Navbar';
import { ComponentsScreen } from '../screens/ComponentsScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { LogbookScreen } from '../screens/LogbookScreen';

type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  Components: undefined;
};

type MainTabParamList = {
  profile: undefined;
  logbook: undefined;
  home: undefined;
  messages: undefined;
  search: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function BlankScreen() {
  return <View className="flex-1 bg-white" />;
}

// type HomeScreenProps = {
//   onOpenComponents: () => void;
// };

// function HomeScreen({ onOpenComponents }: HomeScreenProps) {
//   return (
//     <View className="flex-1 items-center justify-center bg-white px-5">
//       <Button
//         title="View Components"
//         variant="contained"
//         size="md"
//         onPress={onOpenComponents}
//       />
//     </View>
//   );
// }

function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const selectedTab = state.routes[state.index].name as NavbarTab;

  const handleTabPress = (tab: NavbarTab) => {
    navigation.navigate(tab);
  };

  return <Navbar selectedTab={selectedTab} onTabPress={handleTabPress} />;
}

// type MainTabsProps = NativeStackScreenProps<RootStackParamList, 'Main'>;

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="home"
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="profile" component={BlankScreen} />

      <Tab.Screen
        name="logbook"
        component={LogbookScreen}
      />

      <Tab.Screen name="home">
        {() => (
          <HomeScreen
            userName="John"
            batteryLevel={70}
            onSOSLongPress={() => {
              console.log('SOS ACTIVATED'); // can edit the SOS call later
            }}
          />
        )}
      </Tab.Screen>

      <Tab.Screen name="messages" component={BlankScreen} />

      <Tab.Screen name="search" component={BlankScreen} />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login">
        {({ navigation }) => (
          <LoginScreen
            onLogin={() => {
              navigation.replace('Main');
            }}
            onEmergency={() => {
              console.log('Open emergency flow');
            }}
            onForgotPassword={() => {
              console.log('Open forgot password page');
            }}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="Main" component={MainTabs} />

      <Stack.Screen
        name="Components"
        component={ComponentsScreen}
        options={{
          headerShown: true,
          title: 'Components',
        }}
      />
    </Stack.Navigator>
  );
}
