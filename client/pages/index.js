import Head from "next/head";
import Image from "next/image";
import isAdmin from "../components/isAdmin";
import Base from "../core/Base";
const Home = () => {
  return (
    <Base title="Dashboard">
      <h1>test</h1>
    </Base>
  );
};

export default isAdmin(Home);
