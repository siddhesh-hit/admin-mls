import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Footer from "../../../components/common/Footer";
import Header from "../../../components/common/Header";
import Menu from "../../../components/common/Menu";
import ViewContent from "../../../components/home/seo/ViewContent";

const ViewSEO = () => {
  return (
    <div>
      <Header />
      <Menu />
      <ViewContent />
      <Footer />
    </div>
  );
};

export default ViewSEO;
