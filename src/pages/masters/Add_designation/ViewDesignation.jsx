import React from "react";

import Header from "../../../components/common/Header";
import Menu from "../../../components/common/Menu";
import Footer from "../../../components/common/Footer";
import ViewContent from "../../../components/master/designation/ViewContent";

const ViewNavigation = () => {
  return (
    <div>
      <Header />
      <Menu />
      <ViewContent />
      <Footer />
    </div>
  );
};

export default ViewNavigation;
