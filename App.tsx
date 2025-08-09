import 'react-native-gesture-handler';
import React, { useRef, useEffect } from 'react';
import { SafeAreaView, StyleSheet, AppState, AppStateStatus, StatusBar } from 'react-native';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { FavoritesProvider } from './src/context/FavoritesContext';
import { RootStackParamList } from './src/navigation/AppNavigator';

export default function App() {
    const navigationRef = useNavigationContainerRef<RootStackParamList>();
    const appState = useRef(AppState.currentState);

    useEffect(() => {
        const handleAppStateChange = (nextAppState: AppStateStatus) => {
            // Check if the app is coming from the background or inactive state
            if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
                if (navigationRef.isReady()) {
                    // Navigate to the PinScreen to lock the app on resume
                    navigationRef.navigate('PinScreen');
                }
            }
            appState.current = nextAppState;
        };

        const subscription = AppState.addEventListener('change', handleAppStateChange);

        return () => {
            subscription.remove();
        };
    }, []);

    return (
        <FavoritesProvider>
            <SafeAreaView style={styles.container}>
                <NavigationContainer ref={navigationRef}>
                    <AppNavigator />
                </NavigationContainer>
                <StatusBar />
            </SafeAreaView>
        </FavoritesProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
});
