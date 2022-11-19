import { RootStore } from "./rootStore";
import {
    observable,
    action,
    reaction,
    makeAutoObservable,
    runInAction,
  } from "mobx";
import { DropDownOption, ProductFormValues, ProductValues } from "../models/product";
import agent from "../api/agent";
import { toast } from "react-toastify";

import { history } from "../..";
import { Category, CategoryFormValues } from "../models/category";

export default class ProductStore{
    rootStore: RootStore

    constructor(rootStore: RootStore){
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    @observable products: ProductValues[] = [];
    @observable productLoading: boolean = false; 
    @observable categories: Category[] = [];
  

    @observable categoriesDropDown: DropDownOption[] = [];

    @action setProductStatus = (x: boolean) => {
        this.productLoading =  x;
    }



    @action getProducts =async () => {
        runInAction(() => {
            this.productLoading = true;
        });

        try{
            const response = await agent.Product.get_products();
            console.log(response);
            if (response){
                this.products = response.content;
                console.log(this.products[0]);

                runInAction(() => {
                    this.productLoading = false;
                });
            }
            else{
                
                runInAction(() => {
                    this.productLoading = false;
                });
            }
        } catch (error) {
            runInAction(() => {
                this.productLoading = false;
            });
            throw error;
        }
    };
    @action getCategories =async () => {
        runInAction(() => {
            this.productLoading = true;
            this.categoriesDropDown = []
            this.categories = []
        });

        try{
            const response = await agent.Category.get_categories();
            console.log(response);
            if (response){

                this.categories = response;
                this.categories.map((category,index)=>{
                    var dropdown = new DropDownOption();
                    dropdown.key = String(index);
                    dropdown.text = category.categoryName;
                    dropdown.value = category.categoryName;

                    return this.categoriesDropDown.push(dropdown)
                })
                console.log(this.categories);

                runInAction(() => {
                    this.productLoading = false;
                });
            }
            else{
                
                runInAction(() => {
                    this.productLoading = false;
                });
            }
        } catch (error) {
            runInAction(() => {
                this.productLoading = false;
            });
            throw error;
        }
    };

    @action addProducts = async (values: ProductFormValues) => {
        try {

            runInAction(() => {
                this.productLoading = true
            });

            const request = {
                categoryId: 1,
                price: values.price,
                productDescription: values.productDescription,
                productImage: values.productImage,
                productName: values.productName,
                productStatus:values.productStatus,
                productStock: values.productStock
            }
            // console.log(request);
            const response = await agent.Product.add_product(request);
            console.log(response);
            if (response) {
                toast.success("Added product successfully")
                runInAction(() => {
                    this.productLoading = false;
                });

            } else {
                runInAction(() => {
                    this.productLoading = false;
                });


            }

        } catch (error) {
            // console.log(error);
            runInAction(() => {
                // this.customerRegistrationStatus = "false";
            });
            // console.log(error)
            toast.error("Problem Submitting data");
            throw error;
        }
    };

    @action addCategory = async (values: CategoryFormValues) => {
        try {

            runInAction(() => {
                // this.customerRegistrationStatus = "loading";
            });

            const request = {
                categoryName: values.categoryName,
                
            }
            console.log(request)
            // console.log(request);
            const response = await agent.Category.add_category(request);
            console.log(response);
            if (response) {
                toast.success("Added category successfully")
                runInAction(() => {
                    // this.customerRegistrationStatus = "success";
                });

            } else {
                runInAction(() => {
                    // this.customerRegistrationStatus = response.message;
                });


            }

        } catch (error) {
            // console.log(error);
            runInAction(() => {
                // this.customerRegistrationStatus = "false";
            });
            // console.log(error)
            toast.error("Problem Submitting data");
            throw error;
        }
    };

    @action deleteProduct = async (id: number) => {
        try {
          await agent.Product.delete_product(id);
          history.push('/admin/products')
          const index = this.products.findIndex(
            (x) => x.productId === id
          );
          this.products.splice(index, 1);
        } catch (error) {
          throw error;
        }
      };
    
}


