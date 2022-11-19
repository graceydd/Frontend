import { RootStore } from "./rootStore";
import {
  observable,
  action,
  reaction,
  makeAutoObservable,
  runInAction,
} from "mobx";
import agent from "../api/agent";
import { toast } from "react-toastify";
import { Report, ReportProduct } from "../models/report";

export default class ReportStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  @observable products: ReportProduct[] = [];
  @observable productLoading: boolean = false;
  @observable report: Report[] = [];

  @action getDailyReports = async () => {
    runInAction(() => {
      this.productLoading = true;
    });

    try {
      const response = await agent.Report.get_daily_reports();
      console.log(response);
      if (response) {
        this.products = response.products;
        console.log(this.products[0]);

        runInAction(() => {
          this.productLoading = false;
        });
      } else {
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
  @action getMonthlyReports = async () => {
    runInAction(() => {
      this.productLoading = true;
    });

    try {
      const response = await agent.Report.get_montly_reports();
      console.log(response);
      if (response) {
        this.report = response;
        console.log(this.report);

        runInAction(() => {
          this.productLoading = false;
        });
      } else {
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
}
