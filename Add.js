import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Add = ({ navigation, route }) => {
    const { books, saveBooks } = route.params;
    const [title, setTitle] = useState('');
    const [isbn, setIsbn] = useState('');
    const [copies, setCopies] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const addBook = () => {
        if (!title || !isbn || !copies || !imageUrl) {
            alert('Please fill in all fields!');
            return;
        }

        const newBook = { title, isbn, copies: parseInt(copies), imageUrl };
        saveBooks([...books, newBook]);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Add New Book</Text>
            <TextInput
                placeholder="Title"
                style={styles.input}
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                placeholder="ISBN"
                style={styles.input}
                value={isbn}
                onChangeText={setIsbn}
            />
            <TextInput
                placeholder="Image URL"
                style={styles.input}
                value={imageUrl}
                onChangeText={setImageUrl}
            />
            <TextInput
                placeholder="Copies Owned"
                style={styles.input}
                value={copies}
                onChangeText={setCopies}
                keyboardType="numeric"
            />
            <TouchableOpacity style={styles.button} onPress={addBook}>
                <Text style={styles.buttonText}>Add Book</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    header: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        marginTop:20,
        color: 'lightpink',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 8,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: 'lightpink',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Add;
