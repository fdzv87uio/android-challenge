// src/screens/SearchScreen.tsx
import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Pressable, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import { searchSeriesByName } from '../api/tvmaze';
import { Series } from '../types/series';
import AnimatedCard from '../components/AnimatedCard';

// Use the standard Animated API to create an animatable View component.
const AnimatedView = Animated.createAnimatedComponent(View);

const SearchScreen = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Series[]>([]);
    const [loading, setLoading] = useState(false);

    // Replace useSharedValue with standard Animated.Value
    const searchScale = new Animated.Value(1);

    // The animated style object is created directly using the Animated.Value object.
    const searchAnimatedStyle = {
        transform: [{ scale: searchScale }],
    };

    const handleSearch = async () => {
        if (!query) {
            setResults([]);
            return;
        }
        setLoading(true);
        // Use Animated.timing to create the animation
        Animated.timing(searchScale, {
            toValue: 0.95,
            duration: 150,
            useNativeDriver: true, // Use the native driver for performance
        }).start();

        try {
            const response = await searchSeriesByName(query);
            setResults(response.data.map((item: { show: Series }) => item.show));
        } catch (error) {
            console.error('Failed to search for series:', error);
        } finally {
            setLoading(false);
            Animated.timing(searchScale, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
            }).start();
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
