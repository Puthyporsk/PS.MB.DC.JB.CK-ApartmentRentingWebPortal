import React, {useState, useEffect} from 'react'
import {Redirect} from "react-router";

import { Navbar, Container, Row, Col, Card, Button } from "react-bootstrap";

const SavedApartments = (props) => {

      // Stores the user's apartments
  const [savedApartments, setSavedApartments] = useState();
  const [loading, setLoading] = useState(true);

  // True if the user clicks the back button
  const [toHome, setToHome] = useState(false);

    useEffect(() => {
        const getSavedApartments = async () => {
            const savedApartmentsResponse = await fetch(
                "http://localhost:5000/api/users/getUserApartments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userID: props.userInfo._id
                })
                }
            );
            const savedApartmentsData = await savedApartmentsResponse.json();
        
            if (!savedApartmentsResponse.ok) {
                throw new Error(savedApartmentsData.message);
            }
            console.log("savedApartmentsData: ", savedApartmentsData.savedApartments);
            setSavedApartments(savedApartmentsData.savedApartments);
            setLoading(false);
            };
            
            if (props.userInfo) {
                getSavedApartments();
            }            
    }, [])

    if (loading) {
        return (
        <div>
            <h3>Loading</h3>
        </div>
        )
    } else {
    return (
        <div>
            {toHome && <Redirect to="/home"/>}
        <Navbar className="header-navbar" expand="lg">
            <Navbar.Brand>Saved Apartments</Navbar.Brand>
            <Button onClick={() => setToHome(true)}>Back</Button>
        </Navbar>    
        <Container fluid={true}>
        <Row noGutters>
          <Col>
            <ul>
              {savedApartments.map((apartment) => (
                <Card
                key={apartment._id}
                style={{ width: "30rem" }}
              >
                <Card.Img className="apartment-image" variant="top" src={apartment.mainImage} />
                <Card.Body>
                  <Card.Title>${apartment.price} /mo</Card.Title>
                  <Card.Text>{apartment.sqft} sqft</Card.Text>
                  <Card.Text>
                    {apartment.bathAmount} beds | {apartment.bedAmount} baths
                  </Card.Text>
                </Card.Body>
                <Card.Footer>{apartment.city}</Card.Footer>
              </Card>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
        </div>
    )
    }
}

export default SavedApartments
