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
import {
    Navbar,
    type NavbarTab,
} from '../components/Navbar';
import { ComponentsScreen } from '../screens/ComponentsScreen';

type RootStackParamList = {
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

type HomeScreenProps = {
    onOpenComponents: () => void;
};

function HomeScreen({
    onOpenComponents,
}: HomeScreenProps) {
    return (
        <View className="flex-1 items-center justify-center bg-white px-5">
            <Button
                title="View Components"
                variant="contained"
                size="md"
                onPress={onOpenComponents}
            />
        </View>
    );
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

type MainTabsProps = NativeStackScreenProps<
    RootStackParamList,
    'Main'
>;

function MainTabs({
    navigation,
}: MainTabsProps) {
    return (
        <Tab.Navigator
            initialRouteName="home"
            tabBar={props => <CustomTabBar {...props} />}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tab.Screen
                name="profile"
                component={BlankScreen}
            />

            <Tab.Screen
                name="logbook"
                component={BlankScreen}
            />

            <Tab.Screen name="home">
                {() => (
                    <HomeScreen
                        onOpenComponents={() =>
                            navigation.navigate('Components')
                        }
                    />
                )}
            </Tab.Screen>

            <Tab.Screen
                name="messages"
                component={BlankScreen}
            />

            <Tab.Screen
                name="search"
                component={BlankScreen}
            />
        </Tab.Navigator>
    );
}

export function AppNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Main"
                component={MainTabs}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="Components"
                component={ComponentsScreen}
                options={{
                    title: 'Components',
                }}
            />
        </Stack.Navigator>
    );
}