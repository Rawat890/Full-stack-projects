import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import { useQueryClient } from '@tanstack/react-query';
import axios from "axios";
import { ReactNode, useContext, useState } from "react";

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
        }
      )
    })
  }
}