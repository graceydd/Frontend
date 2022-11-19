import { RootStore } from "./rootStore";
import {
  observable,
  action,
  reaction,
  makeAutoObservable,
  runInAction,
} from "mobx";
import { Carts, WishListFormValues, WishLists } from "../models/cart";
import Cart from "../../features/cart/cart";
import agent from "../api/agent";
import { toast } from "react-toastify";

export default class WishlistStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  @observable wishlist: WishLists = new WishLists();
  @observable wishlistLoading: boolean = false;

  @action setCartStatus = (x: boolean) => {
    this.wishlistLoading = x;
  };

  @action getWishlist = async () => {
    runInAction(() => {
      this.wishlistLoading = true;
    });

    try {
      const response = await agent.WishList.get_wishlist();

      console.log(response);

      if (response) {
        runInAction(() => {
          this.wishlist = response;
          this.wishlistLoading = false;
        });
      }
    } catch (error) {
      runInAction(() => {
        this.wishlistLoading = false;
      });
      throw error;
    }
  };

  @action deleteWishList = async (productId: number) => {
    try {
      await agent.WishList.delete_wishlist(productId);
      const index = this.wishlist.products.findIndex(
        (x) => x.productId == productId
      );
      this.wishlist.products.splice(index, 1);
    } catch (error) {
      throw error;
    }
  };

  @action addToWishlist = async (form: WishListFormValues) => {
    runInAction(() => {
      this.wishlistLoading = true;
    });
    try {
      const response = await agent.WishList.add_to_wishlist(form);
      console.log(response);

      if (response) {
        runInAction(() => {
          this.getWishlist();
          this.wishlistLoading = false;
        });
        toast.success("Added to Wish List successfully");
      } else {
        runInAction(() => {
          this.wishlistLoading = false;
        });
      }
    } catch (error) {
      runInAction(() => {
        this.wishlistLoading = false;
      });
      throw error;
    }
  };
}
