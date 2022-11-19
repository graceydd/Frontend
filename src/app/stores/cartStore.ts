import { RootStore } from "./rootStore";
import {
  observable,
  action,
  reaction,
  makeAutoObservable,
  runInAction,
} from "mobx";

import { history } from "../..";
import { CartFormValues, Carts } from "../models/cart";
import Cart from "../../features/cart/cart";
import agent from "../api/agent";
import { act } from "react-dom/test-utils";
import { toast } from "react-toastify";

export default class CartStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  @observable cart: Carts = new Carts();
  @observable cartLoading: boolean = false;
  @observable orderLoading: boolean = false; 

  @action setCartStatus = (x: boolean) => {
    this.cartLoading = x;
  };

  @action getCart = async () => {
    runInAction(() => {
      this.cartLoading = true;
    });
    try {
      const response = await agent.Cart.get_cart();

      console.log(response);

      if (response) {
        runInAction(() => {
          this.cart = response;
          this.cartLoading = false;
        });
      }
    } catch (error) {
      runInAction(() => {
        this.cartLoading = false;
      });
      throw error;
    }
  };

  @action deleteCart = async (productId: number) => {
    try {
      await agent.Cart.delete_cart(productId);
      const index = this.cart.products.findIndex(
        (x) => x.productId == productId
      );
      this.cart.products.splice(index, 1);
    } catch (error) {
      throw error;
    }
  };

  @action addToCart = async (form: CartFormValues) => {
    runInAction(() => {
      this.cartLoading = true;
    });
    try {
      const response = await agent.Cart.add_to_cart(form);
      console.log(response);

      if (response === true) {
        runInAction(() => {
          this.getCart();
          this.cartLoading = false;
        });
        toast.success("Added to Cart successfully");
      } else {
        runInAction(() => {
          this.cartLoading = false;
        });
      }
    } catch (error) {
      runInAction(() => {
        this.cartLoading = false;
      });
      throw error;
    }
  };

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
  @action checkout = async () => {
    runInAction(() => {
      this.cartLoading = true;
    });
    try {
      const response = await agent.Cart.checkout().then((_) => {
        this.finishOrder(1);
        this.cartLoading = false;

        history.push("/confirmation");
      });
    } catch (error) {
      runInAction(() => {
        this.cartLoading = false;
      });
    }
  };
}
