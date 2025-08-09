// src/screens/SeriesListScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { fetchSeriesByPage } from '../api/tvmaze';
import { Series } from '../types/series';
import AnimatedCard from '../components/AnimatedCard';

const SeriesListScreen = () => {
    const [series, setSeries] = useState<Series[]>([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchMoreSeries = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await fetchSeriesByPage(page);
            setSeries(prevSeries => [...prevSeries, ...response.data]);
            setPage(prevPage => prevPage + 1);
        } catch (error) {
            console.error('Failed to fetch series:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMoreSeries();
    }, []);

    const renderItem = ({ item }: { item: Series }) => {
        return <AnimatedCard item={item} />;
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={series}
                keyExtractor={(item) => String(item.id)}
                renderItem={renderItem}
                numColumns={2}
                contentContainerStyle={styles.listContainer}
                onEndReached={fetchMoreSeries}
                onEndReachedThreshold={0.5}
                ListFooterComponent={() => loading ? <ActivityIndicator size="large" color="#6200EE" style={{ paddingVertical: 20 }} /> : null}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    listContainer: {
        padding: 8,
    },
});

export default SeriesListScreen;