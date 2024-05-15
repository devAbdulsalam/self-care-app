import {
	ActivityIndicator,
	Platform,
	Image,
	KeyboardAvoidingView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	View,
	useWindowDimensions,
	TouchableOpacity,
	Alert,
} from 'react-native';
import Colors, { COLORS } from '@/constants/Colors';
import { useState } from 'react';
import { Link, router } from 'expo-router';
import images from '@/constants/Images';
// import { AuthContext } from '@/context/AuthContext';
import { FontAwesome } from '@expo/vector-icons';
import { supabase } from '@/utils/supabase';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;
const Login = () => {
	const [email, onChangeEmail] = useState('');
	const [password, onChangePassword] = useState('');
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { height } = useWindowDimensions();
	const [isError, setIsError] = useState('');

	const clearData = () => {
		setIsError('');
		onChangeEmail('');
		onChangePassword('');
	};
	const handleLogin = async () => {
		setIsError('');

		if (!email) {
			return setIsError('Email is required');
		}
		if (!password) {
			return setIsError('Password is required');
		}
		setIsLoading(true);
		try {
			const { error, data } = await supabase.auth.signInWithPassword({
				email,
				password,
			});
			if (error) Alert.alert(error.message);
			if (data) {
				console.log(data);
				clearData();
			}

			setIsLoading(false);
		} catch (error) {
			console.warn('Error', '@post forgot password', error);
			// const message = error?.data || 'Something went wrong!';
			Alert.alert('Error sigining up', 'Something went wrong', [
				{
					text: 'cancel',
					onPress: () => {
						console.log('cancel');
					},
				},
				{
					text: 'ok',
					onPress: () => {
						console.log('cancel');
					},
				},
			]);
			setIsLoading(false);
		}
	};

	const handleGoogleAuth = () => {
		console.log('handleGoogleAuth');
	};
	return (
		<>
			{isLoading ? (
				<View style={[styles.container, styles.horizontal]}>
					<ActivityIndicator size="large" color={COLORS.lime} />
				</View>
			) : (
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					style={{ flex: 1 }}
				>
					<ScrollView showsVerticalScrollIndicator={false}>
						<View style={styles.container}>
							<Image
								source={images.logo}
								style={[styles.image, { height: height * 0.3 }]}
								resizeMode="contain"
							/>
							<Text style={styles.titleText}>Log into your Account</Text>

							<View style={{ width: '100%', flex: 1, marginBottom: 5 }}>
								<Text style={styles.lable}>Email</Text>
								<TextInput
									style={styles.input}
									value={email}
									onChangeText={onChangeEmail}
									placeholder="abc@mail.com"
								/>
							</View>
							<View style={{ width: '100%' }}>
								<Text style={styles.lable}>Password</Text>
								<View style={styles.passwordContainer}>
									<TextInput
										style={styles.password}
										onChangeText={onChangePassword}
										value={password}
										secureTextEntry={!showPassword}
										placeholder="******"
									/>
									<TouchableOpacity
										style={styles.eyes}
										onPress={() => setShowPassword(!showPassword)}
									>
										{!showPassword ? (
											<FontAwesome name="eye" size={16} />
										) : (
											<FontAwesome name="eye-slash" size={16} />
										)}
									</TouchableOpacity>
								</View>
							</View>
							<View>
								{isError && <Text style={styles.error}>{isError}</Text>}
							</View>

							<TouchableOpacity
								style={{
									backgroundColor: COLORS.primary,
									height: 44,
									borderRadius: 6,
									alignItems: 'center',
									justifyContent: 'center',
									width: '80%',
									marginHorizontal: 10,
								}}
								onPress={handleLogin}
							>
								<Text
									style={{
										fontSize: 16,
										color: COLORS.white,
									}}
								>
									Login
								</Text>
							</TouchableOpacity>
							<Link href={'/signup'} style={styles.textButton}>
								Signup
							</Link>
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: StatusBar.currentHeight,
		padding: 8,
	},
	horizontal: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		padding: 10,
	},
	image: {
		width: '70%',
		aspectRatio: 1,
		maxHeight: 700,
		maxWidth: 400,
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
	passwordContainer: {
		alignItems: 'center',
		backgroundColor: 'white',
		borderColor: 'gray',
		borderRadius: 5,
		borderWidth: 1,
		flexDirection: 'row',
		height: 48,
		justifyContent: 'space-between',
		marginBottom: 20,
		width: '100%',
	},
	password: {
		width: '100%',
		height: '100%',
		padding: 10,
	},
	eyes: {
		right: 5,
		top: 0,
		justifyContent: 'center',
		padding: 2,
		height: '100%',
		position: 'absolute',
		zIndex: 50,
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 6,
		paddingHorizontal: 32,
		borderRadius: 4,
		elevation: 3,
		backgroundColor: 'green',
	},
	text: {
		fontSize: 16,
		lineHeight: 21,
		fontWeight: 'bold',
		letterSpacing: 0.25,
		color: 'white',
	},
	link: {
		color: 'white',
	},
	error: {
		color: 'red',
		fontSize: 16,
		lineHeight: 21,
		letterSpacing: 0.25,
	},
	textButton: {
		alignSelf: 'center',
		fontWeight: 'bold',
		color: Colors.light.tint,
		marginVertical: 10,
	},
});

export default Login;
