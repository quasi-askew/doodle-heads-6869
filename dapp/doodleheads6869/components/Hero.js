import { useState } from "react";
import Image from "next/image";
import heads from "../public/heads.png";
import { motion } from "framer-motion";

import * as fcl from "@onflow/fcl";
import * as types from "@onflow/types";

fcl.config({
  "flow.network": "testnet",
  "app.detail.title": "DoodleShot",
  "accessNode.api": "https://rest-testnet.onflow.org",
  "app.detail.icon": "https://placekitten.com/g/200/200",
  "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
});

const Hero = ({}) => {
  const [user, setUser] = useState();

  const logIn = () => {
    fcl.authenticate();
  };

  const logOut = () => {
    fcl.unauthenticate();
  };

  useEffect(() => {
    // This listens to changes in the user objects
    // and updates the connected user
    fcl.currentUser().subscribe(setUser);
  }, []);

  return (
    <div className="bg-indigo-500">
      <div className="text-center w-full mx-auto py-12 px-4 sm:px-6 lg:py-20 lg:px-8 z-20">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          <span className="block">Minting soon on Flow...</span>
          <span className="block text-indigo-800">Doodle 6869 Heads</span>
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
        <div className="lg:mt-0 lg:flex-shrink-0">
          <div className="mt-12 inline-flex rounded-md shadow">
            <button
              type="button"
              className="py-4 px-6 bg-white hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-indigo-800 w-full transition ease-in duration-200 text-center text-base font-bold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg "
            >
              Minting soon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

const RenderLogin = () => {
  return (
    <div>
      <button className="cta-button button-glow" onClick={() => logIn()}>
        Log In
      </button>
    </div>
  );
};

const RenderLogout = () => {
  if (user && user.addr) {
    return (
      <div className="logout-container">
        <button className="cta-button logout-btn" onClick={() => logOut()}>
          ❎ {"  "}
          {user.addr.substring(0, 6)}...
          {user.addr.substring(user.addr.length - 4)}
        </button>
      </div>
    );
  }
  return undefined;
};
