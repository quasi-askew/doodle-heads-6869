import { useState, useEffect } from "react";
import Image from "next/image";
import heads from "../public/heads.png";
import { motion } from "framer-motion";
import { mintNFT } from "../cadence/transactions/mintNFT_tx";
import { getTotalSupply } from "../cadence/scripts/getTotalSupply_script";

import * as fcl from "@onflow/fcl";
import * as types from "@onflow/types";

fcl.config({
  "flow.network": "testnet",
  "app.detail.title": "DoodleShot",
  "accessNode.api": "https://rest-testnet.onflow.org",
  "app.detail.icon": "https://placekitten.com/g/200/200",
  "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
});

const Hero = ({ }) => {
  const [user, setUser] = useState();

  const logIn = () => {
    fcl.authenticate();
  };

  const logOut = () => {
    fcl.unauthenticate();
  };

  const mint = async () => {

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
          arg(user.addr, types.Address), //address to which the NFT should be minted
          arg("CatMoji # " + _id.toString(), types.String), // Name
          arg("Cat emojis on the blockchain", types.String), // Description
          arg("ipfs://bafybeigmeykxsur4ya2p3nw6r7hz2kp3r2clhvzwiqaashhz5efhewkkgu/" + _id + ".png", types.String),
        ],
        proposer: fcl.currentUser,
        payer: fcl.currentUser,
        limit: 99
      })
      console.log("Minting NFT now with transaction ID", transactionId);
      const transaction = await fcl.tx(transactionId).onceSealed();
      console.log("Testnet explorer link:", `https://testnet.flowscan.org/transaction/${transactionId}`);
      console.log(transaction);
      alert("NFT minted successfully!")
    } catch (error) {
      console.log(error);
      alert("Error minting NFT, please check the console for error details!")
    }
  }

  useEffect(() => {
    // This listens to changes in the user objects
    // and updates the connected user
    fcl.currentUser().subscribe(setUser);
  }, []);

  const RenderLogin = () => {
    return (
      <div className="lg:mt-0 lg:flex-shrink-0">
        <div className="mt-12 inline-flex rounded-md shadow">
          <button onClick={() => logIn()}
            type="button"
            className="
          py-4 
          px-6 
          bg-white 
          hover:bg-pink-800 
          hover:text-white
          focus:ring-indigo-500 
          focus:ring-offset-indigo-200 
          text-indigo-800 
          w-full 
          transition 
          ease-in 
          duration-200 
          text-center 
          text-base 
          font-bold 
          shadow-md 
          focus:outline-none 
          focus:ring-2 
          focus:ring-offset-2 
          rounded-lg 
        "
          >
            Log In
          </button>
        </div>
      </div>
    );
  };

  const RenderLogout = () => {
    if (user && user.addr) {
      return (
        <div className="lg:mt-0 lg:flex-shrink-0">
          <div className="mt-12 inline-flex rounded-md shadow">
            <button
              className="
              py-4 
              px-6 
              bg-white 
              hover:bg-pink-800 
              hover:text-white
              focus:ring-indigo-500 
              focus:ring-offset-indigo-200 
              text-indigo-800 
              w-full 
              transition 
              ease-in 
              duration-200 
              text-center 
              text-base 
              font-bold 
              shadow-md 
              focus:outline-none 
              focus:ring-2 
              focus:ring-offset-2 
              rounded-lg 
            "
              onClick={() => logOut()}>
              Logout:{' '}
              {user.addr.substring(0, 6)}...{user.addr.substring(user.addr.length - 4)}
            </button>
          </div>
        </div>
      );
    }
    return undefined;
  };

  const RenderMintButton = () => {
    return (
      <div className="lg:mt-0 lg:flex-shrink-0">
        <div className="mt-12 inline-flex rounded-md shadow">
          <button className="py-4 
              px-6 
              bg-white 
              hover:bg-pink-800 
              hover:text-white
              focus:ring-indigo-500 
              focus:ring-offset-indigo-200 
              text-indigo-800 
              w-full 
              transition 
              ease-in 
              duration-200 
              text-center 
              text-base 
              font-bold 
              shadow-md 
              focus:outline-none 
              focus:ring-2 
              focus:ring-offset-2 
              rounded-lg " onClick={() => mint()}>
            Mint
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-indigo-500">
      <div className="text-center w-full mx-auto py-12 px-4 sm:px-6 lg:py-20 lg:px-8 z-20">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          <span className="block">Minting soon on Flow...</span>
          <span className="block text-indigo-800">Doodle Heads 6869</span>
        </h2>

        <div className="max-w-2xl mx-auto mt-10">
          <motion.div whileHover={{ scale: 1.5 }}>
            <Image
              src={heads}
              width={7281}
              height={1047}
              layout="responsive"
              alt="Doodle 6869"
            />
          </motion.div>
        </div>
        {user && user.addr ? <RenderMintButton /> : <RenderLogin />}
        <RenderLogout />
      </div>
    </div>
  );
};

export default Hero;