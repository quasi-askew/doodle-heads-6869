import Head from "next/head";

export default function Layout({ children }) {
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
      	<main>{children}</main>
    </>
  );
}
