import React from "react";
import { Row, Col } from "react-bootstrap";

const topics = () => {
  return (
    <div className="body-topic-style">
      <h5>BROWSE TOPICS</h5>
      <br></br>
      <Row>
        <Col lg={6}>
          <h4>Javascript</h4>
        </Col>
        <Col lg={6}>
          <h5
            style={{
              float: "right",
              width: "40px",
              backgroundColor: "#f8f9fa",
              border: "3px solid  #e9e9ea",
              padding: "2px 2px 2px 2px",
              borderRadius: "7px",
              textAlign: "center",
              //   marginTop: "12px",
            }}
          >
            90
          </h5>
        </Col>
      </Row>

      <Row>
        <Col lg={6}>
          <h4>Javascript</h4>
        </Col>
        <Col lg={6}>
          <h5
            style={{
              float: "right",
              width: "40px",
              backgroundColor: "#f8f9fa",
              border: "3px solid  #e9e9ea",
              padding: "2px 2px 2px 2px",
              borderRadius: "7px",
              textAlign: "center",
              //   marginTop: "12px",
            }}
          >
            90
          </h5>
        </Col>
      </Row>

      <Row>
        <Col lg={6}>
          <h4>Javascript</h4>
        </Col>
        <Col lg={6}>
          <div
            style={{
              float: "right",
            }}
          >
            <h5
              style={{
                float: "right",
                width: "40px",
                backgroundColor: "#f8f9fa",
                border: "3px solid  #e9e9ea",
                padding: "2px 2px 2px 2px",
                borderRadius: "7px",
                textAlign: "center",
                //   marginTop: "12px",
              }}
            >
              90
            </h5>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default topics;
