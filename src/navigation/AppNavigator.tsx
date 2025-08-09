import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet } from 'react-native';
import SeriesListScreen from '../screens/SeriesListScreen';
import SeriesDetailScreen from '../screens/SeriesDetailScreen';
import SearchScreen from '../screens/SearchScreen';
import FavoritesListScreen from '../screens/FavoritesListScreen';
import PinScreen from '../screens/PinScreen';
import Navbar from '../components/Navbar';

const Drawer = createDrawerNavigator();
// Pass the RootStackParamList to createNativeStackNavigator
const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
    PinScreen: undefined;
    MainDrawer: undefined;
    SeriesList: undefined;
    SeriesDetail: { seriesId: number };
    Search: undefined;
    Favorites: undefined;
};

const CustomDrawerContent = (props: any) => {
    return (
        <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContainer}>
            <View style={styles.drawerHeader}>
                <Text style={styles.drawerHeaderText}>Menu</Text>
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
};

const HomeStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="SeriesList" component={SeriesListScreen} />
            <Stack.Screen name="SeriesDetail" component={SeriesDetailScreen} />
        </Stack.Navigator>
    );
};

const MainDrawer = () => {
    return (
        <Drawer.Navigator
            drawerContent={props => <CustomDrawerContent {...props} />}
            screenOptions={{
                header: () => <Navbar />,
                drawerStyle: {
                    backgroundColor: '#1E1E1E',
                },
                drawerActiveTintColor: '#6200EE',
                drawerInactiveTintColor: '#fff',
            }}
        >
            <Drawer.Screen name="Home" component={HomeStack} />
            <Drawer.Screen name="Search Series" component={SearchScreen} />
            <Drawer.Screen name="My Favorites" component={FavoritesListScreen} />
        </Drawer.Navigator>
    );
};

const AppNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="PinScreen"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="PinScreen" component={PinScreen} />
            <Stack.Screen name="MainDrawer" component={MainDrawer} />
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    drawerContainer: {
        backgroundColor: '#121212',
    },
    drawerHeader: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
        marginBottom: 10,
    },
    drawerHeaderText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default AppNavigator;
