import React from "react";
import add from "../../../images/back.svg";
const ViewGalleryImage = () => {
    return <div>
        <div className="content-wrapper pt-4">
            <div className="contentofpages">
                <a className="addpagess" href="/ViewGallery">
                    <img src={add} alt="add" style={{ width: 25 }} />
                    Go back
                </a>
                <h4 className="page-title">• View Gallery Image</h4>
                <div className="card card-info">
                    <img className="mt-5 mb-5" style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto', display: 'block' }} src="https://mlsapi.sblcorp.com/images/mandal/1706262597519-mandal-Group%201.png" />
                </div>
            </div>
        </div>
    </div>;
};

export default ViewGalleryImage;
