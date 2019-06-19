/**
 * A transaction processor function to receive a shipment and then pay for the shipment once
 * received
 * @param{org.perishable.ShipmentReceived} tx
 * @transaction
 */

async function shipmentReceived(tx){
    const farmer = tx.shipment.farmer;
    const retailer = tx.shipment.retailer;
    const shipment = tx.shipment;
    const produce = tx.shipment.produce;
    const distributor  = tx.distributor;
    var payout = produce.unitPrice * produce.unitCount;
    var penaltyHigh = 0;
    var penaltyLow = 0;

    if (tx.timestamp > shipment.arrivalDateTime){
        console.log("The Shipment is Late!");
        payout = 0;
        shipment.shipment_Status = "INVALID";
    }
    else{
        // Two IFs instead of ELSE IFs to ensure they check for both
        if(shipment.maxTemp > shipment.maxShipTemp){
            penaltyHigh = (shipment.maxTempMultiplier * (shipment.maxTemp - shipment.maxShipTemp)) * shipment.unitCount;
        }
        if(shipment.minTemp < shipment.minShipTemp){
            penaltyLow = (shipment.minTempMultiplier * (shipment.minShipTemp - shipment.minTemp)) * shipment.unitCount;
        }
        payout -= (penaltyHigh + penaltyLow);
        shipment.shipment_Status = "ARRIVED";

    }
    console.log("Shipment Status: " + shipment.shipment_Status);
    console.log("Payout: " + payout);

    farmer.accountbalance += payout;
    retailer.accountbalance -= payout;

    const farmerRegistry = await getParticipantRegistry("org.perishable.Farmer");
    await farmerRegistry.update(farmer);
    const retailerRegistry = await getParticipantRegistry("org.perishable.Retailer");
    await retailerRegistry.update(retailer);
    const shipmentRegistry = await getAssetRegistry("org.perishable.Shipment");
    await shipmentRegistry.update(shipment);

}
