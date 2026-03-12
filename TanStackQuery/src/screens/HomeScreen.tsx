import { Button } from '@react-navigation/elements';
import {
  useIsFocused,
  useNavigation
} from '@react-navigation/native';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const safeAreaInsets = useSafeAreaInsets();

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['userData'],
    queryFn: async () => {
      const response = await fetch(
        'https://api.github.com/users/DeGsoft',
      );
      return await response.json();
    },
    staleTime: 1000 * 60 * 2,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    subscribed: isFocused,
  });

  if (error) return (<Text>{'An error has occurred: ' + error.message}</Text>);

  return (<View style={{ ...styles.container, paddingTop: safeAreaInsets.top }}>
    {isPending ? <Text>{'Loading...'}</Text>
      : <>
        <Image src={data.avatar_url} style={{ width: 100, height: 100, borderRadius: 50 }} />
        <Text>{data.login}</Text>
        <Text>{data.bio}</Text>
        <Text>👀 {data.followers}</Text>
        <Text>✨ {data.public_repos}</Text>      
        <Button style={{margin:8}} onPress={() => navigation.navigate('Repos')}>
          Repos
        </Button>
        <Text>{isFetching ? 'Updating...' : ''}</Text>
      </>}
  </View>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});