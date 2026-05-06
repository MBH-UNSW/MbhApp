/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import '../global.css';

import React, { useState } from 'react';
import { NewAppScreen } from '@react-native/new-app-screen';
import { Alert, Button, StatusBar, StyleSheet, Text, useColorScheme, View, ScrollView } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import SearchBar from './components/SearchBar';
import ClearIcon from './components/icons/ClearIcon';
import ErrorIcon from './components/icons/ErrorIcon';
import LoadingSpinner from './components/icons/LoadingSpinner';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();
  const [liveQuery, setLiveQuery] = useState('');


  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          width: '100%',
          paddingHorizontal: 20,
          paddingTop: safeAreaInsets.top + 20,
          paddingBottom: safeAreaInsets.bottom + 20,
          gap: 18,
        }}
      >
        <View className="flex-1 items-center justify-center bg-white">
          {/*<NewAppScreen
          templateFileName="App.tsx"
          safeAreaInsets={safeAreaInsets}
          />*/}
          <Text className="text-xl font-bold text-blue-500">
            Yay! Tailwind is all set up
          </Text>
          <Button
            title="Press me"
            onPress={() => Alert.alert('Button pressed')}
            color="blue"
          />
        </View>

        <SearchBar
          value=""
          onChangeText={() => { }}
          placeholder="Search"
          visualState="default"
        />

        <SearchBar
          value=""
          onChangeText={() => { }}
          placeholder="Search"
          visualState="disabled"
        />

        <SearchBar
          value=""
          onChangeText={() => { }}
          placeholder="Search"
          visualState="focused"
        />

        <SearchBar
          value="Que"
          onChangeText={() => { }}
          visualState="focused"
        />

        <SearchBar
          value="Query"
          onChangeText={() => { }}
          visualState="focused"
          clearIconVariant="primary"
        />

        <SearchBar
          value="Query"
          onChangeText={() => { }}
          visualState="default"
        />

        <SearchBar
          value=""
          onChangeText={() => { }}
          placeholder=""
          visualState="error"
        />

        <SearchBar
          value="Query"
          onChangeText={() => { }}
          visualState="loading"
        />

        <View className="flex-row items-center gap-4 rounded-lg p-4">
          <ClearIcon variant="subtle" onPress={() => { }} />
          <ClearIcon variant="neutral" onPress={() => { }} />
          <ClearIcon variant="primary" onPress={() => { }} />
          <ErrorIcon />
          <LoadingSpinner />
        </View>

        <SearchBar
          value={liveQuery}
          onChangeText={setLiveQuery}
          placeholder="Search"
        />
      </ScrollView>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default App;
