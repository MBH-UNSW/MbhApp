import React, { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  getAuth,
  signInWithEmailAndPassword,
} from '@react-native-firebase/auth';

import { Button } from '../components/Button';
import { Checkbox } from '../components/Checkbox';
import { Input } from '../components/Input';
import { H4 } from '../components/Typography';

type LoginScreenProps = {
  onEmergency?: () => void;
  onForgotPassword?: () => void;
};

function getLoginErrorMessage(error: unknown) {
  if (
    typeof error !== 'object' ||
    error === null ||
    !('code' in error)
  ) {
    return 'Something went wrong. Please try again.';
  }

  const code = String(error.code);

  switch (code) {
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';

    case 'auth/invalid-credential':
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'The email or password you entered is incorrect.';

    case 'auth/user-disabled':
      return 'This account has been disabled.';

    case 'auth/too-many-requests':
      return 'Too many login attempts. Please try again later.';

    case 'auth/network-request-failed':
      return 'Unable to connect. Please check your internet connection.';

    default:
      return 'Unable to log in. Please try again.';
  }
}

export function LoginScreen({
  onEmergency,
  onForgotPassword,
}: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail || !pwd.trim()) {
      Alert.alert(
        'Missing details',
        'Please enter your email and password.',
      );
      return;
    }

    try {
      setIsLoggingIn(true);

      const auth = getAuth();

      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          trimmedEmail,
          pwd,
        );

      const tokenResult =
        await userCredential.user.getIdTokenResult(true);

      console.log('Signed in user:', {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      });

      console.log('Firebase claims:', tokenResult.claims);

      // AppNavigator listens to Firebase auth state and
      // automatically switches to the main app after sign-in.
    } catch (error) {
      Alert.alert(
        'Login failed',
        getLoginErrorMessage(error),
      );
    } finally {
      setIsLoggingIn(false);
    }
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
          {/* Email */}
          <H4
            align="center"
            weight="semibold"
            className="mb-4"
          >
            Email
          </H4>

          <Input
            value={email}
            onChangeText={setEmail}
            placeholder=""
            inputType="email"
            autoCapitalize="none"
            autoCorrect={false}
          />

          {/* Password */}
          <H4
            align="center"
            weight="semibold"
            className="mb-4 mt-5"
          >
            Password
          </H4>

          <Input
            value={pwd}
            onChangeText={setPwd}
            placeholder=""
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />

          {/* Forgot Password */}
          <View className="items-center">
            <Button
              title="Forgot Password"
              variant="text"
              size="lg"
              onPress={() => {
                if (onForgotPassword) {
                  onForgotPassword();
                } else {
                  console.log(
                    'Go to forgot password page',
                  );
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
              title={
                isLoggingIn
                  ? 'Logging in...'
                  : 'Login'
              }
              variant="contained"
              size="lg"
              state={
                isLoggingIn
                  ? 'disabled'
                  : 'default'
              }
              onPress={handleLogin}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
