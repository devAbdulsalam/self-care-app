import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

const Header = ({ profile }) => {
	return (
		<View style={styles.header}>
			<View
				style={{
					justifyContent: 'space-between',
					flexDirection: 'row',
				}}
			>
				<Link
					href={'/(app)/profile'}
					asChild
					style={{
						padding: 10,
					}}
				>
					{profile?.avatar?.url ? (
						<Image source={{ uri: profile?.avatar?.url }} />
					) : (
						<FontAwesome name="user-circle" size={24} color="black" />
					)}
				</Link>
				<Link
					href={'/modal'}
					asChild
					style={{
						padding: 10,
					}}
				>
					<FontAwesome name="plus" size={24} />
				</Link>
			</View>
			<Text style={styles.headerText}>
				{profile ? `Hello ${profile?.name}` : 'Hello'}
			</Text>
		</View>
	);
};

export default Header;

const styles = StyleSheet.create({
	header: {
		width: '100%',
		padding: 10,
		marginTop: StatusBar.currentHeight,
	},
	headerText: {
		fontSize: 16,
		fontWeight: 'bold',
	},
});
