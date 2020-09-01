import { LightningElement } from 'lwc';
import pubsub from 'c/pubSub' ; 
import getLeadData from '@salesforce/apex/leadClass.getLeadData';
export default class AccountPage extends LightningElement {
    selectedId;
    leadData;
    connectedCallback(){
        this.regiser();
    }
    regiser(){
        console.log('event registeredAcc ');
        pubsub.register('selectedId', this.handleEvent.bind(this));
    }
    handleEvent(messageFromEvt){
        console.log('event handledAcc ',messageFromEvt);
        this.selectedId = messageFromEvt ? messageFromEvt : null;
        console.log('selectedIdAcc '+this.selectedId);
        this.getLeadData();
    }

    getLeadData()
    {
        console.log('selectedIdAcc1 '+this.selectedId);
        if(this.selectedId!=null)
        {
            getLeadData({leadId:this.selectedId}).then(result => {
                this.leadData = result;
                this.error = undefined;
            }).catch(error=>{
                this.error = error;
                this.leadData = undefined;
                 
            })
        }
        else
        {
            console.log('in else lead');
            this.leadData=null;
        }
        console.log('leadDataAcc '+JSON.stringify(this.leadData));
        console.log('errorAcc '+JSON.stringify(this.error));
    }
}