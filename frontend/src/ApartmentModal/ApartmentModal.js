import React from "react";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import "./ApartmentModal.css";

const ApartmentModal = (props) => {
  const handleSave = async () => {
    console.log("Handling save");
    console.log("userInfo: ", props.userInfo);
    console.log("apartmentInfo: ", props.apartment);

    {
      /*TODO: Add all apartment info instead of apartment id
             so in the saved apartment tab, the apartments can be
             immediately rendered, instead of making a request for
             each one
    */
    }
    const userResponse = await fetch(
      "http://localhost:5000/api/users/saveApartment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: props.userInfo._id,
          aid: props.apartment._id,
        }),
      }
    );

    const userData = await userResponse.json();

    if (!userResponse.ok) {
      console.log(userData.message);
    }

    console.log(userData);
  };

  return (
    <Modal
      show={true}
      onHide={props.handleClose}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header closeButton>
        <Modal.Title className="modal-title">
          <Button className="button" onClick={props.loginRedirect}>
            Purchase
          </Button>
          <Button className="button" onClick={props.loginRedirect}>
            Forum
          </Button>
          <Button
            className="button"
            onClick={props.isLoggedIn ? handleSave : props.loginRedirect}
          >
            Save
          </Button>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col>
              <ul>
                <li>${props.apartment.price} /mo</li>
                <li>City: {props.apartment.city}</li>
                <li>{props.apartment.bedAmount} beds</li>
                <li>{props.apartment.bathAmount} baths</li>
              </ul>
            </Col>
          </Row>
          <Row>
            {props.apartment.otherImages.map((image) => {
              return <img key={image} src={image} className="image" />;
            })}
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default ApartmentModal;
