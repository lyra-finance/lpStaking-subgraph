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
  let user = loadOrCreateUser(userAddress);
  let withdrawn = new Withdrawn(
    event.transaction.hash.toHex() + event.logIndex.toString()
  );
  withdrawn.txHash = event.transaction.hash;
  withdrawn.blockNumber = event.block.number.toI32();
  withdrawn.timestamp = event.block.timestamp.toI32();
  withdrawn.user = userAddress;
  withdrawn.amount = event.params.amount;
  withdrawn.save();

  user.balance = user.balance.minus(event.params.amount)
  user.save()
}

export function handleStaked(event: Staked): void {
  let userAddress = event.params.user.toHex();
  let user = loadOrCreateUser(userAddress);
  let stake = new Stake(
    event.transaction.hash.toHex() + event.logIndex.toString()
  );
  stake.txHash = event.transaction.hash;
  stake.blockNumber = event.block.number.toI32();
  stake.timestamp = event.block.timestamp.toI32();
  stake.user = userAddress;
  stake.amount = event.params.amount;
  stake.save();

  user.balance = user.balance.plus(event.params.amount)
  user.save()
}