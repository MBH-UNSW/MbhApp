/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import '../global.css';

// import { NewAppScreen } from '@react-native/new-app-screen';
import {
  Alert,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { CustomButton } from './components/Button';
import { Camera } from 'lucide-react-native';
import { Typography, Body1, Caption, H1 } from './components/Typography';

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
      
      <H1>Hello UBH</H1>
      <Body1 color="alert">This is normal text.</Body1>
      <Caption color="primary">caption caption hehehe</Caption>
      <Typography variant="body2" customColor="#7C3AED" underline italic>
        Custom purple text
      </Typography>

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
