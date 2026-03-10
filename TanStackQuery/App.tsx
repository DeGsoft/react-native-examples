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
        <AppContent />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['repoData'],
    queryFn: async () => {
      const response = await fetch(
        'https://api.github.com/users/DeGsoft',
      )
      return await response.json()
    },
  })

  if (isPending) return (<Text>{'Loading...'}</Text>);

  if (error) return (<Text>{'An error has occurred: ' + error.message}</Text>);

  return (<View style={{ ...styles.container, paddingTop: safeAreaInsets.top }}>
    <Image src={data.avatar_url} style={{ width: 100, height: 100, borderRadius: 50 }} />
    <Text>{data.login}</Text>
    <Text>{data.bio}</Text>
    <Text>👀 {data.followers}</Text>
    <Text>✨ {data.public_repos}</Text>
    <Text>{isFetching ? 'Updating...' : ''}</Text>
  </View>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
