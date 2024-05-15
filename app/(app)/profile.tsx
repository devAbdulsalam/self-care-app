import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { supabase } from '@/utils/supabase';
import Button from '@/components/Button';
import { router } from 'expo-router';
import Loader from '@/components/Loader';

const settings = () => {
	const [isLoading, setIsLoading] = useState(false);

	const logOut = async () => {
		setIsLoading(true);
		await supabase.auth.signOut();
		setIsLoading(false);
		router.push('/login');
	};
	if (isLoading) {
		return <Loader />;
	}
	return (
		<View>
			<Text>settings</Text>
			<Button text="Log out" onPress={logOut} />
		</View>
	);
};

export default settings;

const styles = StyleSheet.create({});
