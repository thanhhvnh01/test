import axios from "./base";

//* home section

// image
export const getImagesAPI = async () => {
  return axios.get(`${process.env.REACT_APP_API_URL}/covers/all-enabled`, { __auth: false });
};

// dropdown
export const getProductForHomePageAPI = async (lang) => {
  return axios.get(`${process.env.REACT_APP_API_URL}/categories/product-types?lang=${lang}`, { __auth: false });
};
// best sale products
export const getBestSaleProductsAPI = async (lang) => {
  return axios.get(`${process.env.REACT_APP_API_URL}/products/best-selling?lang=${lang}`, { __auth: false });
};
// supporter
export const getSupportersAPI = async (pageSize, pageNumber) => {
  return axios.get(
    `${process.env.REACT_APP_API_URL}/supporters/all-enabled?pageSize=${pageSize}&pageNumber=${pageNumber}`,
    { __auth: false }
  );
};

// subscriber
export const subscribeNewMemberAPI = async (email) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/subscribers`, email, { __auth: false });
};

// * end home section

// * product section
// category
export const getCategoriesAPI = async (lang) => {
  return axios.get(`${process.env.REACT_APP_API_URL}/categories/all-enabled?lang=${lang}`);
};

// product type
export const getProductTypesAPI = async (categoryId, lang) => {
  return axios.get(`${process.env.REACT_APP_API_URL}/product-types/all-enabled?categoryId=${categoryId}&lang=${lang}`);
};

// color
export const getColorAPI = async (lang) => {
  return axios.get(`${process.env.REACT_APP_API_URL}/colors/all-enabled?lang=${lang}`);
};

// product
export const getProductsAPI = async (pageSize, pageNumber, orderByTypeId, orderBy, keyword = "", lang, data) => {
  return axios.post(
    `${
      process.env.REACT_APP_API_URL
    }/products/all-enabled?pageSize=${pageSize}&pageNumber=${pageNumber}&keyword=${encodeURI(
      keyword
    )}&lang=${lang}&orderByTypeId=${orderByTypeId}&orderBy=${orderBy}`,
    data
  );
};

export const getProductDetailsAPI = async (productId, lang) => {
  return axios.get(`${process.env.REACT_APP_API_URL}/products/${productId}?productId=${productId}&lang=${lang}`);
};

export const getRelateProductAPI = async (pageSize, pageNumber, productId, lang) => {
  return axios.post(
    `${process.env.REACT_APP_API_URL}/products/${productId}/related?&lang=${lang}&pageSize=${pageSize}&pageNumber=${pageNumber}`
  );
};
// * end product section

// * contact section

export const sendMessageAPI = async (data) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/contacts`, data);
};

// * end contact section
