import { LightningElement,wire } from 'lwc';
import pubsub from 'c/pubSub' ; 
import getLeadData from '@salesforce/apex/leadClass.getLeadData';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import Status_FIELD from '@salesforce/schema/Lead.Status';
import OutCome_FIELD from '@salesforce/schema/Lead.Outcome__c';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import LEAD_OBJECT from '@salesforce/schema/Lead';
export default class LeadPage extends LightningElement {
    selectedId;
    leadData;
    
    @wire(getObjectInfo, { objectApiName: LEAD_OBJECT })
    objectInfo;

    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: Status_FIELD})
    statuspickListValues;

    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: OutCome_FIELD})
    outComePickListValues;

    connectedCallback(){
        this.regiser();
    }
    regiser(){
        window.console.log('event registered lead ');
        pubsub.register('selectedId', this.handleEvent.bind(this));
    }
    handleEvent(messageFromEvt){
        console.log('event handled lead ',messageFromEvt);
        this.selectedId = messageFromEvt ? messageFromEvt : null;
        console.log('selectedId lead '+this.selectedId);
        this.getLeadData();
    }

    getLeadData()
    {
        console.log('selectedId lead 1 '+this.selectedId);
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
        console.log('leadData lead '+JSON.stringify(this.leadData));
        console.log('error lead '+JSON.stringify(this.error));
    }

    handleChangeOutCome(event)
    {
        console.log('outcome'+event.target.value);
    }
    handleChangeStatus(event)
    {
        console.log('status '+event.target.value);
    }

    saveDetails(event)
    {
        console.log('status '+event.target.value);
    }
}