import Preloader from "../src/components/Pre";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";

import ScrollToTop from "./components/ScrollToTop";
import Contacts from "./components/Contacts/Contacts";
import Login from "./components/Login/login";
import auth from "./services/authService";

import React, { Component } from "react";
import Logout from "./components/Login/logout";
import Profile from "./components/Profile/profile";
import ProjectForm from "./components/Projects/ProjectForm/ProjectForm";
import ProjectDetail from "./components/Projects/ProjectDetail/ProjectDetail";
import UserContextProvider from "./contexts/UserContext";

class App extends React.Component {
  state = {
    load: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      load: true,
    };
  }

  componentDidMount() {
    const user = auth.getCurrentUser();
    const timer = setTimeout(() => {
      this.setState({ load: false, user });
    }, 1200);

    return () => clearTimeout(timer);
  }
  render() {
    const { load, user } = this.state;

    return (
      <UserContextProvider user={user}>
        <ToastContainer></ToastContainer>
        <Router>
          <Preloader load={load} />
          <div className="App" id={load ? "no-scroll" : "scroll"}>
            <Navbar user={user} />
            <ScrollToTop />
            <Switch>
              <Route
                path="/"
                exact
                render={(props) => <Home {...props} user={user}></Home>}
              />
              <Route exact path="/project" component={Projects} />
              <Route path="/about" component={About} />
              <Route path="/project/:id" component={ProjectDetail} />
              <Route path="/contact" component={Contacts} />
              <Route path="/login" component={Login} />
              <Route path="/logout" component={Logout} />
              <Route path="/profile" component={Profile} />
              {this.getAdminRoutes(user).map((route) => route)}
            </Switch>
            <Footer />
          </div>
        </Router>
      </UserContextProvider>
    );
  }

  getAdminRoutes = (user) => {
    var adminRoutes = [];
    if (!user) {
      return adminRoutes;
    }
    if (user.authorities.includes("ADMIN")) {
      adminRoutes.push(
        <Route path="/projectForm" key="1" component={ProjectForm} />
      );
    }
    return adminRoutes;
  };
}

export default App;
