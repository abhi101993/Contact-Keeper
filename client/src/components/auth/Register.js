import {useState,useContext,useEffect} from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext  from '../../context/auth/authContext';


const Register = (props) =>
{
   
   const [user,setUser] = useState({
   name: '',
   email: '',
   password: '',
   password2: ''
   });

  
   const {name,email,password,password2} = user;

   const alertContext = useContext(AlertContext);

   const authContext = useContext(AuthContext);

   const {register, clearErrors, error,isAuthenticated} = authContext;

   useEffect(() => {
    
    if(isAuthenticated)
    {
      //Redirect to home

       props.history.push('/');

    }

    if(error=== 'User already exist with above email')
     {
       setAlert(error,'danger');

       clearErrors();
     }
  
     // eslint-disable-next-line

   },[error,isAuthenticated,props]);

   const {setAlert} = alertContext

   const onChange = e => setUser({...user,[e.target.name]:e.target.value});

   const onSubmit = e => 
   {
       e.preventDefault();

       if(name==='' || email==='' || password==='')
       {
         setAlert('Please enter all fields','danger');
       }
       else if (password!==password2)
       {
         setAlert('Password do not match')
       }

       else
       {

        register({
          
         name,
         email,
         password

        });

       }
   }

   return (
            <div className='formContainer'>

            <h1>Account <span className='text-primary'>Register</span></h1>

            <form onSubmit={onSubmit}>
              
              <div className='form-group'>
                <label htmlFor='name'>Name</label>
                <input type='text' name='name' value={name} onChange={onChange}
                 required />
              </div>

              <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input type='email' name='email' value={email} onChange={onChange}
                required />
              </div>

              
              <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input type='password' name='password' value={password} onChange={onChange}
                required minLength='6'/>
              </div>

                          
              <div className='form-group'>
                <label htmlFor='password2'>Confirm Password</label>
                <input type='password' name='password2' value={password2} onChange={onChange}
                required minLength='6'/>
              </div>

             <input type='submit' value='Register' className='btn btn-primary btn-block'/>

            </form>
            
            </div>

             

   );

}


export default Register;