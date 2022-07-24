// We're importing the contract from the default service account
import NonFungibleToken from 0x631e88ae7f1d7c20;

// Here we tell Cadence that our BottomShot contract implements the interface
pub contract DoodleShot: NonFungibleToken {
  // This is a simple NFT mint counter
  pub var totalSupply: UInt64

	pub event ContractInitialized()
  pub event Withdraw(id: UInt64, from: Address?)
  pub event Deposit(id: UInt64, to: Address?)

  pub let CollectionStoragePath: StoragePath
  pub let CollectionPublicPath: PublicPath

  // Our NFT resource conforms to the INFT interface
  pub resource NFT: NonFungibleToken.INFT {
    // The unique ID that differentiates each NFT
    pub let id: UInt64

		pub let name: String
    pub let description: String
    pub let thumbnail: String

    init(
        id: UInt64,
        name: String,
        description: String,
        thumbnail: String,
    ) {
        self.id = id
        self.name = name
        self.description = description
        self.thumbnail = thumbnail
    }
  }

	// This interface exposes only the getIDs function
  pub resource interface DoodleShotCollectionPublic {
    pub fun deposit(token: @NonFungibleToken.NFT)
    pub fun getIDs(): [UInt64]
    pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT
  }
  
  // This is a resource that's going to contain all the NFTs any one account owns
  // Same goes for our Collection, it conforms to multiple interfaces 
  pub resource Collection: DoodleShotCollectionPublic, NonFungibleToken.Provider, NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic {
    pub var ownedNFTs: @{UInt64: NonFungibleToken.NFT}

    init () {
      self.ownedNFTs <- {}
    }
    
    // An upgraded deposit function
    pub fun deposit(token: @NonFungibleToken.NFT) {
      let token <- token as! @DoodleShot.NFT

      let id: UInt64 = token.id

      // Add the new token to the dictionary, this removes the old one
      let oldToken <- self.ownedNFTs[id] <- token
      
      // Trigger an event to let listeners know an NFT was deposited to this collection
      emit Deposit(id: id, to: self.owner?.address)
      
      // Destroy (burn) the old NFT
      destroy oldToken
    }

    pub fun withdraw(withdrawID: UInt64): @NonFungibleToken.NFT {
      let token <- self.ownedNFTs.remove(key: withdrawID) ??
        panic("This collection doesn't contain an NFT with that ID")

      emit Withdraw(id: token.id, from: self.owner?.address)

      return <-token
    }

    // getIDs returns an array of the IDs that are in the collection
    pub fun getIDs(): [UInt64] {
      return self.ownedNFTs.keys
    }

    pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT {
      return (&self.ownedNFTs[id] as &NonFungibleToken.NFT?)!
    }

    destroy() {
      destroy self.ownedNFTs
    }
  }

  pub fun createEmptyCollection(): @NonFungibleToken.Collection {
    return <- create Collection()
  }

  // Mints a new NFT with a new ID and deposits it 
  // in the recipients collection using their collection reference
  pub fun mintNFT(
    recipient: &{NonFungibleToken.CollectionPublic},
    name: String,
    description: String,
    thumbnail: String,
  ) {
    // create a new NFT
    var newNFT <- create NFT(
      id: DoodleShot.totalSupply,
      name: name,
      description: description,
      thumbnail: thumbnail
    )

    // Deposit it in the recipient's account using their collection ref
    recipient.deposit(token: <-newNFT)

    DoodleShot.totalSupply = DoodleShot.totalSupply + UInt64(1)
  }

  init() {
    self.totalSupply = 0

    self.CollectionStoragePath = /storage/DoodleShotCollection
    self.CollectionPublicPath = /public/DoodleShotCollection

    // Create a Collection for the deployer
    let collection <- create Collection()
    self.account.save(<-collection, to: self.CollectionStoragePath)

    // Create a public capability for the collection
    self.account.link<&DoodleShot.Collection{NonFungibleToken.CollectionPublic, DoodleShot.DoodleShotCollectionPublic}>(
      self.CollectionPublicPath,
      target: self.CollectionStoragePath
    )

    emit ContractInitialized()
  }
}