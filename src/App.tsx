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

import { Button } from './components/Button';
import { Camera } from 'lucide-react-native';
import {
  Typography,
  Body1,
  Caption,
  H1,
  H2,
  H3,
  H4,
  H5,
  Body2,
} from './components/Typography';
import { IconButton } from './components/IconButton';
import { SearchBar } from './components/SearchBar';
import { Input } from './components/Input';
import { LoadingBar } from './components/LoadingBar';
import { FormControl } from './components/FormControl';
import { RadioGroup } from './components/Radio';
import { Checkbox } from './components/Checkbox';
import { Dropdown } from './components/Dropdown';
import { Pill } from './components/Pill';
import { Toggle } from './components/Toggle';
import { FileUpload, type SelectedUploadFile } from './components/FileUpload';
import { Avatar } from './components/Avatar';
import { DigitInputGroup } from './components/DigitInput';
import { Pagination } from './components/Pagination';

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
  const [dropdownItem, setDropdownItem] = useState('');
  const [toggleEnabled, setToggleEnabled] = useState(false);
  const [selectedFile, setSelectedFile] = useState<SelectedUploadFile | null>(
    null,
  );
  const [cameraFile, setCameraFile] = useState<SelectedUploadFile | null>(null);
  const [currentPage, setCurrentPage] = useState(3);

  const [item, setItem] = useState('');
  const [digitPasscode, setDigitPasscode] = useState('');
  const btnSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

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
      <View className="py-2 items-center">
        <H3>Welcome to</H3>
        <H1>UBH Components</H1>
      </View>

      <View className="py-5 w-full gap-3 px-5">
        <H3 customColor="#c40904">Typography</H3>
        <View className="gap-3">
          <H1>Heading 1</H1>
          <H2>Heading 2</H2>
          <H3>Heading 3</H3>
          <H4>Heading 4</H4>
          <H5>Heading 5</H5>
          <Body1>Body 1</Body1>
          <Body2>Body 2</Body2>
          <Caption>Caption</Caption>
          <Caption color="alert">Caption with alternative color</Caption>
          <Typography variant="body1" customColor="#7C3AED" underline italic>
            Custom purple text
          </Typography>
        </View>
      </View>

      <View className="my-4 h-px w-full bg-gray-400" />

      <View className="py-5 w-full gap-3 px-5">
        <H3 customColor="#c40904">Buttons</H3>
        <View>
          <H5>Contained Buttons (default)</H5>
          <ScrollView horizontal contentContainerClassName="gap-3 items-center">
            {btnSizes.map(size => (
              <Button
                title="Button"
                variant="contained"
                size={size}
                onPress={() => Alert.alert(`${size} button pressed`)}
              />
            ))}
          </ScrollView>
        </View>
        <View>
          <H5>Outlined Buttons</H5>
          <ScrollView horizontal contentContainerClassName="gap-3 items-center">
            {btnSizes.map(size => (
              <Button
                title="Button"
                variant="outlined"
                size={size}
                onPress={() => Alert.alert(`${size} button pressed`)}
              />
            ))}
          </ScrollView>
        </View>
        <View>
          <H5>Text Buttons</H5>
          <ScrollView horizontal contentContainerClassName="gap-3 items-center">
            {btnSizes.map(size => (
              <Button
                title="Button"
                variant="text"
                size={size}
                onPress={() => Alert.alert(`${size} button pressed`)}
              />
            ))}
          </ScrollView>
        </View>
        <View>
          <H5>Buttons with icon</H5>
          <View className="mt-3 gap-3 flex-row">
            <Button
              title="Left Icon Button"
              variant="contained"
              size="sm"
              iconLeft={Camera}
              onPress={() => Alert.alert('left icon button pressed')}
            />
            <Button
              title="Right Icon Button"
              variant="contained"
              size="sm"
              iconRight={Camera}
              onPress={() => Alert.alert('right icon button pressed')}
            />
          </View>
        </View>
        <View>
          <H5>Full-length Button</H5>
          <View className="mt-3">
            <Button
              title="Full-length Button"
              variant="contained"
              size="sm"
              onPress={() => Alert.alert('button pressed')}
            />
          </View>
        </View>
      </View>

      <View className="my-4 h-px w-full bg-gray-400" />

      <View className="py-5 w-full gap-3 px-5">
        <H3 customColor="#c40904">Icon Buttons</H3>
        <View>
          <H5>Contained Icon Buttons</H5>
          <View className="gap-3 items-center flex-row">
            {btnSizes.map(size => (
              <IconButton
                size={size}
                variant="contained"
                icon={Camera}
                onPress={() => Alert.alert('${size} icon button pressed')}
              />
            ))}
          </View>
        </View>
        <View>
          <H5>Outlined Icon Buttons</H5>
          <View className="gap-3 items-center flex-row">
            {btnSizes.map(size => (
              <IconButton
                size={size}
                variant="outlined"
                icon={Camera}
                onPress={() => Alert.alert('${size} icon button pressed')}
              />
            ))}
          </View>
        </View>
        <View>
          <H5>Text Icon Buttons</H5>
          <View className="gap-3 items-center flex-row">
            {btnSizes.map(size => (
              <IconButton
                size={size}
                variant="text"
                icon={Camera}
                onPress={() => Alert.alert('${size} icon button pressed')}
              />
            ))}
          </View>
        </View>
      </View>

      <View className="my-4 h-px w-full bg-gray-400" />

      <View className="mt-6 w-full gap-3 px-5">
        <SearchBar
          value={searchValue}
          onChangeText={setSearchValue}
          placeholder="Search"
        />

        <SearchBar
          value=""
          onChangeText={() => {}}
          placeholder="Disabled"
          visualState="disabled"
        />

        <SearchBar
          value=""
          onChangeText={() => {}}
          placeholder="Error"
          visualState="error"
        />

        <SearchBar
          value="Loading"
          onChangeText={() => {}}
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

        <Input value="Text error" onChangeText={() => {}} visualState="error" />

        <Input
          value="Text loading"
          onChangeText={() => {}}
          visualState="loading"
        />

        <Input
          value="Text cannot be entered"
          onChangeText={() => {}}
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
          onChangeText={() => {}}
          visualState="error"
          multiline
        />

        <Input
          value={
            'Text loading line 1\nText loading line 2\nText loading line 3'
          }
          onChangeText={() => {}}
          visualState="loading"
          multiline
        />

        <Input
          value={
            'Text cannot be entered 1\nText cannot be entered 2\nText cannot be entered 3'
          }
          onChangeText={() => {}}
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
          onChangeText={() => {}}
          inputType="numeric"
          showNumericControls
          visualState="error"
        />

        <Input
          value="123456789"
          onChangeText={() => {}}
          inputType="numeric"
          showNumericControls
          visualState="loading"
        />

        <Input
          value="12345678"
          onChangeText={() => {}}
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
          onChangeText={() => {}}
          inputType="email"
          visualState="error"
        />

        <Input
          value="user@saving.com"
          onChangeText={() => {}}
          inputType="email"
          visualState="loading"
        />

        <Input
          value="user@saving.com"
          onChangeText={() => {}}
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
          onChangeText={() => {}}
          inputType="phone"
          visualState="error"
        />

        <Input
          value="+61 423 456 789"
          onChangeText={() => {}}
          inputType="phone"
          visualState="loading"
        />

        <Input
          value="+61 423 456 789"
          onChangeText={() => {}}
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

      <View className="my-4 h-px w-full bg-gray-400" />

      <View className="py-5 w-full gap-5 px-5">
        <H3 customColor="#c40904">Radio</H3>
        <View className="gap-1">
          <H5>Radio Group</H5>
          <FormControl
            label="Choose your option"
            helperText="Select one option"
            error={!radioOpt ? 'This field is required' : undefined}
            required
          >
            <RadioGroup
              value={radioOpt}
              onChange={setRadioOpt}
              options={[
                { label: 'Option 1', value: 'opt1' },
                { label: 'Option 2', value: 'opt2' },
              ]}
            />
          </FormControl>
        </View>
        <View className="gap-1">
          <H5>Disabled Radio Group</H5>
          <FormControl
            label="Choose your option"
            helperText="Select one option"
            disabled
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
        </View>
      </View>

      <View className="my-4 h-px w-full bg-gray-400" />

      <View className="py-5 w-full gap-3 px-5">
        <H3 customColor="#c40904">Checkbox</H3>
        <FormControl label="Select your option">
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
      </View>

      <View className="my-4 h-px w-full bg-gray-400" />

      <View className="py-5 w-full gap-3 px-5">
        <H3 customColor="#c40904">Dropdown</H3>
        <Dropdown
          value={dropdownItem}
          placeholder="Select an item"
          options={[
            { label: 'Item 1', value: 'item-1' },
            { label: 'Item 2', value: 'item-2' },
            { label: 'Item 3', value: 'item-3' },
            { label: 'Item 4', value: 'item-4' },
          ]}
          onChange={value => setDropdownItem(value)}
        />
      </View>

      <View className="my-4 h-px w-full bg-gray-400" />

      <View className="py-5 w-full gap-3 px-5">
        <H3 customColor="#c40904">Pills</H3>
        <H5>Variants</H5>
        <View className="flex-row gap-3">
          <Pill
            label="Emergency"
            color="#FF413A"
            className=""
            textClassName="text-[16px]"
          />
          <Pill
            label="Archive"
            color="#9E9E9E"
            variant="outline"
            className="font-semibold"
            textClassName="text-[12px] font-semibold"
          />
        </View>
      </View>

      <View className="my-4 h-px w-full bg-gray-400" />

      <View className="py-5 w-full gap-3 px-5">
        <H3 customColor="#c40904">Toggles</H3>
        <View className="flex-row items-center justify-between">
          <H5>Default</H5>
          <Toggle value={toggleEnabled} onChange={setToggleEnabled} />
        </View>
        <View className="flex-row items-center justify-between">
          <H5>Custom size</H5>
          <Toggle
            value={toggleEnabled}
            onChange={setToggleEnabled}
            className="h-[40px] w-[72px] p-[4px]"
            thumbClassName="h-[32px] w-[32px]"
            disabled
          />
        </View>
        <View className="flex-row items-center justify-between">
          <H5>Custom color</H5>
          <Toggle
            value={toggleEnabled}
            onChange={setToggleEnabled}
            activeColor="#39D0A7"
            inactiveColor="#FFDE21"
            thumbColor="#C30010"
          />
        </View>
      </View>

      <View className="my-4 h-px w-full bg-gray-400" />

      <View className="mt-6 w-full gap-3 px-5">
        <FileUpload
          mode="file"
          status={selectedFile ? 'success' : 'empty'}
          fileName={selectedFile?.name}
          onFileSelected={setSelectedFile}
          onClear={() => setSelectedFile(null)}
        />

        <FileUpload
          mode="camera"
          status={cameraFile ? 'success' : 'empty'}
          fileName={cameraFile?.name}
          onFileSelected={setCameraFile}
          onClear={() => setCameraFile(null)}
        />

        <FileUpload
          status="uploading"
          fileName={selectedFile?.name ?? 'Uploading file'}
          progress={75}
        />

        <FileUpload
          status="uploading"
          fileName={selectedFile?.name ?? 'Uploading file'}
          showFileIcon={false}
          progress={75}
        />

        <FileUpload
          status="success"
          fileName={selectedFile?.name ?? 'Selected file'}
        />

        <FileUpload status="error" />
      </View>

      <View className="mt-6 w-full gap-3 px-5">
        <View className="flex-row items-center gap-7">
          <Avatar initials="AR" size="sm" />
          <Avatar initials="AR" size="md" />
          <Avatar initials="AR" size="lg" />
          <Avatar initials="AR" size="xl" />
        </View>
      </View>

      <View className="mt-6 w-full gap-3 px-5">
        <Pagination
          currentPage={currentPage}
          totalPages={5}
          onPageChange={setCurrentPage}
        />
      </View>

      <View className="my-4 h-px w-full bg-gray-400" />

      <View className="py-5 w-full gap-3 px-5">
        <H3 customColor="#c40904">Digit Password</H3>
        <DigitInputGroup
          length={4}
          value={digitPasscode}
          onChange={setDigitPasscode}
          onComplete={code => {
            console.log('Completed:', code);
          }}
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
