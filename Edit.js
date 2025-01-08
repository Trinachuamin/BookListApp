import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const Edit = ({ navigation, route }) => {
    const { book, books, saveBooks } = route.params;
    const [title, setTitle] = useState(book.title);
    const [isbn, setIsbn] = useState(book.isbn);
    const [copies, setCopies] = useState(book.copies.toString());
    const [imageUrl, setImageUrl] = useState(book.imageUrl);

    const saveChanges = () => {
        const updatedBooks = books.map((b) =>
            b.isbn === book.isbn
                ? { title, isbn, copies: parseInt(copies), imageUrl }
                : b
        );
        saveBooks(updatedBooks);
        navigation.goBack();
    };

    const deleteBook = () => {
        Alert.alert('Delete Book', 'Are you sure you want to delete this book?', [
            {
                text: 'Yes',
                onPress: () => {
                    const updatedBooks = books.filter((b) => b.isbn !== book.isbn);
                    saveBooks(updatedBooks);
                    navigation.goBack();
                },
            },
            { text: 'No' },
        ]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Edit Book</Text>
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
            <TouchableOpacity style={styles.button} onPress={saveChanges}>
                <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, { backgroundColor: '#E53935' }]}
                onPress={deleteBook}
            >
                <Text style={styles.buttonText}>Delete Book</Text>
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

export default Edit;
