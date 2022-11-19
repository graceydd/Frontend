import {
  action,
  computed,
  makeAutoObservable,
  observable,
  runInAction,
} from "mobx";
import agent from "../api/agent";
import { history } from "../..";
import { toast } from "react-toastify";
import {
  Customer,
  CustomerRegistration,
  IUserFormValues,
} from "../models/user";
import { RootStore } from "./rootStore";
import { errorMonitor } from "events";

export default class UserStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);

    this.rootStore = rootStore;
  }

  @observable users: Customer[] = [];
  @observable loginVerification: boolean = false;
  @observable loginLoading: boolean = false;
  @observable loginStatus: string = "";
  @observable loadingInitial = false;
  @observable customerStatus = "default";
  @observable customerActivatedStatus = "default";
  @observable customerRegistrationStatus = "default";

  @action setStatus = (x: string) => {
    this.customerStatus = x;
  };
  @action setActivatedStatus = (x: string) => {
    this.customerActivatedStatus = x;
  };
  @action setRegistrationStatus = (x: string) => {
    this.customerRegistrationStatus = x;
  };
  @action setLoadingInitial = (x: boolean) => {
    this.loadingInitial = x;
  };

  @action setLoginLoading = (x: boolean) => {
    this.loginLoading = x;
  };

  @action setLoginVerification = (x: boolean) => {
    this.loginVerification = x;
  };

  @action setLoginStatus = (x: any) => {
    this.loginStatus = String(x);
  };

  @action login = async (values: IUserFormValues) => {
    try {
      console.log(values);
      runInAction(() => {
        this.loginLoading = true;
      });
      const response = await agent.User.login(values);
      // console.log(response);

      if (response) {
        this.clearStorage();
        this.rootStore.commonStore.setToken(response.token);
        this.rootStore.commonStore.setRole(response.role);
        this.rootStore.commonStore.setUser(response);
        console.log(response.role);

        this.loginVerification = response.loginStatus;

        runInAction(() => {
          this.loginLoading = false;
        });
        if (response.role === "CUSTOMER") {
          history.push("/");
        } else {
          history.push("/admin");
        }
      } else {
        console.log(response.token);
      }
    } catch (error) {
      runInAction(() => {
        this.loginLoading = false;
      });
      throw error;
    }
  };
  @action register = async (values: CustomerRegistration) => {
    try {
      runInAction(() => {
        this.customerRegistrationStatus = "loading";
      });

      const request = {
        username: values.username,
        email: values.email,
        password: values.password,
        address: values.address,
        phoneNumber: values.phoneNumber,
      };
      // console.log(request);
      const response = await agent.User.register(request);
      // console.log(response);
      if (response) {
        runInAction(() => {
          this.customerRegistrationStatus = "success";
        });
        toast.success("Registration successful");
      } else {
        runInAction(() => {
          this.customerRegistrationStatus = response.message;
        });
      }
    } catch (error) {
      // console.log(error);
      runInAction(() => {
        this.customerRegistrationStatus = "false";
      });
      // console.log(error)
      // toast.error("Problem Submitting data");
      throw error;
    }
  };

  @action editUsers = async (values: CustomerRegistration) => {
    try {
      runInAction(() => {
        this.customerRegistrationStatus = "loading";
      });

      const request = {
        username: values.username,
        email: values.email,
        password: values.password,
        address: values.address,
        phoneNumber: values.phoneNumber,
      };
      // console.log(request);
      const response = await agent.User.edit_user(request);
      // console.log(response);
      if (response) {
        runInAction(() => {
          this.customerRegistrationStatus = "success";
        });
      } else {
        runInAction(() => {
          this.customerRegistrationStatus = response.message;
        });
      }
    } catch (error) {
      // console.log(error);
      runInAction(() => {
        this.customerRegistrationStatus = "false";
      });
      // console.log(error)
      // toast.error("Problem Submitting data");
      throw error;
    }
  };

  @action getUsers = async () => {
    runInAction(() => {
      this.loginLoading = true;
    });

    try {
      const response = await agent.User.get_users("CUSTOMER");
      console.log(response);
      if (response) {
        this.users = response;
        console.log(this.users);

        runInAction(() => {
          this.loginLoading = false;
        });
      } else {
        runInAction(() => {
          this.loginLoading = false;
        });
      }
    } catch (error) {
      runInAction(() => {
        this.loginLoading = false;
      });
      throw error;
    }
  };

  @action logout = () => {
    runInAction(() => {
      this.loginStatus = "loading";
      //   setTimeout(() => {

      //   }, 2000);
    //   this.rootStore.commonStore.setToken(null);
    //   this.rootStore.commonStore.setRefreshToken(null);
    //   this.rootStore.commonStore.setUser(null);
    //   this.rootStore.commonStore.setProfileStatus(null);
      window.localStorage.removeItem("jwt");
      window.localStorage.removeItem("refreshToken");
      window.localStorage.removeItem("mToken");
      window.localStorage.removeItem("user");
      window.localStorage.removeItem("profileStatus");
      this.setLoginStatus("");
      history.push("/");
    });
  };

  @action clearStorage = () => {
    this.rootStore.commonStore.setToken(null);
    this.rootStore.commonStore.setRefreshToken(null);
    this.rootStore.commonStore.setUser(null);
    this.rootStore.commonStore.setProfileStatus(null);
    window.localStorage.removeItem("jwt");
    window.localStorage.removeItem("refreshToken");
    window.localStorage.removeItem("mToken");
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("profileStatus");
    this.setLoginStatus("");
    history.push("/");
    // history.push("/login");
  };
}
