import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(AsyncStorage.getItem("authToken") || null);
  const [authUser, setAuthUser] = useState()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("authToken");

        if (storedToken) {
          setToken(storedToken);

          const decodedToken = jwtDecode(storedToken);
          setUserId(decodedToken.userId);
        }
      } catch (error) {
        console.log("Auth loading error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, userId, loading, setAuthUser, authUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
