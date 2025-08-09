import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

const Navbar = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>TVMaze App</Text>
            <Pressable onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={styles.menuButton}>
                <Feather name="menu" size={24} color="#fff" />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        paddingTop: 50, // To avoid device notches
        backgroundColor: '#1E1E1E',
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    logo: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    menuButton: {
        padding: 8,
    },
});

export default Navbar;