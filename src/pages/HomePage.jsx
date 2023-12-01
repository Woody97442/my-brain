import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import SideBar from "../components/SideBar/SideBar";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import Lab from "../components/Lab/Lab";

function HomePage() {
  const categories = useSelector((state) => state.dataCat.categories);

  return (
    <>
      {/* <NavBar /> */}
      <NavBar />

      {/* <SideBar /> */}
      <div className="root-page ">
        <SideBar
          brandName={{
            name: "E-LoGame",
            additionalCss: "font-bold",
          }}
          categories={categories}
          nameSections={[
            { name: "Front-end", additionalCss: "font-bold" },
            { name: "Back-end", additionalCss: "font-bold" },
          ]}
        />

        {/* <Caontainer /> */}
        <div className="detail">
          <Outlet />
          <Lab active={false} />
        </div>

        {/* <Footer /> */}
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
