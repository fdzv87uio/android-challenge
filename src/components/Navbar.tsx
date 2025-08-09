// src/components/Navbar.tsx (or .js)

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// The toggleDrawer prop is passed from the parent component (AppNavigator)
const Navbar = ({ toggleDrawer }:any) => {
  const navigation = useNavigation();

  return (
    <View style={styles.navbarContainer}>
      <Pressable style={styles.iconButton} onPress={toggleDrawer}>
        <Ionicons name="menu" size={24} color="#fff" />
      </Pressable>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Android Challenge</Text>
      </View>
      <View style={styles.placeholder}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E1E1E',
    height: 60,
    paddingHorizontal: 15,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  iconButton: {
    padding: 5,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 34, // This matches the size of the icon and its padding to center the title
  },
});

export default Navbar;