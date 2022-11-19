export class Report{
    reportId?: number;
    products: ReportProduct[] =
[]}

export class ReportProduct {
    productId?: number;
    categoryId?: number;
    productPrice: string = "";
    productDescription: string = "";
    productImage: string = "";
    productName: string = "";
    productStatus: number = 0;
    productStock: number = 0;
    count?: number;
}
