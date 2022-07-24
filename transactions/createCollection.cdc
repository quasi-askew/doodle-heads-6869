import DoodleShot from 0xf8d6e0586b0a20c7

transaction {
  
  prepare(acct: AuthAccount) {
                                                // I changed the storage address here
    acct.save(<- DoodleShot.createCollection(), to: /storage/DoodleShot1)
    
    // We're linking two resources in different storage domains
		// account.function<&Contract.Resource{Contract.Interface}>(destinationPath, sourcePath)
    acct.link<&DoodleShot.Collection{DoodleShot.CollectionPublic}>
      (/public/DoodleShot1, target: /storage/DoodleShot1)
  }
  
  execute {
    log("Stored a collection for our NUTTY empty NFTs")
  }
}