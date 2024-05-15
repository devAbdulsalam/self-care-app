import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, Pressable } from 'react-native';
import Quotes from '@/components/Quote';
import axios from 'axios';
import { Link, Redirect } from 'expo-router';
import Loader from '@/components/Loader';
import { books } from '@/constants/Data';
import { useAuth } from '@/context/authContext';
import { FontAwesome } from '@expo/vector-icons';
import Header from '@/components/Header';

const options = {
	method: 'POST',
	url: 'https://motivational-quotes1.p.rapidapi.com/motivation',
	headers: {
		'content-type': 'application/json',
		'X-RapidAPI-Key': '86cfb535b2msh2c5232bce17206bp195115jsnec46ed122ec1',
		'X-RapidAPI-Host': 'motivational-quotes1.p.rapidapi.com',
	},
	data: '{"key1":"value","key2":"value"}',
};

export default function indexScreen() {
	const [quote, setQuote] = useState('');
	const [isLoading, setLoading] = useState(true);
	const { session, loading, profile } = useAuth();

	useEffect(() => {
		axios
			.request(options)
			.then((response) => {
				setQuote(() => response.data);
				console.log(response.data);
			})
			.catch((error) => {
				console.warn(error);
			})
			.finally(() => setLoading(false));
	}, []);

	if (!session) {
		return <Redirect href={'/(auth)/login'} />;
	}

	if (loading || isLoading) {
		return <Loader />;
	}
	return (
		<View style={styles.container}>
			<Header profile={profile} />
			<Text style={styles.title}>My books</Text>
			<Quotes quote={quote} />
			<FlatList
				data={books}
				renderItem={({ item }) => (
					<Link href={`/book/${item.id}`} asChild>
						<Pressable style={styles.book}>
							<Text style={styles.title}>{item.title}</Text>
							<Text style={styles.title}>{item.created_at}</Text>
						</Pressable>
					</Link>
				)}
				// numColumns={2}
				contentContainerStyle={{ gap: 10, padding: 10 }}
				// columnWrapperStyle={{ gap: 10 }}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingBottom: 20,
		marginBottom: 20,
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	header: {
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
		marginVertical: 10,
	},
	book: {
		flex: 1,
		width: '100%',
		padding: 10,
		backgroundColor: 'white',
		borderRadius: 10,
	},
});
