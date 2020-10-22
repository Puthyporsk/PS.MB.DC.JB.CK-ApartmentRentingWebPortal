import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import {
  Navbar,
  Button,
  Form,
  FormControl,
  NavDropdown,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import "./Homepage.css";

import dummyApartmentData from "../dummydata";
import ApartmentThumbnail from "../ApartmentThumbnail/ApartmentThumbnail";
import ApartmentModal from "../ApartmentModal/ApartmentModal";

const Homepage = (props) => {
  const [logout, setLogout] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    console.log(props.userInfo);
    if (props.userInfo != null) {
      setIsLoggedIn(true);
    }
  }, []);

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

  const loginRedirect = () => {
    console.log("In login redirect");
    setLogout(true);
  };

  return (
    <React.Fragment>
      {logout && <Redirect to="/login" />}
      {isSelected && (
        <ApartmentModal
          apartment={selectedApartment}
          loginRedirect={loginRedirect}
          handleClose={handleClose}
          isLoggedIn={isLoggedIn}
        />
      )}
      {/* Header Navbar */}
      <Navbar className="header-navbar" expand="lg">
        <Navbar.Brand>PMDJC Apartments</Navbar.Brand>
        <div className="signin-signout-button">
          {isLoggedIn ? (
            <Button variant="flat" onClick={() => setLogout(true)}>
              Sign-Out
            </Button>
          ) : (
            <Button variant="flat" onClick={() => setLogout(true)}>
              Sign-In
            </Button>
          )}
        </div>
      </Navbar>
      {/* Apply Filter Navbar */}
      {/* Minimum and Maximum Price Navbar */}
      <Navbar className="search-filter-navbar" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <NavDropdown title="Minimum Price" id="basic-nav-dropdown">
              <Form inline className="price-form">
                <Form.Group as={Col} className="price-form-group">
                  <FormControl size="sm" type="text" placeholder="$ / mo" />
                  <Button className="price-apply-button">Apply</Button>
                </Form.Group>
              </Form>
            </NavDropdown>
            <NavDropdown title="Maximum Price" id="basic-nav-dropdown">
              <Form inline className="price-form">
                <Form.Group as={Col} className="price-form-group">
                  <FormControl size="sm" type="text" placeholder="$ / mo" />
                  <Button className="price-apply-button">Apply</Button>
                </Form.Group>
              </Form>
            </NavDropdown>

            {/* Location */}
            <NavDropdown title="City" id="basic-nav-dropdown">
              <Form inline className="price-form">
                <Form.Group as={Col} className="price-form-group">
                  <FormControl size="sm" type="text" placeholder="City Name" />
                  <Button className="price-apply-button">Apply</Button>
                </Form.Group>
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
