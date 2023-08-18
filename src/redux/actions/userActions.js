export const SET_USER_DATA = 'SET_USER_DATA';
export const UPDATE_PROFILE_PICTURE = 'UPDATE_PROFILE_PICTURE';
export const SET_LOADING = 'SET_LOADING';

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
