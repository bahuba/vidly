import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Movies from "./components/movies";
import NavBar from "./components/navBar";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import MovieForm from "./components/movieForm";
import NotFound from "./components/not-found";
import LoginForm from "./components/loginform";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import ProtectedRoute from "./components/protectedRoute";
import auth from "./services/authService";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
    console.log("Current user: ", user);
  }

  render() {
    const { user } = this.state;

    return (
      <div>
        <NavBar user={this.state.user} />
        <main className="container">
          <Switch>
            <ProtectedRoute path="/movie/:id" component={MovieForm} />
            <Route
              path="/movies"
              render={(props) => <Movies {...props} user={user} />}
            />
            <Route path="/customers" component={Customers} />
            <Route path="/Rentals" component={Rentals} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/" exact component={Movies} />
            <Redirect push to="/not-found" />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
