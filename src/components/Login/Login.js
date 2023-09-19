import React from 'react';
import LoginForm from './LoginForm';
import Header from '../Header/header';

function Login(){
    return(
        <div className="flex flex-col h-screen">
            <Header/>
            <div className='flex flex-col flex-grow items-center justify-center'>
                <LoginForm/>
            </div> 
        </div>
    )
}

export default Login