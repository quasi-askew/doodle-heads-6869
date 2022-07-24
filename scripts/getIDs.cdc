import DoodleShot from 0xf8d6e0586b0a20c7

pub fun main(acct: Address): [UInt64] {
  let publicRef = getAccount(acct).getCapability(/public/DoodleShot1)
            .borrow<&DoodleShot.Collection{DoodleShot.CollectionPublic}>()
            ?? panic ("Oof ouch owie this account doesn't have a collection there")

  return publicRef.getIDs()
}