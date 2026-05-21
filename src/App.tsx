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
  ScrollView,
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
import { Input } from './components/Input';
import { LoadingBar } from './components/LoadingBar';
import { FormControl } from './components/FormControl';
import { RadioGroup } from './components/Radio';
import { Checkbox } from './components/Checkbox';
import { FileUpload } from './components/FileUpload';

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
  const [inputValue, setInputValue] = useState('');
  const [multilineValue, setMultilineValue] = useState('');
  const [numericValue, setNumericValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [radioOpt, setRadioOpt] = useState('');
  const [checkOpts, setCheckOpts] = useState({
    checkbox1: false,
    checkbox2: false,
  });

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingTop: 90,
        paddingBottom: 30,
      }}
    >
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

      <View className="mt-6 w-full gap-3 px-5">
        <Input
          value={inputValue}
          onChangeText={setInputValue}
          placeholder="Enter text"
        />

        <Input value="Text error" onChangeText={() => { }} visualState="error" />

        <Input
          value="Text loading"
          onChangeText={() => { }}
          visualState="loading"
        />

        <Input
          value="Text cannot be entered"
          onChangeText={() => { }}
          visualState="disabled"
        />

        <Input
          value={multilineValue}
          onChangeText={setMultilineValue}
          placeholder="Enter text"
          multiline
        />

        <Input
          value={'Text error line 1\nText error line 2\nText error line 3'}
          onChangeText={() => { }}
          visualState="error"
          multiline
        />

        <Input
          value={
            'Text loading line 1\nText loading line 2\nText loading line 3'
          }
          onChangeText={() => { }}
          visualState="loading"
          multiline
        />

        <Input
          value={
            'Text cannot be entered 1\nText cannot be entered 2\nText cannot be entered 3'
          }
          onChangeText={() => { }}
          visualState="disabled"
          multiline
        />

        <Input
          value={numericValue}
          onChangeText={setNumericValue}
          inputType="numeric"
          placeholder="12345678"
          showNumericControls
        />

        <Input
          value="123456789"
          onChangeText={() => { }}
          inputType="numeric"
          showNumericControls
          visualState="error"
        />

        <Input
          value="123456789"
          onChangeText={() => { }}
          inputType="numeric"
          showNumericControls
          visualState="loading"
        />

        <Input
          value="12345678"
          onChangeText={() => { }}
          inputType="numeric"
          showNumericControls
          visualState="disabled"
        />

        <Input
          value={emailValue}
          onChangeText={setEmailValue}
          placeholder="user@example.com"
          inputType="email"
        />

        <Input
          value="user@invalid"
          onChangeText={() => { }}
          inputType="email"
          visualState="error"
        />

        <Input
          value="user@saving.com"
          onChangeText={() => { }}
          inputType="email"
          visualState="loading"
        />

        <Input
          value="user@saving.com"
          onChangeText={() => { }}
          inputType="email"
          visualState="disabled"
        />

        <Input
          value={phoneValue}
          onChangeText={setPhoneValue}
          placeholder="+61 423 456 789"
          inputType="phone"
        />

        <Input
          value="+61 423 45"
          onChangeText={() => { }}
          inputType="phone"
          visualState="error"
        />

        <Input
          value="+61 423 456 789"
          onChangeText={() => { }}
          inputType="phone"
          visualState="loading"
        />

        <Input
          value="+61 423 456 789"
          onChangeText={() => { }}
          inputType="phone"
          visualState="disabled"
        />
      </View>

      <View className="mt-6 w-full gap-3 px-5">
        <LoadingBar progress={0} variant="neutral" />

        <LoadingBar progress={100} variant="success" />

        <LoadingBar progress={50} variant="warning" />

        <LoadingBar progress={50} variant="error" />

        <LoadingBar
          progress={75}
          variant="success"
          showPercentage
          helperText="Nearly done"
        />
      </View>

      <FormControl
        label="Choose your option"
        helperText="Select one option"
        error={!radioOpt ? 'This field is required' : undefined}
        disabled
        required
      >
        <RadioGroup
          value={radioOpt}
          onChange={setRadioOpt}
          options={[
            { label: 'Option 1', value: 'opt1' },
            { label: 'Option 2', value: 'opt2' },
          ]}
          disabled
        />
      </FormControl>

      <FormControl>
        <Checkbox
          checked={checkOpts.checkbox1}
          onChange={checked =>
            setCheckOpts(prev => ({
              ...prev,
              checkbox1: checked,
            }))
          }
          label="Checkbox 1"
        />

        <Checkbox
          checked={checkOpts.checkbox2}
          onChange={checked =>
            setCheckOpts(prev => ({
              ...prev,
              checkbox2: checked,
            }))
          }
          label="Checkbox 2"
        />
      </FormControl>

      <View className="mt-6 w-full gap-3 px-5">
        <FileUpload mode="click" status="empty" />

        <FileUpload mode="drag" status="empty" />

        <FileUpload mode="camera" status="empty" />

        <FileUpload
          status="uploading"
          fileName="filename.jpg"
          progress={75}
        />

        <FileUpload
          status="uploading"
          fileName="filename.jpg"
          showFileIcon={false}
          progress={75}
        />

        <FileUpload
          status="success"
          fileName="filename.jpg"
        />

        <FileUpload
          status="error"
        />
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
