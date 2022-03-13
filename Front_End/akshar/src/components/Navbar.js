import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { CgUser } from "react-icons/cg";
import {
  AiOutlineLogin,
  AiOutlineHome,
  AiOutlineFundProjectionScreen,
  AiOutlineUser,
  AiOutlineLogout,
} from "react-icons/ai";
import logo from "../Assets/logo.png";

function NavBar({ user }) {
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);

  function scrollHandler() {
    if (window.scrollY >= 20) {
      updateNavbar(true);
    } else {
      updateNavbar(false);
    }
  }

  window.addEventListener("scroll", scrollHandler);

  return (
    <Navbar
      expanded={expand}
      fixed="top"
      expand="md"
      className={navColour ? "sticky" : "navbar"}
    >
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} className="img-fluid logo" alt="brand" />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            updateExpanded(expand ? false : "expanded");
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto" defaultActiveKey="#home">
            <Nav.Item>
              <Nav.Link as={Link} to="/" onClick={() => updateExpanded(false)}>
                <AiOutlineHome style={{ marginBottom: "2px" }} /> Home
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/about"
                onClick={() => updateExpanded(false)}
              >
                <AiOutlineUser style={{ marginBottom: "2px" }} /> About
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/project"
                onClick={() => updateExpanded(false)}
              >
                <AiOutlineFundProjectionScreen
                  style={{ marginBottom: "2px" }}
                />{" "}
                Projects
              </Nav.Link>
            </Nav.Item>

            {/* {!user && (
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  className="nav-link"
                  to="/login"
                  onClick={() => updateExpanded(false)}
                >
                  <AiOutlineLogin style={{ marginBottom: "2px" }} /> Login
                </Nav.Link>
              </Nav.Item>
            )} */}
            {user && (
              <React.Fragment>
                <Nav.Item>
                  <Nav.Link as={Link} className="nav-link" to="/logout">
                    <AiOutlineLogout style={{ marginBottom: "2px" }} /> Logout
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    as={Link}
                    className="nav-link"
                    to="/profile"
                    onClick={() => updateExpanded(false)}
                  >
                    <AiOutlineUser style={{ marginBottom: "2px" }} />{" "}
                    {user && user.email.split("@")[0]}
                  </Nav.Link>
                </Nav.Item>
              </React.Fragment>
            )}

            {/* <Nav.Item className="fork-btn">
              <Button
                href="https://github.com/soumyajit4419/Portfolio"
                target="_blank"
                className="fork-btn-inner"
              >
                <CgGitFork style={{ fontSize: "1.2em" }} />{" "}
                <AiFillStar style={{ fontSize: "1.1em" }} />
              </Button>
            </Nav.Item> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
