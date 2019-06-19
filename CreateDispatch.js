/**
 * A transaction proceesor function that allows the farmer to dispatch his/her produce
 * to the retailer
 * @param{org.perishable.CreateDispatch} tx
 * @transaction
 */

async function createDispatch(tx){
    const shipment = tx.shipment;
    shipment.shipment_Status = "IN_TRANSIT";

    const shipmentRegistry = await getAssetRegistry("org.perishable.Shipment");
    await shipmentRegistry.update(shipment);

}