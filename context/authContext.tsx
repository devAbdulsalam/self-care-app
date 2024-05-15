import {
	PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';
import { supabase } from '../utils/supabase';

type AuthData = {
	session: string | null;
	profile: any;
	loading: boolean;
	isAdmin: boolean;
};

const AuthContext = createContext<AuthData>({
	session: null,
	loading: true,
	profile: null,
	isAdmin: false,
});

export default function AuthProvider({ children }: PropsWithChildren) {
	const [session, setSesion] = useState<string | null>(null);
	const [profile, setProfile] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchSession = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();
			setSesion(session);

			if (session) {
				// fetch profile
				// setProfile(session?.user);
			}

			setLoading(false);
		};

		fetchSession();
		supabase.auth.onAuthStateChange((_event, session) => {
			setSesion(session);
		});
	}, []);

	return (
		<AuthContext.Provider value={{ session, loading, profile, isAdmin: false }}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => useContext(AuthContext);
