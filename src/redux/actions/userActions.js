export const SET_USER_DATA = 'SET_USER_DATA';
export const UPDATE_PROFILE_PICTURE = 'UPDATE_PROFILE_PICTURE';
export const SET_LOADING = 'SET_LOADING'; 
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUser } from '../../utils/helpers';
 
export const fetchUserDataAsync = createAsyncThunk(
  'user/fetchUserData',
  async (userId, thunkAPI) => {
    try {
      // Fetch user data using the API call
      const fetchedUserData = await getUser(userId);
      return fetchedUserData;
    } catch (error) {
      // You can handle errors here
      throw error;
    }
  }
);

export const setUserData = (userData) => ({
  type: SET_USER_DATA,
  payload: userData,
});

export const updateProfilePicture = (profilePicture) => ({
  type: UPDATE_PROFILE_PICTURE,
  payload: profilePicture,
});

export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: isLoading,
});
