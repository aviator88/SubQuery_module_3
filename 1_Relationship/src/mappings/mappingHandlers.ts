import {SubstrateEvent} from "@subql/types";
import {Account, Transfer} from "../types";
import {Balance} from "@polkadot/types/interfaces";

export async function handleEvent(event: SubstrateEvent): Promise<void> {
// The balance.tranfer event has the following payload \[from,to,value\] that we can access

    //const fromAddress = event.event.data[0];
    const toAddress = event.event.data[1];
    const amount = event.event.data[1];
    
    //query for toAddress from DB
    const toAccount = await Account.get(toAddress.toString());
    //if not on DB, instantiate a new Account object using the toAddress as a unique ID
    if (!toAccount) {
        await new Account(toAddress.toString()).save();
    }
    //instantiate a new Transer object using block number and event.idx as a unique ID
    const transfer = new Transfer('${event.block.block.head.number.toNumber()}-${event.idx}', );
    transfer.blockNumber = event.block.block.header.number.toBigInt();
    transfer.toId = toAddress.toString();
    transfer.amount = (amount as Balance).toBigInt();
    await transfer.save();
}
