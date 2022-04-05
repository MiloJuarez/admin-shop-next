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
            Cookie.set('access_token', access_token.access_token, { expires: 5 });
        }
    };
    return { user, signin };
}
