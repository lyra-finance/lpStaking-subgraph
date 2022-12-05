import { BigInt } from "@graphprotocol/graph-ts";

import {
  Withdrawn as WithdrawnEvent,
  Staked,
  
} from "../generated/stkLyraProxy/StakingRewards";
import {
  User,
  Stake,
  Withdrawn,
} from "../generated/schema";

let ZERO = BigInt.fromI32(0);

function loadOrCreateUser(userAddress: string): User {
  let user = User.load(userAddress);
  if (user == null) {
    user = new User(userAddress);
    user.balance = ZERO;
    user.save();
  }
  return user;
}

export function handleWithdrawn(event: WithdrawnEvent): void {
  let userAddress = event.params.user.toHex();
  loadOrCreateUser(userAddress);
  let redeem = new Withdrawn(
    event.transaction.hash.toHex() + event.logIndex.toString()
  );
  redeem.txHash = event.transaction.hash;
  redeem.blockNumber = event.block.number.toI32();
  redeem.timestamp = event.block.timestamp.toI32();
  redeem.user = userAddress;
  redeem.amount = event.params.amount;
  redeem.save();
}

export function handleStaked(event: Staked): void {
  let userAddress = event.params.user.toHex();
  loadOrCreateUser(userAddress);
  let stake = new Stake(
    event.transaction.hash.toHex() + event.logIndex.toString()
  );
  stake.txHash = event.transaction.hash;
  stake.blockNumber = event.block.number.toI32();
  stake.timestamp = event.block.timestamp.toI32();
  stake.user = userAddress;
  stake.amount = event.params.amount;
  stake.save();
}