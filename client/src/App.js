import React from 'react';
import './App.css';
import Login from './components/Login';
import Picture from './components/Picture';
import Register from './components/Register';
import { Provider } from 'react-redux'
import store from './redux/store'
import { Route, Switch,Redirect } from 'react-router-dom';
import TodayPicture from './components/TodayPicture';
import NavBar from './components/NavBar';
import HistoryPictuer from './components/HistoryPictuer';
import { connect } from 'react-redux';



 function App(props) {
  return (
    <div className="App">
      <div className="container ">
        <div className="row ">

          <div style={{ display: "inline-block" }} className="col-12 justify-content-center‏">
            <Switch>
              <Route component={NavBar} path="/navbar" />
              <Route component={Register} path="/register" />

              <Route path="/login/todayPicture">
                {props.name != '' ?
                  <TodayPicture ></TodayPicture>
                  :
                  <Redirect to="/Login" />}
              </Route>

              <Route path="/login/historyPicture">
                {props.name != '' ?
                  <HistoryPictuer ></HistoryPictuer>
                  :
                  <Redirect to="/Login" />}

              </Route>
              <Route path="/login/picture" >
                {props.name != '' ?
                  <Picture></Picture>
                  :
                  <Redirect to="/Login" />}
              </Route>
              <Route component={Login} path="/" />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  )
}


export default connect(
  (state) => {
      return {
          name: state.name,
          password: state.password,
          email: state.email,
          picture: state.picture
      }
  },
  null
)(App);