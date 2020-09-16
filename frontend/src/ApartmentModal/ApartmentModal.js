import React from "react";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import "./ApartmentModal.css";

const ApartmentModal = (props) => {
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
          <Button className="button" onClick={props.loginRedirect}>
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
              return (
                <img key={props.apartment.id} src={image} className="image" />
              );
            })}
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default ApartmentModal;
