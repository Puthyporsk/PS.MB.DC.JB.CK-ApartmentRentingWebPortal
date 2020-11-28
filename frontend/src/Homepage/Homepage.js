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
  Modal,
} from "react-bootstrap";
import "./Homepage.css";

import ApartmentThumbnail from "../ApartmentThumbnail/ApartmentThumbnail";
import ApartmentModal from "../ApartmentModal/ApartmentModal";

const Homepage = (props) => {
  const [logout, setLogout] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [addApartmentClicked, setAddApartmentClicked] = useState(false);

  const [apartments, setApartments] = useState([]);

  const [mainImageInput, setMainImageInput] = useState("");
  const [priceInput, setPriceInput] = useState(0);
  const [cityInput, setCityInput] = useState("");
  const [sqftInput, setSqftInput] = useState(0);
  const [bedAmountInput, setBedAmountInput] = useState(0);
  const [bathAmountInput, setBathAmountInput] = useState(0);
  const [otherImagesInput, setOtherImagesInput] = useState("");
  const [morePictures, setMorePictures] = useState([]);
  const [evenMorePictures, setEvenMorePictures] = useState("");
  const [counter, setCounter] = useState([]);


  const [newApartments, setNewApartments] = useState({
    mainImage: "",
    price: 0,
    city: "",
    sqft: 0,
    bedAmount: 0,
    bathAmount: 0,
    otherImages: []
  });

  useEffect(() => {
    console.log(props.userInfo);
    if (props.userInfo != null) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const getApartmentByID = async () => {
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

    getApartmentByID();
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

  const handleAddApartment = async (e, data) =>{
    e.preventDefault();
    setAddApartmentClicked(false);
    {console.log(newApartments)}

    try {
      const response = await fetch("http://localhost:5000/api/apartments/addApartment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      console.log(responseData);
    } catch (err) {
      console.log(err.message || "Something went wrong, please try again");
    }
  }

  const handleSubmitClicked = () =>{
    counter.map(i => morePictures.push(document.getElementById(i).value));
    morePictures.push(otherImagesInput);
    setNewApartments({
          mainImage: mainImageInput,
          price: priceInput,
          city: cityInput,
          sqft: sqftInput,
          bedAmount: bedAmountInput,
          bathAmount: bathAmountInput,
          otherImages: morePictures
    });
  }

  return (
    <React.Fragment>
      {logout && <Redirect to="/login" />}
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
                    id={apartment._id}
                    image={apartment.mainImage}
                    price={apartment.price}
                    bathAmount={apartment.bathAmount}
                    bedAmount={apartment.bedAmount}
                    city={apartment.city}
                    sqft={apartment.sqft}
                  />
                </div>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>

      {isLoggedIn && props.userInfo.type === "Owner" ?
          <div className="floatbtn" onClick={() => setAddApartmentClicked(true)}><span className="floatbtn-icon">Add Apartment</span></div>   : null}
      {addApartmentClicked ? 
        <Modal
          show={true}
          onHide={() => setAddApartmentClicked(false)}
        >
          <Modal.Header closeButton>
          <Modal.Title>
            Adding Apartment
          </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={(e)=> {
              handleAddApartment(e, newApartments);
            }}>
              <label>Main Image:&nbsp;</label>
              <input onChange={(e) => setMainImageInput(e.target.value)}></input>
              <p></p>
              <label>Price:&nbsp;</label>
              <input onChange={(e) => setPriceInput(e.target.value)}></input>
              <p></p>
              <label>City:&nbsp;</label>
              <input onChange={(e) => setCityInput(e.target.value)}></input>
              <p></p>
              <label>Sq Ft:&nbsp;</label>
              <input onChange={(e) => setSqftInput(e.target.value)}></input>
              <p></p>
              <label>Bed Amount:&nbsp;</label>
              <input onChange={(e) => setBedAmountInput(e.target.value)}></input>
              <p></p>
              <label>Bath Amount:&nbsp;</label>
              <input onChange={(e) => setBathAmountInput(e.target.value)}></input>
              <p></p>
              <label>Other Images:&nbsp;</label>
              <input onChange={(event) => setOtherImagesInput(event.target.value)}></input>
              <p></p>
              <button type="button" onClick={() => {setCounter([...counter, counter.length+1])}}>Add More Images&nbsp;</button>
              {counter}
              {counter.map(x => (<p>    
                <input id={x} onChange={(event) => setEvenMorePictures(event.target.value)}></input>
              </p>))}
              <p></p>
              <button onClick={() => {
                handleSubmitClicked()
              }}>Submit</button>
            </form>
          </Modal.Body>
          <Modal.Footer>

          </Modal.Footer>
        </Modal>
      : null}
    </React.Fragment>
  );
};

export default Homepage;
