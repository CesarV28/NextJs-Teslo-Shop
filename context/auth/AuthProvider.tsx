import { FC, useEffect, useReducer } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { AuthContext, authReducer } from './';

import { tesloApi } from '@/api';

import { IUser } from '@/interfaces';


export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser;
}

interface Props {
    children: JSX.Element | JSX.Element[]
}


const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
}


export const AuthProvider:FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer( authReducer, AUTH_INITIAL_STATE);

  useEffect(() => {
    checkAuthToken();
  }, []);

  const checkAuthToken = async() => {

    try {
        const { data } = await tesloApi.get('/user/validate-token');
        const { user } = data;
        dispatch({ type: '[Auth] - Login', payload: user });
    } catch (error) {
        Cookies.remove('token');
    }
  }

  const loginUser = async( email: string, password: string ): Promise<boolean> => {
   
    try {
        const { data } = await tesloApi.post('/user/login', { email, password });
        const { token, user } = data;
        Cookies.set('token', token);
        dispatch({ type: '[Auth] - Login', payload: user });
        return true;
    } 
    
     catch (error) {
        return false;
    }
  }

  const registerUser = async( name: string, email: string, password: string ): Promise<{ hasError: boolean, message?: string }> => {

    try {
        const { data } = await tesloApi.post('/user/register', { name, email, password });
        const { token, user } = data;
        Cookies.set('token', token);
        dispatch({ type: '[Auth] - Login', payload: user });
        return {
            hasError: false,
        };
    } 
    
     catch (error) {
        if( axios.isAxiosError(error) ) {
            return {
                hasError: true,
                message: error.response?.data.message || 'Something went wrong'
            }
        }
        return {
            hasError: true,
            message: 'No se pudo registrar'
        };
    }
  }

  return (
      <AuthContext.Provider value={{
            ...state,

            // Methods
            loginUser,
            registerUser,
      }}>
            { children }
      </AuthContext.Provider>
    )
}