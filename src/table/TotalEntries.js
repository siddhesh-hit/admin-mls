import React, { useState } from 'react'
import { Col, Row } from "react-bootstrap";
const TotalEntries = () => {
    const [selectValue, setSelectValue] = useState("");
    const onChange = (e) => {
        const value = e.target.value;
        setSelectValue(value);
        // console.log(e);
        // console.log(e.target);
        // console.log(e.target.name);
    };

    // console.log(selectValue, "sddsdsdsd")

    return (
        <div>
            <Row>
                <Col lg={6}>
                    <div className="dt-length">
                        <select onChange={onChange}
                            name="example_length"
                            aria-controls="example"
                            className="dt-length-control"
                            id="dt-length-0"
                        >
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                        <label htmlFor="dt-length-0"> entries per page</label>
                    </div>
                </Col>
                <Col lg={6}>
                    <div className="col-md-auto ml-auto ">
                        <div className="dt-search">
                            <label htmlFor="dt-search-0">Search:</label>
                            <input
                                type="search"
                                className="searchtext"
                                id="dt-search-0"
                                placeholder=""
                                aria-controls="example"
                            />
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default TotalEntries
