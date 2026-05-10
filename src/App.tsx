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

import { SearchBar } from './components/SearchBar';

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
  const [searchValue, setSearchValue] = useState('');

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{
        paddingTop: safeAreaInsets.top + 24,
        paddingBottom: safeAreaInsets.bottom + 24,
        paddingHorizontal: 20,
        alignItems: 'center',
      }}
    >
      <View className="w-full max-w-[360px] gap-4">
        <SearchBar value={searchValue} onChangeText={setSearchValue} />

        <SearchBar value="" onChangeText={() => { }} visualState="disabled" />

        <SearchBar
          value=""
          onChangeText={() => { }}
          visualState="focused"
          showClearButton
          clearIconVariant="subtle"
        />

        <SearchBar
          value="Que"
          onChangeText={() => { }}
          visualState="focused"
          showClearButton
          clearIconVariant="neutral"
        />

        <SearchBar
          value="Query"
          onChangeText={() => { }}
          visualState="focused"
          showClearButton
          clearIconVariant="primary"
        />

        <SearchBar
          value="Query"
          onChangeText={() => { }}
          showClearButton={false}
        />

        <SearchBar value="" onChangeText={() => { }} visualState="error" />

        <SearchBar value="Query" onChangeText={() => { }} visualState="loading" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default App;
