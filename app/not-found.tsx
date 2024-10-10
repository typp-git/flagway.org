import React from 'react';

const NotFound: React.FC = () => {
    return (
        <div className='flex items-center justify-center min-h-[75vh]'>
            <div className='text-center space-y-4'>
                <h1>oops! 404</h1>
                <p>the page you are looking for does not exist.</p>
                <p><a href='/'>go back home</a></p>
                
            </div>
        </div>
    );
};

export default NotFound;