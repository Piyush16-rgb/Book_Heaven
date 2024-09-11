export const SET_USER_EMAIL = 'SET_USER_EMAIL';

export const setUserEmail = (email: string) => ({
    type: SET_USER_EMAIL,
    payload: email,
});