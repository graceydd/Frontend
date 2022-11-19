import { throws } from "assert";
import { configure } from "mobx";
import { createContext } from "react";
import CartStore from "./cartStore";
import CommonStore from "./commonStore";
import MessageStore from "./message";
import OrderStore from "./orderStore";
import ProductStore from "./productStore";
import ReportStore from "./reportStore";
import UserStore from "./userStore";
import WishlistStore from "./wishlistStore";

configure({enforceActions: "always"});

export class RootStore {
    userStore: UserStore;
    commonStore: CommonStore;
    productStore: ProductStore;
    cartStore: CartStore;
    wishListStore: WishlistStore;
    orderStore: OrderStore;
    messageStore: MessageStore;
    reportStore: ReportStore;



    constructor() {
        this.userStore = new UserStore(this)
        this.commonStore = new CommonStore(this)
        this.productStore = new ProductStore(this);
        this.cartStore = new CartStore(this);
        this.wishListStore = new WishlistStore(this);
        this.orderStore = new OrderStore(this);
        this.messageStore = new MessageStore(this);
        this.reportStore = new ReportStore(this);

    }
}

export const RootStoreContext = createContext(new RootStore());