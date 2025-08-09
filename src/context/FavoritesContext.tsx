import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Series } from '../types/series';

interface FavoritesContextType {
    favorites: Series[];
    toggleFavorite: (series: Series) => Promise<void>;
    isFavorite: (seriesId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
    const [favorites, setFavorites] = useState<Series[]>([]);

    useEffect(() => {
        const loadFavorites = async () => {
            try {
                const favoritesJson = await AsyncStorage.getItem('favorites');
                if (favoritesJson) {
                    setFavorites(JSON.parse(favoritesJson));
                }
            } catch (error) {
                console.error('Failed to load favorites:', error);
            }
        };
        loadFavorites();
    }, []);

    const toggleFavorite = async (series: Series) => {
        try {
            let updatedFavorites = [...favorites];
            const isFav = updatedFavorites.some(fav => fav.id === series.id);

            if (isFav) {
                updatedFavorites = updatedFavorites.filter(fav => fav.id !== series.id);
            } else {
                updatedFavorites.push(series);
            }
            
            await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            setFavorites(updatedFavorites);
        } catch (error) {
            console.error('Failed to toggle favorite:', error);
        }
    };

    const isFavorite = (seriesId: number) => {
        return favorites.some(fav => fav.id === seriesId);
    };

    const value = {
        favorites,
        toggleFavorite,
        isFavorite,
    };

    return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};