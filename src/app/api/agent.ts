import axios, { AxiosResponse } from "axios";
import { request } from "http";
import jwt_decode from "jwt-decode"
import { toast } from "react-toastify";
import { history } from "../..";
import { CartFormValues, WishListFormValues } from "../models/cart";
import { CategoryFormValues } from "../models/category";
import { ReplyMessage, SendMessage } from "../models/chats";
import { ProductFormValues, ProductValues } from "../models/product";
import { CustomerRegistration, IRefreshToken, IUserFormValues } from "../models/user";

axios.defaults.baseURL = "http://localhost:8080/api";

axios.interceptors.request.use(
    (config) => {
        const token = window.localStorage.getItem("jwt");

        if (token) {
            const decoded = JSON.parse(JSON.stringify(jwt_decode(token!)));
            // Get current Date time
            const date = new Date(0);

            // Convert exp time to UTC
            let tokenExpDate = date.setUTCSeconds(decoded.exp);

            // if value of token time greater than
            if (tokenExpDate.valueOf() > new Date().valueOf()) {
                config.headers!.Authorization = `Bearer ${token}`;
              } else {
                window.localStorage.removeItem("jwt");
                window.localStorage.removeItem("refreshToken");
                window.localStorage.removeItem("mToken");
                window.localStorage.removeItem("user");
                window.localStorage.removeItem("profileStatus");
                history.push("/");
                toast.info("Your session has expired, please login again");
              }
        }

        return config;
    }, (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(undefined, (error) => {
    if (String(error).includes("Network Error") || !error) {
        // history.push("/notfound");
        toast.error("Network error");
      }

      const { status, config, headers } = error.response;
      const headerContent: string = `${headers["www-authenticate"]}`;

      if (status === 404) {
        throw error.response;
      }
      if (status === 400 &&
        headerContent.includes('Bearer error="invalid_token"')){
            window.localStorage.removeItem("jwt");
            window.localStorage.removeItem("refreshToken");
            window.localStorage.removeItem("user");
            window.localStorage.removeItem("profileStatus");
            history.push("/");
            toast.info("Your session has expired, please login again");
        }
        if (status === 204){
            toast.info("no content");
        }
        if (status === 400 && config.method === "get") {
            // history.push("/notfound");
          }
          if (status === 204 && config.method === "get") {
            history.push("/notfound");
          }
          if (status === 400 && config.method === "post") {
            toast.error("Problem Submitting data");
          }
          if (status === 500) {
            toast.error("Server error ");
          }
          // toast.error(error.message)
          throw error;
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    postWithoutBody: (url: string) => axios.post(url).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    del: (url: string) => axios.delete(url).then(responseBody),
    postForm: (url: string, request: any) => {
        return axios
        .post(url, request, {
            headers: {"Content-type": "multipart/form-data"},
        })
        .then(responseBody);
    },


};
const User = {
    current: (id: IRefreshToken): Promise<any> =>
    requests.post('/AdminAuthentication/RefreshToken', id),
    login: (user: IUserFormValues): Promise<any> =>
    requests.post('/account/login', user),
    register: (user: CustomerRegistration): Promise<any> =>
    requests.post('/account/register', user),
    get_users: (role: string): Promise<any> =>
    requests.get(`/account/get-users?role=${role}`),
    edit_user: (user: CustomerRegistration): Promise<any> =>
    requests.post('/account/edit-user', user), 
   }


const Category = {
    add_category: (category: CategoryFormValues): Promise<any> =>
    requests.post('/category/add-category', category),
    get_categories: (): Promise<any>  =>
    requests.get('/category/get-categories')
}

const Product = {
    add_product: (product: ProductFormValues): Promise<any> =>
    requests.post('/product/add-product', product),
    get_products: (): Promise<any> =>
    requests.get('/product/get-products'),
    delete_product:(id:number): Promise<any> =>
    requests.post(`/product/${id}/delete`,id)

}

const Cart = {
    add_to_cart: (cart: CartFormValues): Promise<any> =>
    requests.post('/cart/add-to-cart', cart),
    get_cart: (): Promise<any> =>
    requests.get('/cart/get-cart'),
    checkout: (): Promise<any> =>
    requests.post('/cart/check-out', {}),
    delete_cart: (id: number ): Promise<any> =>
    requests.post(`/cart/delete-cart/${id}`, id)
}

const WishList = {
    add_to_wishlist: (wishList: WishListFormValues): Promise<any> =>
    requests.post('/wishlist/add-to-wishlist', wishList),
    get_wishlist: (): Promise<any> =>
    requests.get('/wishlist/get-wishlist'),
    delete_wishlist: (id: number ): Promise<any> =>
    requests.post(`/wishlist/delete-wishlist/${id}`, id)
}

const Orders = {
    get_orders: (): Promise<any> =>
    requests.get("/order/get-orders"),
    cancel_order: (id: number): Promise<any> =>
    requests.put(`/order/cancel/${id}`, id),
    finish_order: (id: number): Promise<any> =>
    requests.put(`/order/finish/${id}`, id)
}

const Chats = {
    get_chat: (): Promise<any> =>
    requests.get("/chat/get-chart"),
    get_chats: (): Promise<any> =>
    requests.get("/chat/get-chats"),
    send_message: (chat: SendMessage): Promise<any> =>
    requests.post("/chat/send-message", chat),
    reply_message: (chat: ReplyMessage): Promise<any> =>
    requests.post("/chat/send-message", chat),
}

const Report = {
    get_daily_reports: (): Promise<any> =>
    requests.get("/report/get-daily-reports"),
    get_montly_reports: (): Promise<any> =>
    requests.get("/report/get-monthly-reports"),
}

const agent = {
    User,
    Category,
    Product,
    Cart,
    WishList,
    Orders,
    Chats,
    Report
}

export default agent;
