/**
 * A transaction processor function allowing one to add an instance of the Farmer Participant
 * @param{org.perishable.CreateFarmer} tx
 * @transaction
 */

async function createFarmer(tx){
    const NS = "org.perishable";
    const factory = getFactory();

    var farmer = factory.newResource(NS,"Farmer",tx.pId);

    var concAddress = factory.newConcept(NS,"Address");
    concAddress.Country = tx.Country;
    concAddress.County = tx.County;
    concAddress.City = tx.City;
    concAddress.Estate = tx.Estate;

    farmer.address = concAddress

    var concContact = factory.newConcept(NS,"Contact");
    concContact.email = tx.email;
    concContact.Phone_No = tx.Phone_No;
    concContact.MailingAddress = tx.MailingAddress;

    farmer.contacts = concContact;

    farmer.company = tx.company;
    farmer.accountbalance = tx.accountbalance;

    const farmerRegistry = await getParticipantRegistry(NS +".Farmer");
    await farmerRegistry.addAll([farmer]);
}