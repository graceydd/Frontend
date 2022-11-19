import { RootStore } from "./rootStore";
import {
    observable,
    action,
    reaction,
    makeAutoObservable,
    runInAction,
  } from "mobx";
  
import { history } from "../..";
import { Orders } from "../models/cart";

import agent from "../api/agent";
import { act } from "react-dom/test-utils";
import { toast } from "react-toastify";

export default class OrderStore{
    rootStore: RootStore

    constructor(rootStore: RootStore){
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    @observable orders: Orders[] = [];
    @observable orderLoading: boolean = false; 
  

    @action setCartStatus = (x: boolean) => {
        this.orderLoading =  x;
    }


    @action getOrders = async () => {
        try{
            const response = await agent.Orders.get_orders();
           
            console.log(response);

            if (response){
                this.orders = response.content;
            }
        }catch (error) {
            throw error;
        }
    }

    @action cancelOrder = async (id: number) => {
        try{
             await agent.Cart.delete_cart(id);
            // const index = this.cart.products.findIndex(x => x.productId == productId)
            // this.cart.products.splice(index, 1);
        } catch (error) {
            throw error;
        }
    }

    @action finishOrder = async (id: number) => {
        runInAction(() => {
            this.orderLoading = true;
        });
        try{
            const response = await agent.Orders.finish_order(id);
            console.log(response)

            if (response === true){
                runInAction(() => {
                    this.orderLoading = true;
                });
                toast.success("Order finished successfully");
            }
            else{
                runInAction(() => {
                    this.orderLoading = true;
                });
            }
        } catch (error) {
            runInAction(() => {
                this.orderLoading = true;
            });
            throw error;
        }
    }

   
}

