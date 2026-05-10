import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from "axios";
import * as Location from 'expo-location';
import { createContext, ReactNode, useContext, useState } from "react";
import Logger from '../utils/logger';

interface UserData {
  id: string,
  email: string;
  phone?: string;
  profilePic?: string;
  location: { latitude: number; longitude: number; address: string }
  ridesDone: number
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserData | null;
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>;
  register: (email: string, password: string, phone: string) => Promise<void>
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const api = axios.create({
  baseURL: "http://10.169.128.7:3000/api"
})

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config;
  },
  (error) => Promise.reject(error)
)


export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const queryClient = useQueryClient();

  const fetchLocation = async (): Promise<{ latitude: number; longitude: number; address: string }> => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      throw new Error("Location permission denied");
    }

    const position = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    const { latitude, longitude } = position.coords;

    // Reverse geocode to get a human-readable address
    const [place] = await Location.reverseGeocodeAsync({ latitude, longitude });
    const address = place
      ? [place.name, place.street, place.city, place.region]
        .filter(Boolean)
        .join(', ')
      : `${latitude}, ${longitude}`;

    return { latitude, longitude, address };
  }

  const registerMutation = useMutation({
    mutationFn: async ({ email, password, phone }: { email: string; password: string; phone: string }) => {
      const location = await fetchLocation();  // was missing await in original
      const response = await api.post("/register", { email, password, phone, location });
      return response.data;
    },
    onSuccess: (data) => {
      if (data.user) {
        setUser(data.user);
        AsyncStorage.setItem('token', data.token);
        AsyncStorage.setItem('user', JSON.stringify(data.user));
        queryClient.setQueriesData(['user'], data.user);
      } else {
        throw new Error("User data not found")
      }
    },
    onError: (error: any) => {
      console.log(
        "BACKEND ERROR:",
        error?.response?.data
      );
    }
  });

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const response = await api.post("/login", { email, password });
      return response.data;
    },
    onSuccess: (data) => {
      if (data.user) {
        setUser(data.user);
        AsyncStorage.setItem('token', data.token);
        AsyncStorage.setItem('user', JSON.stringify(data.user));
        queryClient.setQueriesData(['user'], data.user);
      } else {
        throw new Error("User data not found")
      }
    },
    onError: (error) => Logger.error("Login failed", error)
  })

  const login = async (email: string, password: string) => {
    await loginMutation.mutateAsync({ email, password });
  }

  const register = async (email: string, password: string, phone: string) => {
    await registerMutation.mutateAsync({ email, password, phone });
  }

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    queryClient.clear();
    Logger.info("User logged out successfully")
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context;
}