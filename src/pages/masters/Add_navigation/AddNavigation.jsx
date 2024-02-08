import React from "react";

import Header from "../../../components/common/Header";
import Menu from "../../../components/common/Menu";
import Footer from "../../../components/common/Footer";
import AddContent from "../../../components/master/navigation/AddContent";

const AddNavigation = () => {
  return (
    <div>
      <Header />
      <Menu />
      <AddContent />
      <Footer />
    </div>
  );
};

export default AddNavigation;
