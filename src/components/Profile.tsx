import * as React from 'react';
import { User } from 'firebase';
const Gravatar = require('react-gravatar');

import { ExtendedRouteProps } from '../routes';
import { logout } from '../util/auth';

interface ProfileProps extends ExtendedRouteProps {
    user?: User;
}
const avatarStyle = {
    borderRadius: '50%',
    height: 75,
    width: 75
}

const getAvatar = (user: User) => {
    if(user.photoURL) {
        return (
            <img src={user.photoURL} style={avatarStyle} />
        )
    } else if(user.providerData.length) {
        const photoURL = user.providerData[0].photoURL;
        return (
            <img src={photoURL} style={avatarStyle} />
        )
    } else {
        <Gravatar email={user.email} style={avatarStyle} />
    }
}

export default function Profile(props: ProfileProps) {
    const { user } = props;
    return (
        <div className='container'>
            <div className='column is-half is-offset-one-quarter'>
                <div className='box'>
                    <div className='has-text-centered'>
                        {getAvatar(user)}
                    </div>
                    <h3 className='title is-3'>
                        Hello {user.displayName || user.email}!
                    </h3>
                    <button className='button is-outlined' onClick={() => logout()}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    )
}
