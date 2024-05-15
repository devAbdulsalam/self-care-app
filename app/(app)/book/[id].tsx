import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React, { useState } from 'react';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { books } from '@/constants/Data';
// import { PizzaSize } from '@/types';
import Colors from '@/constants/Colors';
import Button from '@/components/Button';

// const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const index = () => {
	const { id } = useLocalSearchParams();
	const book = books.find((p) => p.id.toString() === id);
	// const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');
	// const { addItem } = useCart();
	// const product = products[0];

	// const handleAddTocart = () => {
	// 	console.log('Add to cart', id, { size: selectedSize });
	// 	if (!product) {
	// 		return;
	// 	}
	// 	addItem(product, selectedSize);
	// 	router.push('/cart');
	// };

	const handleDelete = () => {
		console.log('delete book', id);
	};

	if (!book) {
		return <Text>Book not found</Text>;
	}
	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: `${book.title}` }} />

			<Text style={styles.lable}>Title</Text>
			<Text style={styles.title}>{book.subtitle}</Text>
			<Text style={styles.lable}>Sub title: </Text>
			<Text style={styles.text}>{book.subtitle}</Text>
			<Text style={styles.lable}>Description</Text>
			<Text style={styles.text}>{book.description}</Text>
			<Button text="Delete Book" onPress={handleDelete} />
		</View>
	);
};

export default index;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		padding: 10,
		// justifyContent: 'center',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
	},

	lable: {
		fontSize: 12,
		fontWeight: 'bold',
		marginTop: 'auto',
	},
	text: {
		fontSize: 12,
		fontWeight: 'bold',
	},
});
