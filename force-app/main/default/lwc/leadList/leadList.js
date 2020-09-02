import { LightningElement, wire,api } from 'lwc';
import getLeads from '@salesforce/apex/leadClass.getLeads';
import pubsub from 'c/pubSub'; 
export default class LeadList extends LightningElement {
    leads; error;
    @api selectedId;
   

    @wire(getLeads)
    wiredLeads({ error, data }) {
        if (data) {
            this.leads = data;
           console.log(JSON.stringify(this.leads));
        } else if (error) {
            console.log(error);
            this.error = error;
        }
    }
  
    
    getChecked(event) {
        if (event.target.checked)
        { 
            
          this.template.querySelectorAll('lightning-input').forEach(element => {
              if(!element.checked)
               element.disabled = true;
            });
            
         console.log('data checked ' + event.target.value);
            this.selectedId=event.target.value;
        }
        else
        {
            this.template.querySelectorAll('lightning-input').forEach(element => {
                element.disabled = false;
              });
            console.log('unchecked');
            this.selectedId=null;
        }

        console.log('Event Firing..... ');
        pubsub.fire('selectedId', this.selectedId );
        console.log('Event Fired ');

    }
}