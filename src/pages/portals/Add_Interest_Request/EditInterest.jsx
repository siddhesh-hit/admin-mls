import React from "react";

import Header from "../../../components/common/Header";
import Menu from "../../../components/common/Menu";
import Footer from "../../../components/common/Footer";

import EditInterestContent from "../../../components/portal/interest_request/EditInterestContent";

const AddInterest = () => {
  return (
    <div>
      <Header />
      <Menu />
      <EditInterestContent />
      <Footer />
    </div>
  );
};

export default AddInterest;
