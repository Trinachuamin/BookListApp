import React, { useState, useEffect } from 'react';
import {View, Text, TextInput, Button, FlatList, StyleSheet,Image, TouchableOpacity, Alert,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { datasource } from './Data.js';


const Home = ({ navigation }) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = async () => {
        try {
            const data = await AsyncStorage.getItem('books');
            if (data !== null) {
                setBooks(JSON.parse(data));
            } else {
                const initialBooks = datasource.flatMap((section) => section.data);
                setBooks(initialBooks);
                saveBooks(initialBooks);
            }
        } catch (error) {
            console.error('Error loading books:', error);
        }
    };

    const saveBooks = async (newBooks) => {
        try {
            await AsyncStorage.setItem('books', JSON.stringify(newBooks));
            setBooks(newBooks);
        } catch (error) {
            console.error('Error saving books:', error);
        }
    };

    const renderBook = ({ item }) => (
        <TouchableOpacity
            style={styles.bookItem}
            onPress={() =>
                navigation.navigate('Edit', { book: item, books, saveBooks })
            }
        >
            <Image source={{ uri: item.imageUrl }} style={styles.bookImage} />
            <View style={styles.bookInfo}>
                <Text style={styles.bookTitle}>{item.title}</Text>
                <Text style={styles.bookDetails}>ISBN: {item.isbn}</Text>
                <Text style={styles.bookDetails}>Copies: {item.copies}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Book Collection</Text>
            <FlatList
                data={books}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderBook}
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('Add', { books, saveBooks })}
            >
                <Text style={styles.addButtonText}>+ Add New Book</Text>
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
        marginVertical: 20,
        color: 'lightpink',
    },
    bookItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginBottom: 15,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        padding: 10,
    },
    bookImage: {
        width: 70,
        height: 105,
        marginRight: 15,
        borderRadius: 4,
    },
    bookInfo: {
        flex: 1,
    },
    bookTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    bookDetails: {
        fontSize: 14,
        color: '#666',
    },
    addButton: {
        backgroundColor: 'lightpink',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Home;
