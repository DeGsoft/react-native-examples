import {
  focusManager,
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import React from 'react';
import { AppStateStatus, Image, Platform, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useOnlineManager } from './src/hooks/useOnlineManager';
import { useAppState } from './src/hooks/useAppState';
import Navigation from './src/navigation/MyStack';

function onAppStateChange(status: AppStateStatus) {
  // React Query already supports in web browser refetch on window focus by default
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active')
  }
}

function App() {
  useOnlineManager();
  useAppState(onAppStateChange);

  const isDarkMode = useColorScheme() === 'dark';
  const queryClient = new QueryClient();

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <QueryClientProvider client={queryClient}>
        <Navigation />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default App;
