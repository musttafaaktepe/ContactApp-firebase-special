import React from "react";
import Form from "../components/Form";
import Table from "../components/Table";

const Home = () => {
  return (
    <div
      style={{
        backgroundImage: `url("https://picsum.photos/1600/900")`,
        height: "calc(100vh - 4rem)",
      }}
    >
      <Form />
      <Table />
    </div>
  );
};

export default Home;
