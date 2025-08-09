import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Vibration } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Feather } from '@expo/vector-icons';

const HARDCODED_PIN = '1235';

const PinScreen = () => {
    const [pin, setPin] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        if (pin.length === 4) {
            if (pin === HARDCODED_PIN) {
                // Correct PIN, navigate to the main app
                //@ts-ignore
                navigation.replace('Main', {
                screen: 'SeriesList'
                });
            } else {
                // Incorrect PIN, vibrate and clear the input
                Vibration.vibrate();
                setPin('');
            }
        }
    }, [pin, navigation]);

    const handleKeyPress = (key: string) => {
        if (pin.length < 4) {
            setPin(currentPin => currentPin + key);
        }
    };

    const handleDelete = () => {
        setPin(currentPin => currentPin.slice(0, -1));
    };

    const renderPinDots = () => {
        return (
            <View style={styles.pinContainer}>
                {[0, 1, 2, 3].map(index => (
                    <View
                        key={index}
                        style={[
                            styles.pinDot,
                            index < pin.length ? styles.pinDotFilled : null,
                        ]}
                    />
                ))}
            </View>
        );
    };

    const renderKeypad = () => {
        const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'delete'];
        return (
            <View style={styles.keypadContainer}>
                {keys.map((key, index) => (
                    <Pressable
                        key={index}
                        style={styles.keypadButton}
                        onPress={() => {
                            if (key === 'delete') {
                                handleDelete();
                            } else if (key !== '') {
                                handleKeyPress(key);
                            }
                        }}
                        disabled={key === ''}
                    >
                        {key === 'delete' ? (
                            <Feather name="delete" size={24} color="#fff" />
                        ) : (
                            <Text style={styles.keypadText}>{key}</Text>
                        )}
                    </Pressable>
                ))}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Enter PIN</Text>
            {renderPinDots()}
            {renderKeypad()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 40,
    },
    pinContainer: {
        flexDirection: 'row',
        marginBottom: 40,
    },
    pinDot: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#fff',
        marginHorizontal: 10,
    },
    pinDotFilled: {
        backgroundColor: '#fff',
    },
    keypadContainer: {
        width: '80%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    keypadButton: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderRadius: 40,
        backgroundColor: '#333',
    },
    keypadText: {
        fontSize: 32,
        color: '#fff',
    },
});

export default PinScreen;
