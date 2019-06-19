/**
 * A transaction processor function that allows one to create an instance of a Retailer
 * @param{org.perishable.CreateRetailer} tx
 * @transaction
 */

async function createRetailer(tx){
    const NS = "org.perishable";
    const factory = getFactory();

    var retailer1 = factory.newResource(NS,"Retailer",tx.pId);
    
    var concAddress = factory.newConcept(NS,"Address");
    concAddress.Country = tx.Country;
    concAddress.County = tx.County;
    concAddress.City = tx.City;
    concAddress.Estate = tx.Estate;
    concAddress.Street = tx.Street;

    retailer1.address = concAddress;

    var concContact = factory.newConcept(NS,"Contact");
    concContact.email = tx.email;
    concContact.Phone_No = tx.Phone_No;
    concContact.MailingAddress = tx.MailingAddress;

    retailer1.contacts = concContact;

    retailer1.company = tx.company;
    retailer1.accountbalance = tx.accountbalance;

    const participantRegistry = await getParticipantRegistry(NS + ".Retailer");
    await participantRegistry.addAll([retailer1]);
}