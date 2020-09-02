public with sharing class leadClass {
    public leadClass() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Lead> getLeads()
    {
        return [SELECT Id, Id__c,Name, Source__c, Outcome__c, Assigned_To_Dealership__c, Prospect__c,Prospect__r.Name, Model_Photo__c,
        Type__c, Model__c, Description, Consultant__c, Consultant__r.Name, Status, CreatedDate FROM Lead WHERE Model__c!=null];
    }
    
    @AuraEnabled(cacheable=false)
    public static Lead getLeadData(Id leadId)
    {
        return [SELECT Id, Id__c,Name, Source__c, Outcome__c, Assigned_To_Dealership__c, Prospect__c,Prospect__r.Name,Model_Photo__c,
                Prospect__r.Mobile__c,Prospect__r.Preferred_Contact_Method__c ,Prospect__r.Customer_Id__c,Prospect__r.Email__c,
        Type__c, Model__c, Description, Consultant__c, Consultant__r.Name, Status, CreatedDate FROM Lead WHERE Id=:leadId];
    }
    
    
    
    
    
}