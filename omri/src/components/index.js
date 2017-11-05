import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Home from './Home'
import Feed from './protected/Feed'
import Profile from './protected/Profile'
import { logout } from '../helpers/auth'
import { firebaseAuth } from '../config/constants'
import Post from './protected/Post'

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/feed' />}
    />
  )
}

export default class App extends Component {
  state = {
    authed: false,
    loading: true,
  }
  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
        })
      } else {
        this.setState({
          authed: false,
          loading: false
        })
      }
    })
  }
  
  componentWillUnmount () {
    this.removeListener()
  }
  render() {
    return this.state.loading === true ? <h1>Loading</h1> : (
      <BrowserRouter>
        <div>
          <nav className="navbar navbar-default navbar-static-top">
            <div className="container">
              <div className="navbar-header">
                <Link to="/" className="navbar-brand">Moments</Link>
              </div>
              <ul className="nav navbar-nav pull-right">
                <li>
                  {this.state.authed
                    ? <span>
                      </span>
                    : <span>
                      <Link to="/" className="navbar-brand">Home</Link>
                      </span>}
                </li>
                <li>
                  {this.state.authed
                    ? <span>
                        <Link to="/feed" className="navbar-brand">Feed</Link>
                      </span>
                    : <span>
                      </span>}
                </li>
                <li>
                  {this.state.authed
                    ? <span>
                        <Link to="/profile" className="navbar-brand">Profile</Link>
                      </span>
                    : <span>
                      </span>}
                </li>
                <li>
                  {this.state.authed
                    ? <span>
                        <Link to="/post" className="navbar-brand">Post</Link>
                      </span>
                    : <span>
                      </span>}
                </li>
                <li>
                  {this.state.authed
                    ? <button
                        style={{border: 'none', background: 'transparent'}}
                        onClick={() => {
                          logout()
                        }}
                        className="navbar-brand">Logout</button>
                    : <span>
                        <Link to="/login" className="navbar-brand">Login</Link>
                        <Link to="/register" className="navbar-brand">Register</Link>
                      </span>}
                </li>
              </ul>
            </div>
          </nav>
          <div className="container">
            <div className="row">
              <Switch>
                <Route path='/' exact component={Home} />
                <PublicRoute authed={this.state.authed} path='/login' component={Login} />
                <PublicRoute authed={this.state.authed} path='/register' component={Register} />
                <PrivateRoute authed={this.state.authed} path='/feed' component={Feed} />
                <PrivateRoute authed={this.state.authed} path='/post' component={Post} />
                <PrivateRoute authed={this.state.authed} path='/profile' component={Profile} />
                <Route render={() => <h3>No Match</h3>} />
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
