/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import '../global.css';

// import { NewAppScreen } from '@react-native/new-app-screen';
import React, { useState } from 'react';
import {
  Alert,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  ScrollView
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { UBHButton } from './components/Button';
import { Camera } from 'lucide-react-native';
import { Typography, Body1, Caption, H1 } from './components/Typography';
import { UBHIconButton } from './components/IconButton';
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
    <View className="flex-1 items-center justify-center bg-white">
      {/*<NewAppScreen
        templateFileName="App.tsx"
        safeAreaInsets={safeAreaInsets}
      />*/}

      <H1>Hello UBH</H1>
      <Body1 color="alert">This is normal text.</Body1>
      <Caption color="primary">caption caption hehehe</Caption>
      <Typography variant="body2" customColor="#7C3AED" underline italic>
        Custom purple text
      </Typography>

      <UBHButton
        title="Cancel"
        variant="outlined"
        onPress={() => Alert.alert('Button pressed')}
      />

      <UBHButton
        title="Cancel"
        variant="outlined"
        size="sm"
        iconLeft={Camera}
        iconRight={Camera}
        onPress={() => Alert.alert('Button pressed')}
      />

      <UBHIconButton
        size="xl"
        variant="outlined"
        icon={Camera}
        onPress={() => Alert.alert('Icon Button pressed')}
      />

      <View className="mt-6 w-full gap-3 px-5">
        <SearchBar
          value={searchValue}
          onChangeText={setSearchValue}
          placeholder="Search"
        />

        <SearchBar
          value=""
          onChangeText={() => { }}
          placeholder="Disabled"
          visualState="disabled"
        />

        <SearchBar
          value=""
          onChangeText={() => { }}
          placeholder="Error"
          visualState="error"
        />

        <SearchBar
          value="Loading"
          onChangeText={() => { }}
          placeholder="Loading"
          visualState="loading"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default App;
