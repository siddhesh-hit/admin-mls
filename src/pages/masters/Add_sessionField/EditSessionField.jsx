import React from "react";

import Header from "../../../components/common/Header";
import Menu from "../../../components/common/Menu";
import Footer from "../../../components/common/Footer";
import EditContent from "../../../components/master/sessionField/EditContent";

const EditNavigation = () => {
  return (
    <div>
      <Header />
      <Menu />
      <EditContent />
      <Footer />
    </div>
  );
};

export default EditNavigation;
