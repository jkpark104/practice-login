import type { NextPage } from "next";
import Head from "next/head";

import Form from "@/components/form/form";

const Home: NextPage = function Home() {
  return (
    <>
      <Head>
        <title>Form validation</title>
      </Head>
      <Form />
    </>
  );
};

export default Home;
