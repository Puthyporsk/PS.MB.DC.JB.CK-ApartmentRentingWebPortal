import React from "react";
import "./ApartmentThumbnail.css";
import apartment1 from "./apartment1.png";
import { Card, Button } from "react-bootstrap";

const ApartmentThumbnail = (props) => {
  return (
    <li>
      <Card
        style={{ width: "30rem" }}
        onClick={props.expandInfo.bind(this, props.apartment._id)}
      >
        <Card.Img
          className="apartment-image"
          variant="top"
          src={props.apartment.image}
        />
        <Card.Body>
          <Card.Title>${props.apartment.price} /mo</Card.Title>
          <Card.Text>{props.apartment.sqft} sqft</Card.Text>
          <Card.Text>
            {props.apartment.bathAmount} beds | {props.apartment.bedAmount}{" "}
            baths
          </Card.Text>
        </Card.Body>
        <Card.Footer>{props.apartment.city}</Card.Footer>
      </Card>
    </li>
  );
};

export default ApartmentThumbnail;
