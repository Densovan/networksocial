import React from "react";
import { Row, Col } from "react-bootstrap";
import Posts from "./posts";
import RecentActive from "./recentActive";
import Topics from "./topics";

const NewsFeeds = () => {
  return (
    <div style={{ marginTop: "40px" }} className="container">
      <Row>
        <Col lg={3}>
          {/* <div style={{ backgroundColor: "#ffffff" }}>hello</div> */}
          <Topics />
        </Col>
        <Col lg={6}>
          {/* <div style={{ backgroundColor: "#ffffff" }}>hello</div> */}
          <Posts />
        </Col>
        <Col lg={3}>
          <RecentActive />
        </Col>
      </Row>
    </div>
  );
};

export default NewsFeeds;
