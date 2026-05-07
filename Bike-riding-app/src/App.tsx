import { useFonts } from 'expo-font';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import RootNavigator from './navigation/RootNavigator';
import { fonts } from './utils/fonts';

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
        <SafeAreaProvider>
            <SafeAreaView style={{flex:1}} edges={['top','bottom']}>
                <RootNavigator/>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default App;