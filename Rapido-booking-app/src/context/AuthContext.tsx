import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from "axios";
import { ReactNode, useContext, useState } from "react";
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

const AuthContext = useContext<AuthContextType | undefined>(undefined);

const api = axios.create({
  baseURL: "http://localhost:3000/api"
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
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude, address })
        },
        (error) => {
          Logger.error("Geolocation error - ", error)
          reject(new Error("Failed to fetch location"))
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      )
    })
  }

  const registerMutation = useMutation({
    mutationFn: async ({ email, password, phone }: { email: string; password: string; phone: string }) => {
      const location = fetchLocation();
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
        throw new Error("************User data not found***********")
      }
    },
    onError: (error) => Logger.error("Registration failed", error)
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
        throw new Error("************User data not found***********")
      }
    },
    onError: (error) => Logger.error("Registration failed", error)
  })

  const login = async (email:string, password:string) => {
    await loginMutation.mutateAsync({email, password});
  }

  const register = async (email:string, password:string, phone:string) => {
    await registerMutation.mutateAsync({email, password, phone});
  }

  const logout = async()=>{
    setUser(null);
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    queryClient.clear();
    Logger.info("User logged out successfully")
  }
}