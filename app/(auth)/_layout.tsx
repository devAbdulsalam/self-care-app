import { useAuth } from '@/context/authContext';
import { Redirect, Stack } from 'expo-router';

export default function AuthLayout() {
	const { session } = useAuth();
	if (session) {
		return <Redirect href={'/'} />;
	}
	return <Stack />;
}
