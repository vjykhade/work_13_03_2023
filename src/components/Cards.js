import React, {useState} from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import CardsData from "./CardsData";
import "./style.css";
import { useDispatch } from "react-redux";
import { ADD } from "../redux/actions/action";

const Cards = () => {
  const [data, setData] = useState(CardsData);

  const dispatch = useDispatch();

  const send  = (a) => {
    dispatch(ADD(a));
  }

  return (
    <div className="container mt-3">
      <h2 className="text-center">Menu</h2>
      <div className="row d-flex justify-content-center align-items-center" >
        {data.map((element, id) => {
          return (
            <>
              <Card style={{ width: "22rem", border:"none" }} className="mx-2 mt-4 card_style">
                <Card.Img variant="top" src={element.imgdata} style={{height:"16rem" }} className="mt-3"/>
                <Card.Body>
                  <Card.Title>{element.rname}</Card.Title>
                  <Card.Text style={{fontSize:20}}>
                   Price: ₹ {element.price}
                  </Card.Text>
                  <div className="button_div d-flex justify-content-center">
                  <Button variant="primary"
                  onClick={() => send(element)}
                  className="col-lg-12">Add To Cart</Button>
                  </div>
                </Card.Body>
              </Card>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Cards;
