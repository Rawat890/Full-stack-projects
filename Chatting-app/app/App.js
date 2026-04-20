import { AuthProvider } from './context/AuthContext';
import { SocketContextProvider } from './context/SocketContext';
import MainNavigator from './navigation/MainNavigator';

function App() {
  
  return (
    <AuthProvider>
      <SocketContextProvider>
      <MainNavigator />
      </SocketContextProvider>
    </AuthProvider>
  )
}

export default App;