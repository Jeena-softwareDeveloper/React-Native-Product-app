import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const ProductsScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://api.example.com/products') // Replace with your API URL
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const renderItem = ({ item, index }) => {
    if (index === 0) {
      return (
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Products List</Text>
        </View>
      );
    }
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.navigate('ProductDetail', { product: item })}
      >
        <Text style={styles.itemText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const listData = [{ id: 'title' }, ...products];

  return (
    <FlatList
      data={listData}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
  },
});

export default ProductsScreen;
