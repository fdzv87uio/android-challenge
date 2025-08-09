import React from 'react';
import { Modal, View, Text, Image, Pressable, StyleSheet, ScrollView } from 'react-native';
import { Episode } from '../types/series';
import sanitizeHtml from 'sanitize-html';

interface EpisodeModalProps {
    episode: Episode | null;
    visible: boolean;
    onClose: () => void;
}

const EpisodeModal = ({ episode, visible, onClose }: EpisodeModalProps) => {
    if (!episode) return null;

    const sanitizedDescription = sanitizeHtml(episode.summary, {allowedTags:[]});

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <ScrollView>
                        <Text style={styles.modalTitle}>{episode.name}</Text>
                        <Text style={styles.modalInfo}>S{episode.season}E{episode.number}</Text>
                        {episode.image?.medium && (
                            <Image
                                source={{ uri: episode.image.medium }}
                                style={styles.modalImage}
                            />
                        )}
                        <Text style={styles.modalSummary}>{sanitizedDescription}</Text>
                    </ScrollView>
                    <Pressable
                        style={styles.closeButton}
                        onPress={onClose}
                    >
                        <Text style={styles.textStyle}>Close</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
    },
    modalView: {
        margin: 20,
        backgroundColor: '#2C2C2C',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%',
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
        textAlign: 'center',
    },
    modalInfo: {
        fontSize: 18,
        color: '#888',
        marginBottom: 16,
        textAlign: 'center',
    },
    modalImage: {
        width: 300,
        height: 200,
        resizeMode: 'contain',
        borderRadius: 10,
        marginBottom: 16,
    },
    modalSummary: {
        fontSize: 16,
        color: '#ccc',
        textAlign: 'justify',
    },
    closeButton: {
        backgroundColor: '#6200EE',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 20,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default EpisodeModal;