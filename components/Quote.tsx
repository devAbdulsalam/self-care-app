import { View, Text } from 'react-native';

const Quotes = ({ quote }) => {
	return (
		<View>
			<Text>{quote}</Text>
			{/* <Text className="text-2xl font-bold text-gray-50 animate-bounce">
				{quote.author}
			</Text> */}
		</View>
	);
};

export default Quotes;
