
import {useReducer} from 'react';

import authReducer from './authReducer';

import AuthContext from './authContext';

import axios from 'axios';

import {REGISTER_SUCCESS,REGISTER_FAIL,CLEAR_ERRORS,USER_LOADED,AUTH_ERROR,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT} from '../types';

import setAuthToken from '../../utils/setAuthToken';

const AuthState = (props) =>
{
  
    const initialState = 
    { 
      token: localStorage.getItem('token'),
      isAuthenticated: null,
      user: null,
      loading: true,
      error: null
    };


    const [state,dispatch] = useReducer(authReducer,initialState);


    //REGISTER USER

    const register = async (formData) => 
    {
      
      const config = 
      {
        header : 
        {

        'content-type' : 'application/json'
        }
      }


      try {

        const res = await axios.post('/api/users',formData,config);

        dispatch({
         
        type: REGISTER_SUCCESS,

        payload: res.data
        
        });

        loadUser();
        
      } catch (err) {
        
        dispatch({

        type: REGISTER_FAIL,
        payload: err.response.data.msg

        })
      }

    }

  //LOGIN USER 

  const login = async formData => 
  {

     const config = 
     {
       header : 
       {
         'content-type': 'application/json'

       }
     };


     try {

      const res = await axios.post('/api/auth',formData,config);

      dispatch({

      type: LOGIN_SUCCESS,
      payload: res.data  

      });

      loadUser();
       
     } catch (error) {
       
      
      dispatch({

      type:LOGIN_FAIL,
      payload:error.response.data.message

      })

     }

  }

  //LOGOUT USER

  const logout = () => 
  {

    dispatch({
    type: LOGOUT
    });

  }

    const clearErrors = () => 
    {
      dispatch({
      
      type: CLEAR_ERRORS

      });
    }


   // LOAD USER

   const loadUser = async () => 
   {
      if(localStorage.token)
      {
        setAuthToken(localStorage.token);
      }
     
      try {
        
      const res = await axios.get('/api/auth');

      dispatch({
      
      type: USER_LOADED,
      payload: res.data

      });

      } catch (err) {

      
      dispatch({
     
        type: AUTH_ERROR

      })
        
      }

   }

    return (

     <AuthContext.Provider value={{
      
     token: state.token,
     user: state.user,
     loading: state.loading,
     error: state.error,
     isAuthenticated: state.isAuthenticated,
     register,
     clearErrors,
     loadUser,
     login,
     logout

     }}>

      {props.children}   

     </AuthContext.Provider>
 

    )
  
  

}


export default AuthState;