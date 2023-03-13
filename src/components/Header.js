import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Badge from "@mui/material/Badge";
import Nav from "react-bootstrap/Nav";
import Menu from "@mui/material/Menu";
import Table from "react-bootstrap/Table";
//import MenuItem from "@mui/material/MenuItem";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import emptycart from "./ezgif.com-crop.gif";
import { useDispatch, useSelector } from "react-redux";
import { DLT, ADD, REMOVE } from "../redux/actions/action";

const Header = () => {
  const [price, setPrice] = useState(0);
  //console.log(price);
  const getdata = useSelector((state) => state.cartreducer.carts);
  //console.log(getdata)
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const send  = (a) => {
    dispatch(ADD(a));
  }

  const dlt = (el_id) => {
    dispatch(DLT(el_id));
  };
  const remove = (item) => {
    dispatch(REMOVE(item));
  }
  const total = () => {
    let price = 0;
    getdata.map((ele, k) => {
      price = ele.price * ele.qnty + price;
    });
    setPrice(price);
  };

  useEffect(() => {
    total();
  }, [total]);

  return (
    <>
      <Navbar bg="dark" variant="dark" style={{ height: "60px" }}>
        <Container>
          <NavLink to="/" className="text-decoration-none text-light mx-3">
            E-Commerce
          </NavLink>
          <Nav className="me-auto">
            <NavLink to="/" className="text-decoration-none text-light">
              Home
            </NavLink>
          </Nav>
          <Badge
            badgeContent={getdata.length}
            color="primary"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <i
              class="fa-solid fa-cart-shopping text-light"
              style={{ fontSize: 25, cursor: "pointer" }}
            ></i>
          </Badge>
        </Container>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {getdata.length ? (
            <div
              className="card-details"
              style={{ width: "24rem", padding: 10 }}
            >
              <Table>
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Restautant Name</th>
                  </tr>
                </thead>
                <tbody>
                  {getdata.map((e) => {
                    return (
                      <>
                        <tr>
                          <td>
                            <NavLink to={`/cart/${e.id}`} onClick={handleClose}>
                              <img
                                src={e.imgdata}
                                style={{ width: "5rem", height: "rem" }}
                                alt=""
                              />
                            </NavLink>
                          </td>
                          <td>
                            <p>{e.rname}</p>
                            <p>Price: ₹ {e.price}</p>
                            <div className="mt-1 d-flex justify-content-between align-items-center" style={{cursor: "pointer"}}>
                              <span>Quantity: </span>
                              <span
                                style={{ fontSize: 18 }}
                                onClick={
                                  e.qnty <= 1
                                    ? () => dlt(e.id)
                                    : () => remove(e)
                                }
                              >
                               <i class="fa-solid fa-minus"/>
                              </span>
                              <span style={{ fontSize: 20 }}>{e.qnty}</span>
                              <span
                                style={{ fontSize: 18 }}
                                onClick={() => send(e)}
                              >
                                 <i class="fa-solid fa-plus"/>
                              </span>
                              </div>
                           
                            <p
                              style={{
                                color: "red",
                                fontSize: 20,
                                cursor: "pointer",
                              }}
                              onClick={() => dlt(e.id)}
                            >
                              {/* onClick={()=>dlt(e.id)} */}
                              <i className="fas fa-trash smalltrash" />
                            </p>
                          </td>
                          <td
                            className="mt-5 "
                            onClick={() => dlt(e.id)}
                            style={{
                              color: "red",
                              fontSize: 20,
                              cursor: "pointer",
                            }}
                          >
                            <i className="fas fa-trash largetrash" />
                          </td>
                        </tr>
                      </>
                    );
                  })}
                  <p className="text-center">Total: ₹ {price}</p>
                </tbody>
              </Table>
            </div>
          ) : (
            <div
              className="card_details d-flex justify-content-center align-items-center"
              style={{ width: "16rem", padding: 8, position: "relative" }}
            >
              <i
                className="fas fa-close smallclose "
                onClick={handleClose}
                style={{
                  position: "absolute",
                  top: 2,
                  right: 10,
                  fontSize: 15,
                  cursor: "pointer",
                }}
              ></i>
              <p style={{ fontSize: 18 }}>Your Cart is Empty</p>
              <img
                src={emptycart}
                className="emptycart_img"
                style={{ width: "5rem", padding: 5 }}
                alt=""
              />
            </div>
          )}
        </Menu>
      </Navbar>
    </>
  );
};

export default Header;
