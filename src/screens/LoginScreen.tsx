import React, { useState } from 'react';
import { Alert, Image, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../components/Button';
import { Checkbox } from '../components/Checkbox';
import { Input } from '../components/Input';
import { H4 } from '../components/Typography';

type LoginScreenProps = {
  onLogin: () => void;
  onEmergency?: () => void;
  onForgotPassword?: () => void;
};

export function LoginScreen({
  onLogin,
  onEmergency,
  onForgotPassword,
}: LoginScreenProps) {
  const [pID, setPID] = useState('');
  const [pwd, setPwd] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    if (!pID.trim() || !pwd.trim()) {
      Alert.alert(
        'Missing details',
        'Please enter your Patient ID and password.',
      );
      return;
    }

    console.log('Patient ID:', pID);
    console.log('Remember me:', rememberMe);

    // TODO: authenticate with backend
    onLogin();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 50,
          paddingVertical: 30,
        }}
      >
        {/* Emergency */}
        <View className="items-end">
          <Button
            title="Emergency"
            variant="outlined"
            size="xl"
            onPress={() => {
              if (onEmergency) {
                onEmergency();
              } else {
                console.log('Emergency!!!!!');
              }
            }}
          />
        </View>

        {/* Logo */}
        <View className="items-center mt-12 mb-8">
          <Image
            source={require('../assets/ubh/logo.png')}
            style={{
              width: 160,
              height: 160,
            }}
            resizeMode="contain"
          />
        </View>

        {/* Form */}
        <View className="w-full self-center">
          {/* Patient ID */}
          <H4 align="center" weight="semibold" className="mb-4">
            Patient ID
          </H4>

          <Input value={pID} onChangeText={setPID} placeholder="" />

          {/* Password */}
          <H4 align="center" weight="semibold" className="mb-4 mt-5">
            Password
          </H4>

          <Input
            value={pwd}
            onChangeText={setPwd}
            placeholder=""
            secureTextEntry
          />

          {/* Forgot Password */}
          <View className="items-center">
            <Button
              title="Forget Password"
              variant="text"
              size="lg"
              onPress={() => {
                if (onForgotPassword) {
                  onForgotPassword();
                } else {
                  console.log('Go to forgot password page'); // TODO: fix this later
                }
              }}
            />
          </View>

          {/* Remember Me */}
          <View className="mt-7">
            <Checkbox
              checked={rememberMe}
              onChange={setRememberMe}
              label="Remember Me"
            />
          </View>

          {/* Login */}
          <View className="mt-8 self-center w-full">
            <Button
              title="Login"
              variant="contained"
              size="lg"
              onPress={handleLogin}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
