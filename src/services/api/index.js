const API = process.env.NEXT_PUBLIC_API_URL;
const VERSION = process.env.NEXT_PUBLIC_API_VERSION;

const endpoints = {
    auth: {
        login: `${API}/${VERSION}/auth/login`,
        profile: `${API}/${VERSION}/auth/profile`,
    },
    categories: {
        list: `${API}/${VERSION}/categories`,
        create: `${API}/${VERSION}/categories`,
        get: (id) => `${API}/${VERSION}/categories/${id}`,
        update: (id) => `${API}/${VERSION}/categories/${id}`,
        categoryProducts: (id) => `${API}/${VERSION}/categories/${id}/products`,
    },
    files: {
        upload: `${API}/${VERSION}/files/upload`,
        get: (filename) => `${API}/${VERSION}/files/${filename}`,
    },
    products: {
        list: `${API}/${VERSION}/products`,
        paginate: (limit = 10, offset = 1) => `${API}/${VERSION}/products?limit=${limit}&offset=${offset}`,
        get: (id) => `${API}/${VERSION}/products/${id}`,
        create: `${API}/${VERSION}/products`,
        update: (id) => `${API}/${VERSION}/products/${id}`,
        delete: (id) => `${API}/${VERSION}/products/${id}`,
    },
    users: {
        list: `${API}/${VERSION}/users`,
        create: `${API}/${VERSION}/users`,
        isAvailable: `${API}/${VERSION}/users/is-available/`,
    },
};

export default endpoints;
