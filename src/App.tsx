/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import '../global.css';

import { NewAppScreen } from '@react-native/new-app-screen';
import {
  Alert,
  Button,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { CustomButton } from './components/Button';
import { Camera } from 'lucide-react-native';

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

  return (
    <View className="flex-1 items-center justify-center bg-white">
      {/*<NewAppScreen
        templateFileName="App.tsx"
        safeAreaInsets={safeAreaInsets}
      />*/}
      <Text className="text-xl font-bold text-blue-500">
        Yay! Tailwind is all set up
      </Text>

      <CustomButton
        title="Cancel"
        variant="outlined"
        onPress={() => Alert.alert('Button pressed')}
      />

      <CustomButton
        title="Cancel"
        variant="outlined"
        size="sm"
        iconLeft={Camera}
        iconRight={Camera}
        onPress={() => Alert.alert('Button pressed')}
      />

      <CustomButton
        title="Pressed Me"
        size="xl"
        variant="outlined"
        onPress={() => Alert.alert('Button pressed')}
      />
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
