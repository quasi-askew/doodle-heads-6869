export const mintNFT = `
// REPLACE THIS WITH YOUR CONTRACT NAME + ADDRESS
import DoodleShot from 0x0ebc2b4f52d51fc0 
// This remains the same 
import NonFungibleToken from 0x631e88ae7f1d7c20

transaction(
  recipient: Address,
  name: String,
  description: String,
  thumbnail: String,
) {
  prepare(signer: AuthAccount) {
    if signer.borrow<&DoodleShot.Collection>(from: DoodleShot.CollectionStoragePath) != nil {
      return
    }

    // Create a new empty collection
    let collection <- DoodleShot.createEmptyCollection()

    // save it to the account
    signer.save(<-collection, to: DoodleShot.CollectionStoragePath)

    // create a public capability for the collection
    signer.link<&{NonFungibleToken.CollectionPublic}>(
      DoodleShot.CollectionPublicPath,
      target: DoodleShot.CollectionStoragePath
    )
  }


  execute {
    // Borrow the recipient's public NFT collection reference
    let receiver = getAccount(recipient)
      .getCapability(DoodleShot.CollectionPublicPath)
      .borrow<&{NonFungibleToken.CollectionPublic}>()
      ?? panic("Could not get receiver reference to the NFT Collection")

    // Mint the NFT and deposit it to the recipient's collection
    DoodleShot.mintNFT(
      recipient: receiver,
      name: name,
      description: description,
      thumbnail: thumbnail,
    )
    
    log("Minted an NFT and stored it into the collection")
  } 
}
`;
