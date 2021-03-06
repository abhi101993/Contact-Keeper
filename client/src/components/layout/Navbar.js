
import React,{useContext,Fragment} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/ContactContext';

const Navbar = ({title,icon}) =>
{
    const authContext = useContext(AuthContext);

    const {logout,isAuthenticated} = authContext;

    const contactContext = useContext(ContactContext);

    const {clearContacts} = contactContext;

    const OnLogout =  () => 
    {
        logout();

        clearContacts();
    }

    const authLinks = (

                         <Fragment>
                         <li><a onClick={OnLogout} href='#!'>
                         <i className='fas fa-sign-out-alt'></i> <span className='hide-sm'>Logout</span>
                        </a></li>
                         </Fragment>
    );

    const guestLinks = (

        <Fragment>
        <li><Link to='/register'>Register</Link></li>
        <li><Link to='/login'>Login</Link></li>
        </Fragment>
);




    return (

        <div className="navbar bg-primary">
   
         <h1><i className={icon}/>{title}</h1>

         <ul>
           {isAuthenticated ? authLinks:guestLinks}
         </ul>

        </div>

    );
}


Navbar.defaultProps = 
{
    title: 'Contact Keeper',
    icon: 'fas fa-id-card-alt'

};

Navbar.propTypes = 
{
     
    title: PropTypes.string.isRequired,

    icon: PropTypes.string

};


export default  Navbar;