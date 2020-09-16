import React, { useState } from "react";
import { Redirect } from "react-router";
import {
  Navbar,
  Button,
  Form,
  FormControl,
  NavDropdown,
  Nav,
  Container,
  Grid,
  Row,
  Col,
} from "react-bootstrap";
import "./Homepage.css";

import dummyApartmentData from "../dummydata";
import ApartmentThumbnail from "../ApartmentThumbnail/ApartmentThumbnail";
import ApartmentModal from "../ApartmentModal/ApartmentModal";

const Homepage = () => {
  const [logout, setLogout] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState();
  const [isSelected, setIsSelected] = useState(false);

  const expandInfo = (id) => {
    console.log("in here");
    setIsSelected(true);
    dummyApartmentData.map((apartment) => {
      if (apartment.id === id) {
        setSelectedApartment(apartment);
      }
    });
  };

  const handleClose = () => setIsSelected(false);

  return (
    <React.Fragment>
      {logout && <Redirect to="/login" />}
      {isSelected && (
        <ApartmentModal
          apartment={selectedApartment}
          handleClose={handleClose}
        />
      )}
      {/* Header Navbar */}
      <Navbar className="header-navbar" expand="lg">
        <Navbar.Brand>PMDJC Apartments</Navbar.Brand>
        <Button variant="flat" onClick={() => setLogout(true)}>
          Sign-In
        </Button>
        <Button variant="flat">Sign-Out</Button>
      </Navbar>
      {/* Apply Filter Navbar */}
      {/* Minimum and Maximum Price Navbar */}
      <Navbar className="search-filter-navbar" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <NavDropdown title="Minimum Price" id="basic-nav-dropdown">
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                />
                <Button variant="outline-success">Apply</Button>
              </Form>
            </NavDropdown>
            <NavDropdown title="Maximum Price" id="basic-nav-dropdown">
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                />
                <Button variant="outline-success">Apply</Button>
              </Form>
            </NavDropdown>

            {/* Location */}
            <NavDropdown title="City" id="basic-nav-dropdown">
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </NavDropdown>

            {/* Bed and Bath Amount */}
            <NavDropdown title="Bed Amount" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">1+</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">2+</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">3+</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Bath Amount" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">1+</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">2+</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">3+</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container fluid={true}>
        <Row noGutters>
          <Col>
            <ul>
              {dummyApartmentData.map((apartment) => (
                <div key={apartment.id}>
                  <ApartmentThumbnail
                    expandInfo={expandInfo}
                    id={apartment.id}
                    image={apartment.image}
                    price={apartment.price}
                    bathAmount={apartment.bathAmount}
                    bedAmount={apartment.bedAmount}
                    city={apartment.city}
                  />
                </div>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Homepage;
