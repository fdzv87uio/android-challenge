import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SeriesListScreen from '../screens/SeriesListScreen';
import SeriesDetailScreen from '../screens/SeriesDetailScreen';
import SearchScreen from '../screens/SearchScreen';
import FavoritesListScreen from '../screens/FavoritesListScreen';
import { MainStackParamList } from '../navigation/AppNavigator';

// Create a new stack for the main application screens
const Stack = createNativeStackNavigator<MainStackParamList>();

// This component encapsulates the nested stack navigator
const MainStackScreen = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SeriesList" component={SeriesListScreen} />
            <Stack.Screen name="SeriesDetail" component={SeriesDetailScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="Favorites" component={FavoritesListScreen} />
        </Stack.Navigator>
    );
};

export default MainStackScreen;
