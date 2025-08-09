// src/components/AnimatedCard.tsx
import React, { useEffect } from 'react';
import { Pressable, Text, Image, StyleSheet, ToastAndroid, View, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Series } from '../types/series';
import { Feather } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';

// Use the standard Animated API to create an animatable Pressable component.
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface AnimatedCardProps {
    item: Series;
}

const AnimatedCard = ({ item }: AnimatedCardProps) => {
    const navigation = useNavigation();
    const { toggleFavorite, isFavorite } = useFavorites();

    // Replace useSharedValue with standard Animated.Value
    const opacity = new Animated.Value(0);
    const translateY = new Animated.Value(50);

    useEffect(() => {
        // Use Animated.timing to create the animations
        // and Animated.parallel to run them at the same time.
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: false, // Set to false to support animating both opacity and transform
            }),
            Animated.timing(translateY, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false, // Set to false to support animating both opacity and transform
            }),
        ]).start();
    }, []);

    const handleLongPress = () => {
        toggleFavorite(item);
        const message = isFavorite(item.id) ? `${item.name} removed from favorites!` : `${item.name} added to favorites!`;
        ToastAndroid.show(message, ToastAndroid.SHORT);
    };

    // The animated style object is created directly using the Animated.Value objects.
    const animatedStyle = {
        opacity: opacity,
        transform: [{ translateY: translateY }],
    };

    return (
        <AnimatedPressable
            style={[styles.card, animatedStyle]}
            onPress={() => {
                //@ts-ignore
                navigation.navigate('Main', {
                    screen: 'SeriesDetail',
                    params: { seriesId: item.id },
                });
            }}
            onLongPress={handleLongPress}
            accessibilityRole="button"
            accessibilityLabel={`View details for ${item.name}. Long press to ${isFavorite(item.id) ? 'remove from' : 'add to'} favorites.`}
        >
            <Image source={{ uri: item.image?.medium }} style={styles.cardImage} />
            {isFavorite(item.id) && (
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