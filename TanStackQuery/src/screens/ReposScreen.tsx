import { useQuery } from '@tanstack/react-query';
import * as React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useRefreshOnFocus } from '../hooks/useRefreshOnFocus';

export default function ReposScreen() {

    const { isPending, error, data, refetch } = useQuery({
        queryKey: ['reposData'],
        queryFn: async () => {
            const response = await fetch(
                'https://api.github.com/users/DeGsoft/repos',
            );
            return await response.json();
        },
    });

    useRefreshOnFocus(refetch);

    const renderItem = ({ item }) =>
    (<View style={{ padding: 8, borderWidth: 0.5, borderColor: 'silver' }}>
        <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
        <Text>{item.description}</Text>
    </View>);

    if (error) return (<Text>{'An error has occurred: ' + error.message}</Text>);

    return (<View style={styles.container}>
        {isPending ? <Text>{'Loading...'}</Text>
            : <><FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            ></FlatList></>}
    </View>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
});