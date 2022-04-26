import * as yup from 'yup';

const MIN_TITLE_LETTERS = 4;
const MIN_DESC_LETTERS = 15;

let ProductRegisterSchema = yup.object().shape({
    title: yup.string().required(`The title field is required`).min(MIN_TITLE_LETTERS, `The title must have at least ${MIN_TITLE_LETTERS} letters`),
    price: yup.number().required('The price field is required').min(1, 'The Price must be greater or equal to 1').positive('The price must be positive'),
    description: yup.string().required(`The description field is required`).min(MIN_DESC_LETTERS, `The description must have at least ${MIN_DESC_LETTERS} letters`),
    categoryId: yup.number().required('The category is required'),
    images: yup.array().of(yup.string()).required('The image field is required').length(1, 'Select at least one image'),
});

let ProductUpdateSchema = yup.object().shape({
    title: yup.string().required(`The title field is required`).min(MIN_TITLE_LETTERS, `The title must have at least ${MIN_TITLE_LETTERS} letters`),
    price: yup.number().required('The price field is required').min(1, 'The Price must be greater or equal to 1').positive('The price must be positive'),
    description: yup.string().required(`The description field is required`).min(MIN_DESC_LETTERS, `The description must have at least ${MIN_DESC_LETTERS} letters`),
    categoryId: yup.number().required('The category is required'),
});

export { ProductRegisterSchema, ProductUpdateSchema };
