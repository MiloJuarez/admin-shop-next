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

const deleteProduct = async (id) => {
    const response = await axios.delete(endpoints.products.delete(id));
    return response.data;
};

const updateProduct = async (id, body) => {
    const config = {
        headers: {
            accept: '*/*',
            'Content-Type': 'application/json',
        },
    };

    const response = await axios.put(endpoints.products.update(id), body, config);
    return response.data;
};

export { addProduct, deleteProduct, updateProduct };
