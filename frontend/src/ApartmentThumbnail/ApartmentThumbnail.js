import React from "react";
import "./ApartmentThumbnail.css";
import apartment1 from "./apartment1.png";
import { Card, Button } from "react-bootstrap";

const ApartmentThumbnail = (props) => {
  return (
    <li>
      <Card
        style={{ width: "30rem" }}
        onClick={props.expandInfo.bind(this, props.id)}
      >
        <Card.Img className="apartment-image" variant="top" src={props.image} />
        <Card.Body>
          <Card.Title>${props.price} /mo</Card.Title>
          <Card.Text>
            {props.bathAmount} beds | {props.bedAmount} baths
          </Card.Text>
        </Card.Body>
        <Card.Footer>{props.city}</Card.Footer>
      </Card>
    </li>
  );
};

export default ApartmentThumbnail;
