import axios from 'axios';
import endpoints from '@services/api';

const addProduct = async (body) => {
    const config = {
        headers: {
            accept: '*/*',
            'Content-Type': 'application/json',
        },
    };

    const response = await axios.post(endpoints.products.create, body, config);
    return response.data;
};

export { addProduct };
