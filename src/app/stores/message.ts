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
import { Chats, ReplyMessage, SendMessage } from "../models/chats";

export default class MessageStore{
    rootStore: RootStore

    constructor(rootStore: RootStore){
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    @observable chat: Chats = new Chats;
    @observable chats: Chats[] = [];
    @observable chatLoading: boolean = false; 
    @observable stomp: any


    @action setCartStatus = (x: boolean) => {
        this.chatLoading =  x;
    }


    @action getChat = async () => {
        try{
            const response = await agent.Chats.get_chat();
           
            console.log(response);

            if (response){
                this.chat = response;
            }
        }catch (error) {
            throw error;
        }
    }

    @action getChats = async () => {
        try{

             const response = await agent.Chats.get_chats();

             console.log(response);

             if (response){

             }

        } catch (error) {
            throw error;
        }
    }

    @action sendMessage = async (values: SendMessage) => {
        runInAction(() => {
            this.chatLoading = true;
        });
        try{

            const response = await agent.Chats.send_message(values);
            console.log(response)

            if (response){
                runInAction(() => {
                    this.chatLoading = true;
                });
                toast.success("Message sent");
            }
            else{
                runInAction(() => {
                    this.chatLoading = true;
                });
            }
        } catch (error) {
            runInAction(() => {
                this.chatLoading = true;
            });
            throw error;
        }
    }

    @action replyMessage = async (values: ReplyMessage) => {
        runInAction(() => {
            this.chatLoading = true;
        });
        try{

            const response = await agent.Chats.reply_message(values);
            console.log(response)

            if (response){
                runInAction(() => {
                    this.chatLoading = true;
                });
                toast.success("Message sent");
            }
            else{
                runInAction(() => {
                    this.chatLoading = true;
                });
            }
        } catch (error) {
            runInAction(() => {
                this.chatLoading = true;
            });
            throw error;
        }
    }

   
}

