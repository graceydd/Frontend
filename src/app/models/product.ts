export class ProductFormValues {
    categoryId: number = 1;
    price: string = "";
    productDescription: string = "";
    productImage: string = "";
    productName: string = "";
    productStatus: number = 0;
    productStock: number = 0;
}

export class ProductValues {
    productId?: number;
    categoryId: number = 1;
    price: string = "";
    productDescription: string = "";
    productImage: string = "";
    productName: string = "";
    productStatus: number = 0;
    productStock: number = 0;
}

export class DropDownOption{
    key: string = "";
    text: string = "";
    value: string = "";
}