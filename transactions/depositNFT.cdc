import DoodleShot from 0xf8d6e0586b0a20c7

transaction {
  
  prepare(acct: AuthAccount) {
    let collectionReference = 
      acct.borrow<&DoodleShot.Collection>(from: /storage/DoodleShot1)
      ?? panic("No collection found!")

    collectionReference.deposit(token: <- DoodleShot.mintNFT())
  }

  execute {
    log("Minted an NFT and stored it into the collection")
  }
}