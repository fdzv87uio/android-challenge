// src/screens/SearchScreen.tsx
import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { searchSeriesByName } from '../api/tvmaze';
import { Series } from '../types/series';
import AnimatedCard from '../components/AnimatedCard';

const AnimatedView = Animated.createAnimatedComponent(View);

const SearchScreen = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Series[]>([]);
    const [loading, setLoading] = useState(false);

    const searchScale = useSharedValue(1);

    const searchAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: searchScale.value }],
        };
    });

    const handleSearch = async () => {
        if (!query) {
            setResults([]);
            return;
        }
        setLoading(true);
        searchScale.value = withTiming(0.95, { duration: 150 });
        try {
            const response = await searchSeriesByName(query);
            setResults(response.data.map((item: { show: Series }) => item.show));
        } catch (error) {
            console.error('Failed to search for series:', error);
        } finally {
            setLoading(false);
            searchScale.value = withTiming(1, { duration: 150 });
        }
    };

    const renderItem = ({ item }: { item: Series }) => {
        return <AnimatedCard item={item} />;
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={results}
                keyExtractor={(item) => String(item.id)}
                renderItem={renderItem}
                numColumns={2}
                contentContainerStyle={styles.listContainer}
            />
            {loading && <ActivityIndicator size="large" color="#6200EE" style={styles.loadingIndicator} />}
            <AnimatedView style={[styles.searchBar, searchAnimatedStyle]}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search for a series..."
                    placeholderTextColor="#888"
                    value={query}
                    onChangeText={setQuery}
                    onSubmitEditing={handleSearch}
                />
            </AnimatedView>
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
    searchBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        backgroundColor: '#1E1E1E',
        borderTopWidth: 1,
        borderTopColor: '#333',
    },
    searchInput: {
        backgroundColor: '#333',
        color: '#fff',
        borderRadius: 25,
        paddingHorizontal: 16,
        height: 50,
    },
    loadingIndicator: {
        position: 'absolute',
        bottom: 100,
        left: 0,
        right: 0,
    },
});

export default SearchScreen;