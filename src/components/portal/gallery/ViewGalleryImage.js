import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import back from "../../../images/back.svg";

import { API } from "../../../config/api";
import { getApiById } from "../../../services/axiosInterceptors";

const ViewGalleryImage = () => {
  const [data, setData] = useState({});

  const location = useLocation();
  const id = location.search.split("=")[1];

  const fetchData = async () => {
    await getApiById("gallery", id)
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="content-wrapper pt-4">
        <div className="contentofpages">
          <a className="addpagess" href="/ViewGallery">
            <img src={back} alt="back" style={{ width: 25 }} />
            Go back
          </a>
          <h4 className="page-title">• View Gallery Image</h4>
          <div className="card card-info">
            <img
              className="mt-5 mb-5"
              style={{
                width: "70%",
                marginLeft: "auto",
                marginRight: "auto",
                display: "block",
              }}
              src={API.baseUrl + data?.destination + "/" + data?.filename}
              alt="gallery"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewGalleryImage;
