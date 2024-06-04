import * as api from '../api/index.js'
import { AUTH, GET_USER } from '../constants/actionTypes.js';

export const signIn = (formData, navigate) => async(dispatch) => {
    try {
        const { data } = await api.signIn(formData);
        dispatch({ type: AUTH, data });
        navigate('/');
    } catch (error) {
        console.log(error);
        navigate('/error')
    }
}

export const signUp = (formData, navigate) => async(dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        dispatch({ type: AUTH, data });
        navigate('/');
    } catch (error) {
        console.log(error);
        navigate('/error')
    }
}

export const getUser = (id, navigate) => async(dispatch) => {
    try {
        const { data } = await api.getUser(id)
        dispatch({ type: GET_USER, payload: data})
    } catch (error) {
        console.log(error)
        navigate('/error')
    }
}