import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AuthProvider } from './context/AuthContext';
import RootNavigator from './navigation/RootNavigator';
import { fonts } from './utils/fonts';

const queryClient = new QueryClient();
function App() {

    const [loaded] = useFonts({
        [fonts.notoBold]: require('../assets/fonts/NotoSans-Bold.ttf'),
        [fonts.notoMedium]: require('../assets/fonts/NotoSans-Medium.ttf'),
        [fonts.notoRegular]: require('../assets/fonts/NotoSans-Regular.ttf'),
        [fonts.notoSemi]: require('../assets/fonts/NotoSans-SemiBold.ttf'),
    })

    if (!loaded) {
        return null;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <SafeAreaProvider>
                    <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
                        <RootNavigator />
                    </SafeAreaView>
                </SafeAreaProvider>
            </AuthProvider>
        </QueryClientProvider>
    )
}

export default App;