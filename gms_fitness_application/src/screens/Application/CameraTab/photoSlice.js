import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const PHOTOS_KEY = '@user_photos';

export const loadPhotos = createAsyncThunk(
  'photos/loadPhotos',
  async (email) => {
    try {
      const savedPhotos = await AsyncStorage.getItem(`${PHOTOS_KEY}:${email}`);
      return savedPhotos ? JSON.parse(savedPhotos) : [];
    } catch (error) {
      return [];
    }
  },
);

export const savePhoto = createAsyncThunk(
  'photos/savePhoto',
  async ({ email, photo }) => {
    try {
      const savedPhotos = await AsyncStorage.getItem(`${PHOTOS_KEY}:${email}`);
      const currentPhotos = savedPhotos ? JSON.parse(savedPhotos) : [];
      const updatedPhotos = [...currentPhotos, photo];

      await AsyncStorage.setItem(
        `${PHOTOS_KEY}:${email}`,
        JSON.stringify(updatedPhotos),
      );

      return photo;
    } catch (error) {
      throw error;
    }
  },
);

export const deletePhoto = createAsyncThunk(
  'photos/deletePhoto',
  async ({ email, photoId }) => {
    try {
      const savedPhotos = await AsyncStorage.getItem(`${PHOTOS_KEY}:${email}`);
      const currentPhotos = savedPhotos ? JSON.parse(savedPhotos) : [];
      const updatedPhotos = currentPhotos.filter(photo => photo.id !== photoId);

      await AsyncStorage.setItem(
        `${PHOTOS_KEY}:${email}`,
        JSON.stringify(updatedPhotos),
      );

      return photoId;
    } catch (error) {
      throw error;
    }
  },
);
const photosSlice = createSlice({
  name: 'photos',
  initialState: {
    photos: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadPhotos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadPhotos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.photos = action.payload;
      })
      .addCase(loadPhotos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(savePhoto.fulfilled, (state, action) => {
        state.photos.push(action.payload);
      })
      .addCase(deletePhoto.fulfilled, (state, action) => {
        state.photos = state.photos.filter(photo => photo.id !== action.payload);
      });
  },
});

export default photosSlice.reducer;

