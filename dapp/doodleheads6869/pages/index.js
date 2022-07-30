import { useState, useEffect } from 'react';
import MintingHeroSpectactular from "../components/MintingHeroSpectactular";
import Head from "next/head";
import Nav from '../components/Nav';

import * as fcl from "@onflow/fcl";
import * as fclTypes from "@onflow/types";

fcl.config({
  "flow.network": "testnet",
  "app.detail.title": "DoodleHeads6869",
  "accessNode.api": "https://rest-testnet.onflow.org",
  "app.detail.icon": "https://placekitten.com/g/200/200",
  "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
});

export default function Home() {
  const [user, setUser] = useState();
  const [images, setImages] = useState([])

  const handleLogout = () => {
    setImages([]);
    fcl.unauthenticate();
  };

  useEffect(() => {
    // This listens to changes in the user objects
    // and updates the connected user
    fcl.currentUser().subscribe(setUser);
  }, []);

  return (
    <>
      <Head>
        <title>DoodleHeads6869</title>
        <meta
          name="description"
          content="Doodle Heads 6869 on the Flow Blockchain"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav user={user} handleLogout={handleLogout} />
      <main>
        <MintingHeroSpectactular fcl={fcl} fclTypes={fclTypes} user={user} images={images} setImages={setImages} />
      </main>
    </>
  );
}
