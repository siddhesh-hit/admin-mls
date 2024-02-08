import React from "react";

import Header from "../../../components/common/Header";
import Menu from "../../../components/common/Menu";
import Footer from "../../../components/common/Footer";

import ViewInterestRequest from "../../../components/portal/interest_request/ViewInterestRequest";

const AddInterest = () => {
  return (
    <div>
      <Header />
      <Menu />
      <ViewInterestRequest />
      <Footer />
    </div>
  );
};

export default AddInterest;
