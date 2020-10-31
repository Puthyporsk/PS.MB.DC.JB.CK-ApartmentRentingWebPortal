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

import ApartmentThumbnail from "../ApartmentThumbnail/ApartmentThumbnail";
import ApartmentModal from "../ApartmentModal/ApartmentModal";
import { BookmarkStar } from "react-bootstrap-icons";

const Homepage = (props) => {
  const [logout, setLogout] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Stores if the user wants to redirect to the saved apartments page
  const [toSavedApartments, setToSavedApartments] = useState(false);

  const [apartments, setApartments] = useState([]);

  // If user is logged in, get the user's  saved apartments and setLoggedIn to true
  useEffect(() => {
    console.log(props.userInfo);
    if (props.userInfo != null) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const getAllApartments = async () => {
      const response = await fetch(
        "http://localhost:5000/api/apartments/getAll"
      );
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }
      console.log("responseData: ", responseData);
      setApartments(responseData.apartments);
    };

    getAllApartments();
  }, []);

  const expandInfo = async (id) => {
    console.log("id:", id);
    const selectedApartmentResponse = await fetch(
      `http://localhost:5000/api/apartments/getByID/${id}`
    );
    const selectedApartmentData = await selectedApartmentResponse.json();

    if (!selectedApartmentResponse.ok) {
      throw new Error(selectedApartmentData.message);
    }

    console.log(selectedApartmentData);
    setSelectedApartment(selectedApartmentData.apartment);

    setIsSelected(true);
  };

  const handleClose = () => setIsSelected(false);

  const loginRedirect = () => {
    console.log("In login redirect");
    setLogout(true);
  };

  const redirectSavedApartments = () => {
    console.log("Redirecting to saved apartments");

  }

  return (
    <React.Fragment>
      {logout && <Redirect to="/login" />}
      {toSavedApartments && <Redirect to="/savedApartments"/>}
      {isSelected && (
        <ApartmentModal
          userInfo={props.userInfo}
          apartment={selectedApartment}
          loginRedirect={loginRedirect}
          handleClose={handleClose}
          isLoggedIn={isLoggedIn}
        />
      )}
      {/* Header Navbar */}
      <Navbar className="header-navbar" expand="lg">
        <Navbar.Brand>PMDJC Apartments</Navbar.Brand>
        <div>
          <Button onClick={() => isLoggedIn ? setToSavedApartments(true) : setLogout(true)} className="bookmark-button"><BookmarkStar /></Button>
        </div>
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
              {apartments.map((apartment) => (
                <div key={apartment._id}>
                  <ApartmentThumbnail
                    expandInfo={expandInfo}
                    apartment={apartment}
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
