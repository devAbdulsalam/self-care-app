import { StatusBar } from 'expo-status-bar';
import {
	Platform,
	StyleSheet,
	TextInput,
	Alert,
	TouchableOpacity,
	KeyboardAvoidingView,
	ScrollView,
	Text,
	View,
} from 'react-native';
import { useState } from 'react';
import { COLORS } from '@/constants/Colors';
import Loader from '@/components/Loader';

export default function ModalScreen() {
	const [title, setTitle] = useState('');
	const [subTitle, setSubTitle] = useState('');
	const [description, setDescription] = useState('');
	const [loading, setLoading] = useState(false);
	const handlePress = () => {
		if (!title || !description) {
			return Alert.alert(
				'Required inputs',
				'Title and description is required'
			);
		}
		setLoading(true);
		const data = {
			title,
			subTitle,
			description,
		};
		console.log(data);
		setLoading(false);
	};
	if (loading) {
		<Loader />;
	}
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={{ flex: 1 }}
		>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.container}>
					<Text style={styles.title}>Create Book</Text>

					{/* Use a light status bar on iOS to account for the black space above the modal */}
					<StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
					<View style={{ width: '100%', flex: 1, marginBottom: 5 }}>
						<Text style={styles.lable}>Title</Text>
						<TextInput
							style={styles.input}
							value={title}
							onChangeText={setTitle}
							placeholder="Enter tilt"
						/>
					</View>
					<View style={{ width: '100%', flex: 1, marginBottom: 5 }}>
						<Text style={styles.lable}>Sub title</Text>
						<TextInput
							style={styles.input}
							value={subTitle}
							onChangeText={setSubTitle}
							placeholder="add subtitle"
						/>
					</View>
					<View style={{ width: '100%', flex: 1, marginBottom: 5 }}>
						<Text style={styles.lable}>Description</Text>
						<TextInput
							style={styles.input}
							value={description}
							onChangeText={setDescription}
							placeholder="details"
						/>
					</View>
					<View style={{ width: '100%', flex: 1, marginTop: 10 }}>
						<TouchableOpacity
							onPress={handlePress}
							style={{
								backgroundColor: COLORS.primary,
								height: 44,
								borderRadius: 6,
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<Text
								style={{
									fontSize: 16,
									color: COLORS.white,
								}}
							>
								Add book
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},

	titleText: {
		fontSize: 16,
		fontWeight: 'bold',
		color: 'green',
		marginTop: 10,
		marginBottom: 20,
	},
	lable: {
		color: 'black',
	},
	input: {
		backgroundColor: 'white',
		borderColor: 'gray',
		borderRadius: 5,
		borderWidth: 1,
		marginTop: 5,
		padding: 10,
	},
});
