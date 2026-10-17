import {
  createBottomTabNavigator,
  type BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React, {
  useEffect,
  useState,
} from 'react';
import { View } from 'react-native';

import {
  getAuth,
  onAuthStateChanged,
} from '@react-native-firebase/auth';

import { Navbar, type NavbarTab } from '../components/Navbar';
import { ComponentsScreen } from '../screens/ComponentsScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { LogbookScreen } from '../screens/LogbookScreen';
import { MessagesScreen } from '../screens/MessagesScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

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

const Stack =
  createNativeStackNavigator<RootStackParamList>();

const Tab =
  createBottomTabNavigator<MainTabParamList>();

function BlankScreen() {
  return <View className="flex-1 bg-white" />;
}

function CustomTabBar({
  state,
  navigation,
}: BottomTabBarProps) {
  const selectedTab =
    state.routes[state.index].name as NavbarTab;

  const handleTabPress = (tab: NavbarTab) => {
    navigation.navigate(tab);
  };

  return (
    <Navbar
      selectedTab={selectedTab}
      onTabPress={handleTabPress}
    />
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="home"
      tabBar={props => (
        <CustomTabBar {...props} />
      )}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
      />

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
              console.log('SOS ACTIVATED');
            }}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="messages"
        component={MessagesScreen}
      />

      <Tab.Screen
        name="search"
        component={BlankScreen}
      />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  const [isAuthenticated, setIsAuthenticated] =
    useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      getAuth(),
      user => {
        setIsAuthenticated(user !== null);
      },
    );

    return unsubscribe;
  }, []);

  if (isAuthenticated === null) {
    return <View className="flex-1 bg-white" />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {isAuthenticated ? (
        <>
          <Stack.Screen
            name="Main"
            component={MainTabs}
          />

          <Stack.Screen
            name="Components"
            component={ComponentsScreen}
            options={{
              headerShown: true,
              title: 'Components',
            }}
          />
        </>
      ) : (
        <Stack.Screen name="Login">
          {() => (
            <LoginScreen
              onEmergency={() => {
                console.log(
                  'Open emergency flow',
                );
              }}
              onForgotPassword={() => {
                console.log(
                  'Open forgot password page',
                );
              }}
            />
          )}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  );
}
