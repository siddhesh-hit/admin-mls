import React from "react";

import Header from "../../../components/common/Header";
import Menu from "../../../components/common/Menu";
import Footer from "../../../components/common/Footer";

import EditRequestContent from "../../../components/portal/interest_request/EditRequestContent";

const AddInterest = () => {
  return (
    <div>
      <Header />
      <Menu />
      <EditRequestContent />
      <Footer />
    </div>
  );
};

export default AddInterest;
