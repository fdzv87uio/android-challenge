// src/components/AnimatedCard.tsx
import React, { useEffect } from 'react';
import { Pressable, Text, Image, StyleSheet, ToastAndroid, View } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { Series } from '../types/series';
import { Feather } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext'; // <-- New import

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface AnimatedCardProps {
    item: Series;
}

const AnimatedCard = ({ item }: AnimatedCardProps) => {
    const navigation = useNavigation();
    const { toggleFavorite, isFavorite } = useFavorites(); // <-- Use context here
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(50);

    useEffect(() => {
        opacity.value = withTiming(1, { duration: 500 });
        translateY.value = withTiming(0, { duration: 500 });
    }, []);

    const handleLongPress = () => {
        toggleFavorite(item);
        const message = isFavorite(item.id) ? `${item.name} removed from favorites!` : `${item.name} added to favorites!`;
        ToastAndroid.show(message, ToastAndroid.SHORT);
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [{ translateY: translateY.value }],
        };
    });

    return (
        <AnimatedPressable
            style={[styles.card, animatedStyle]}
            onPress={() => {
                //@ts-ignore
                navigation.navigate('Home', {
                screen: 'SeriesDetail',
                params: { seriesId: item.id },
            })
            } }
            onLongPress={handleLongPress}
            accessibilityRole="button"
            accessibilityLabel={`View details for ${item.name}. Long press to ${isFavorite(item.id) ? 'remove from' : 'add to'} favorites.`}
        >
            <Image source={{ uri: item.image?.medium }} style={styles.cardImage} />
            {isFavorite(item.id) && ( // <-- Check state from context
                <View style={styles.favoriteBadge}>
                    <Feather name="heart" size={16} color="#fff" />
                </View>
            )}
            <Text style={styles.cardTitle}>{item.name}</Text>
        </AnimatedPressable>
    );
};
// ... styles remain the same ...

const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 8,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#1E1E1E',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
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
    favoriteBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: 'rgba(255, 77, 77, 0.8)',
        borderRadius: 12,
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AnimatedCard;