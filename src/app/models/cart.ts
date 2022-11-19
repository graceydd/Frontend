export class CartFormValues {
    productId?: number;
    quantity: number = 1;
}

export class WishListFormValues {
    productId?: number;
    quantity: number = 1;
}

export class CartProducts{
    productId?: number;
    productName: string = "";
    productDescription: string = "";
    productImage: string = "";
    productPrice?: number;
    productStock?: number;
    count?: number;
    categoryId?: number;
}

export class WishlistProducts{
    productId?: number;
    productName: string = "";
    productDescription: string = "";
    productImage: string = "";
    price?: number;
    productStock?: number;
    count?: number;
    categoryId?: number;
}

export class Carts {
    products: CartProducts[] = [];
}

export class WishLists {
    products: WishlistProducts[] = [];
}

export class Orders {
    orderId?: number;
    products: CartProducts[] = [];
    customerId?: number;
    orderAmount?: number;
    customerEmail: string = "";
    customerPhone: string = "";
    orderStatus: number = 0;
    created: string = "";
}