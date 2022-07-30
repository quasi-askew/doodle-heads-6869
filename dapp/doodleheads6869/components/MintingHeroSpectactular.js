import { useState, useEffect } from "react";
import Image from "next/image";
import heads from "../public/heads.png";
import { motion } from "framer-motion";
import { mintNFT } from "../cadence/transactions/mintNFT_tx";
import { getTotalSupply } from "../cadence/scripts/getTotalSupply_script";
import { getMetadata } from "../cadence/scripts/getMetadata_script";
import { getIDs } from "../cadence/scripts/getIDs_script";
import Login from "./Login";
import Mint from "./Mint";
import Spacedood from "./Spacedood";

const MintingHeroSpectactular = ({ fcl, fclTypes, user, images, setImages }) => {
  const [isMinting, setIsMinting] = useState(false);

  const handleLogin = () => {
    fcl.authenticate();
  };

  const handleMint = async () => {

    let _totalSupply;
    try {
      _totalSupply = await fcl.query({
        cadence: `${getTotalSupply}`
      })
    } catch (err) { console.log(err) }

    const _id = parseInt(_totalSupply) + 1;

    try {
      const transactionId = await fcl.mutate({
        cadence: `${mintNFT}`,
        args: (arg, t) => [
          arg(user.addr, fclTypes.Address), //address to which the NFT should be minted
          arg("DoodleHead 6869 # " + _id.toString(), fclTypes.String), // Name
          arg("DoodleHeads from Doodle #6869 on the blockchain", fclTypes.String), // Description
          arg(`ipfs://bafybeiax7afanztfhdsrsfumyd5msawkfn3lsq7ico2z2o6imm3bzkcihy/doodle-head-${_id}.png`, fclTypes.String),
        ],
        proposer: fcl.currentUser,
        payer: fcl.currentUser,
        limit: 99
      })
      console.log("Minting NFT now with transaction ID", transactionId);
      setIsMinting(true);
      const transaction = await fcl.tx(transactionId).onceSealed();
      console.log("Testnet explorer link:", `https://testnet.flowscan.org/transaction/${transactionId}`);
      console.log(transaction);
      alert("NFT minted successfully!")
      setIsMinting(false);
    } catch (error) {
      console.log(error);
      alert("Error minting NFT, please check the console for error details!")
      setIsMinting(false);
    }
  }

  const fetchNFTs = async () => {
    // Empty the images array
    setImages([]);
    let IDs = [];

    // Fetch the IDs with our script (no fees or signers necessary)
    try {
      IDs = await fcl.query({
        cadence: `${getIDs}`,
        args: (arg, t) => [
          arg(user.addr, fclTypes.Address),
        ],
      })
    } catch (err) {
      console.log("No NFTs Owned")
    }

    let _imageSrc = []

    try {
      for (let i = 0; i < IDs.length; i++) {
        const result = await fcl.query({
          cadence: `${getMetadata}`,
          args: (arg, t) => [
            arg(user.addr, fclTypes.Address),
            arg(IDs[i].toString(), fclTypes.UInt64),
          ],
        })
        // If the source is an IPFS link, remove the "ipfs://" prefix
        if (result["thumbnail"].startsWith("ipfs://")) {
          _imageSrc.push(result["thumbnail"].substring(7))
          // Add a gateway prefix
          _imageSrc[i] = "https://nftstorage.link/ipfs/" + _imageSrc[i]
        }
        else {
          _imageSrc.push(result["thumbnail"])
        }
      }
    } catch (err) {
      console.log(err)
    }

    if (images.length < _imageSrc.length) {
      console.log({ images })
      console.log(_imageSrc.length)
      setImages((Array.from({ length: _imageSrc.length }, (_, i) => i).map((number, index) =>
        // <div key={number} className="w-32">
          <img 
            src={_imageSrc[index]} 
            alt={"NFT #" + number}
          />
        // </div>
      )))
    }
  }

  useEffect(() => {
    if (user && user.addr) {
      fetchNFTs();
    }
  }, [user]);

  return (
    <div className="bg-indigo-500">
      <div className="text-center w-full h-screen mx-auto py-12 px-4 sm:px-6 lg:py-20 lg:px-8 z-20">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          <span className="block">Minting on Flow...</span>
          <span className="block text-indigo-800">Doodle Heads 6869</span>
        </h2>

        {/* <div className="max-w-2xl mx-auto mt-10">
          <motion.div whileHover={{ scale: 1.5 }}>
            <Image
              src={heads}
              width={7281}
              height={1047}
              layout="responsive"
              alt="Doodle 6869"
            />
          </motion.div>
        </div> */}
        {isMinting ? (
          <Spacedood />
        ) : (
          <>
            {user && user.addr ? <Mint handleMint={handleMint} /> : <Login handleLogin={handleLogin} />}
          </>
        )}

        {images.length > 0 ?
          <div className="mt-4 text-center w-full bg-blue-200 p-5">
            <h2 className="text-white font-bold text-2xl mb-4">Your NFTs</h2>
            <div className="container grid grid-cols-4 gap-2 mx-auto">
              {images}
            </ div>
          </div>
          : ""}

      </div>
    </div>
  );
};

export default MintingHeroSpectactular;