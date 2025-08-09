import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, FlatList, Pressable, ToastAndroid, Platform } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { fetchSeriesDetails, fetchSeriesEpisodes } from '../api/tvmaze';
import { Episode, Series } from '../types/series';
import EpisodeModal from '../components/EpisodeModal';
import { Feather } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';
import { MainStackParamList } from '../navigation/AppNavigator';

// Define the props for this screen using NativeStackScreenProps
type SeriesDetailScreenProps = NativeStackScreenProps<MainStackParamList, 'SeriesDetail'>;

const SeriesDetailScreen = ({ route }: SeriesDetailScreenProps) => {
    // The seriesId is now correctly typed from MainStackParamList
    const { seriesId } = route.params;
    const { toggleFavorite, isFavorite } = useFavorites();
    const [series, setSeries] = useState<Series | null>(null);
    const [episodes, setEpisodes] = useState<Episode[]>([]);
    const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [seriesResponse, episodesResponse] = await Promise.all([
                    fetchSeriesDetails(seriesId),
                    fetchSeriesEpisodes(seriesId),
                ]);
                setSeries(seriesResponse.data);
                setEpisodes(episodesResponse.data);
            } catch (error) {
                console.error('Failed to fetch series details:', error);
            }
        };
        fetchData();
    }, [seriesId]);

    const handleToggleFavorite = () => {
        if (!series) return;

        const isCurrentlyFavorite = isFavorite(series.id);
        toggleFavorite(series);

        if (Platform.OS === 'android') {
            const message = isCurrentlyFavorite
                ? `${series.name} removed from favorites!`
                : `${series.name} added to favorites!`;
            ToastAndroid.show(message, ToastAndroid.SHORT);
        }
    };

    const groupEpisodesBySeason = (allEpisodes: Episode[]) => {
        const seasons: { [key: number]: Episode[] } = {};
        allEpisodes.forEach(episode => {
            if (!seasons[episode.season]) {
                seasons[episode.season] = [];
            }
            seasons[episode.season].push(episode);
        });
        return seasons;
    };

    if (!series) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    const seasons = groupEpisodesBySeason(episodes);

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: series.image?.original }} style={styles.poster} />
            <View style={styles.detailsContainer}>
                <View style={styles.headerWithButton}>
                    <Text style={styles.title}>{series.name}</Text>
                    <Pressable
                        style={styles.favoriteButton}
                        onPress={handleToggleFavorite}
                        accessibilityRole="button"
                        accessibilityLabel={isFavorite(series.id) ? 'Remove from favorites' : 'Add to favorites'}
                    >
                        <Feather
                            name={'heart'}
                            size={24}
                            color={isFavorite(series.id) ? '#ff4d4d' : '#fff'}
                        />
                    </Pressable>
                </View>
                <Text style={styles.info}>Airs on: {series.schedule.days.join(', ')} at {series.schedule.time}</Text>
                <Text style={styles.info}>Genres: {series.genres.join(', ')}</Text>
                <Text style={styles.summary}>{series.summary.replace(/<[^>]*>?/gm, '')}</Text>

                {Object.keys(seasons).map(seasonNumber => (
                    <View key={seasonNumber}>
                        <Text style={styles.seasonTitle}>Season {seasonNumber}</Text>
                        <FlatList
                            data={seasons[Number(seasonNumber)]}
                            keyExtractor={item => String(item.id)}
                            renderItem={({ item }) => (
                                <Pressable
                                    style={styles.episodeItem}
                                    onPress={() => {
                                        setSelectedEpisode(item);
                                        setModalVisible(true);
                                    }}>
                                    <Text style={styles.episodeText}>{`S${item.season}E${item.number}: ${item.name}`}</Text>
                                </Pressable>
                            )}
                            scrollEnabled={false}
                        />
                    </View>
                ))}
            </View>

            <EpisodeModal
                episode={selectedEpisode}
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
    },
    loadingText: {
        color: '#fff',
        fontSize: 18,
    },
    poster: {
        width: '100%',
        height: 400,
        resizeMode: 'cover',
    },
    detailsContainer: {
        padding: 16,
    },
    headerWithButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
        flexShrink: 1,
        marginRight: 10,
    },
    favoriteButton: {
        padding: 8,
    },
    info: {
        color: '#ccc',
        fontSize: 16,
        marginBottom: 4,
    },
    summary: {
        color: '#eee',
        fontSize: 16,
        lineHeight: 24,
        marginTop: 16,
    },
    seasonTitle: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 24,
        marginBottom: 8,
    },
    episodeItem: {
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    episodeText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default SeriesDetailScreen;
