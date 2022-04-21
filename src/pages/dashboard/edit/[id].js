import React, { useEffect, useState } from 'react';

import FormProduct from '@components/FormProduct';
import { useRouter } from 'next/router';
import axios from 'axios';
import endpoints from '@services/api';

export default function Edit() {
    const [product, setProduct] = useState({});
    const router = useRouter();

    useEffect(() => {
        const { id } = router.query;
        if (!router?.isReady) return;
        async function getProduct() {
            const response = await axios.get(endpoints.products.get(id));
            setProduct(response.data);
        }
        getProduct();
    }, [router?.isReady]);

    return <FormProduct product={product} />;
}
