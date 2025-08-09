import React, { useState } from 'react';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, Pressable, Modal, Dimensions } from 'react-native';
import { CommonActions, useNavigation, NavigatorScreenParams } from '@react-navigation/native';

// Import your screen components
import PinScreen from '../screens/PinScreen';
import Navbar from '../components/Navbar';
import MainStackScreen from '../components/MainStackScreen';

// Get the window dimensions for styling
const { width } = Dimensions.get('window');

/**
 * Define the param list for the nested stack navigator.
 * This is the stack that contains the "Home", "SeriesDetail", etc. screens.
 */
export type MainStackParamList = {
    SeriesList: undefined;
    SeriesDetail: { seriesId: number };
    Search: undefined;
    Favorites: undefined;
};

/**
 * Define the param list for the root stack navigator.
 * The 'Main' screen now uses a special type to indicate it is a nested navigator.
 */
export type RootStackParamList = {
    PinScreen: undefined;
    Main: NavigatorScreenParams<MainStackParamList>; // Use NavigatorScreenParams for the nested stack
};

// Create the root stack with the updated RootStackParamList type
const RootStack = createNativeStackNavigator<RootStackParamList>();

// Custom drawer component without native dependencies
const CustomDrawer = ({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) => {
    const navigation = useNavigation();

    const navigateTo = (screenName: keyof MainStackParamList) => {
        onClose();
        navigation.dispatch(
            CommonActions.navigate({
                name: 'Main',
                params: {
                    screen: screenName,
                },
            })
        );
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.drawerContainer}>
                    <View style={styles.drawerHeader}>
                        <Text style={styles.drawerHeaderText}>Menu</Text>
                    </View>
                    <Pressable style={styles.drawerItem} onPress={() => navigateTo('SeriesList')}>
                        <Text style={styles.drawerItemText}>Home</Text>
                    </Pressable>
                    <Pressable style={styles.drawerItem} onPress={() => navigateTo('Search')}>
                        <Text style={styles.drawerItemText}>Search Series</Text>
                    </Pressable>
                    <Pressable style={styles.drawerItem} onPress={() => navigateTo('Favorites')}>
                        <Text style={styles.drawerItemText}>My Favorites</Text>
                    </Pressable>
                </View>
                <Pressable style={styles.closeDrawerButton} onPress={onClose} />
            </View>
        </Modal>
    );
};

const AppNavigator = () => {
    const [isDrawerVisible, setDrawerVisible] = useState(false);

    const toggleDrawer = () => {
        setDrawerVisible(!isDrawerVisible);
    };

    return (
        <>
            <RootStack.Navigator
                initialRouteName="PinScreen"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <RootStack.Screen name="PinScreen" component={PinScreen} />
                {/*
                  The 'Main' screen now uses the MainStackScreen component directly,
                  resolving the type error by allowing React Navigation to
                  correctly inject the props.
                */}
                <RootStack.Screen
                    name="Main"
                    component={MainStackScreen} // Use the new component here
                    options={{
                        header: () => <Navbar toggleDrawer={toggleDrawer} />,
                        headerShown: true
                    }}
                />
            </RootStack.Navigator>
            <CustomDrawer isVisible={isDrawerVisible} onClose={toggleDrawer} />
        </>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    drawerContainer: {
        width: width * 0.75,
        backgroundColor: '#1E1E1E',
        height: '100%',
    },
    closeDrawerButton: {
        flex: 1,
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
    drawerItem: {
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    drawerItemText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default AppNavigator;
