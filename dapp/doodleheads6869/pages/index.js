import Layout from "../components/layout";
import Hero from "../components/Hero";
import Spacedood from "../components/Spacedood";

export default function Home() {
  return (
    <>
      <Hero />
      <Spacedood />
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
