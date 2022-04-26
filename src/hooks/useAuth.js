import React, { useState, useContext, createContext } from 'react';
import Cookie from 'js-cookie';
import axios from 'axios';
import endpoints from '@services/api';

const AuthContext = createContext();

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    return useContext(AuthContext);
};

function useProvideAuth() {
    const [user, setUser] = useState(null);

    const signin = async (email, password) => {
        const options = {
            headers: {
                accept: '*/*',
                'Content-Type': 'application/json',
            },
        };
        const { data: access_token } = await axios.post(endpoints.auth.login, { email, password }, options);
        if (access_token) {
            const token = access_token.access_token;
            Cookie.set('access_token', token, { expires: 5 });
            axios.defaults.headers.Authorization = `Bearer ${token}`;
            const { data: user } = await axios.get(endpoints.auth.profile);
            setUser(user);
        }
    };

    const logout = () => {
        Cookie.remove('access_token');
        setUser(null);
        delete axios.defaults.headers.Authorization;
        window.location.href = '/login';
    };

    return { user, signin, logout };
}
