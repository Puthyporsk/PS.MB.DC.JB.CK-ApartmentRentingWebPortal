import React, { useState } from "react";
import { Modal } from "react-bootstrap";

const AddApartmentDialogue = (props) => {

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

    const handleAddApartment = async (e, data) =>{
        e.preventDefault();
        props.close();
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
        <Modal
            show={true}
            onHide={props.close}
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
  );
};

export default AddApartmentDialogue;
