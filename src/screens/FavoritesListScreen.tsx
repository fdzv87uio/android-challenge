import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Image, ActivityIndicator } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Series } from '../types/series';

const FavoritesListScreen = () => {
    const [favoriteSeries, setFavoriteSeries] = useState<Series[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            const fetchFavorites = async () => {
                setLoading(true);
                try {
                    const favoritesJson = await AsyncStorage.getItem('favorites');
                    if (favoritesJson) {
                        setFavoriteSeries(JSON.parse(favoritesJson));
                    } else {
                        setFavoriteSeries([]);
                    }
                } catch (error) {
                    console.error('Failed to load favorites:', error);
                    setFavoriteSeries([]);
                } finally {
                    setLoading(false);
                }
            };

            fetchFavorites();
        }, [])
    );

    const renderItem = ({ item }: { item: Series }) => (
        <Pressable
            style={styles.card}
            onPress={() => {
                //@ts-ignore
                navigation.navigate('Main', {
                screen: 'SeriesDetail',
                params: { seriesId: item.id },
            });
            } }
            accessibilityRole="button"
            accessibilityLabel={`View details for ${item.name}`}
        >
            <Image source={{ uri: item.image?.medium }} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{item.name}</Text>
        </Pressable>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6200EE" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>My Favorite Series</Text>
            {favoriteSeries.length > 0 ? (
                <FlatList
                    data={favoriteSeries}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={renderItem}
                    numColumns={2}
                    contentContainerStyle={styles.listContainer}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>You haven't added any favorites yet!</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        padding: 16,
        textAlign: 'center',
    },
    listContainer: {
        padding: 8,
    },
    card: {
        flex: 1,
        margin: 8,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#1E1E1E',
        alignItems: 'center',
    },
    cardImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    cardTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        padding: 8,
        textAlign: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        color: '#ccc',
        fontSize: 18,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
    },
});

export default FavoritesListScreen;