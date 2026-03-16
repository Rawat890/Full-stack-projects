import { AuthProvider } from './context/AuthContext';
import MainNavigator from './navigation/MainNavigator';

function App() {
  return (
    <AuthProvider>
      <MainNavigator />
    </AuthProvider>
  )
}

export default App;