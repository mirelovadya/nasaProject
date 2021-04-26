import React from 'react';
import './App.css';
import Login from './components/Login';
import Picture from './components/Picture';
import Register from './components/Register';
import { Provider } from 'react-redux'
import store from './redux/store'
import { Route, Switch, Link } from 'react-router-dom';
import TodayPicture from './components/TodayPicture';
import NavBar from './components/NavBar';
import HistoryPictuer from './components/HistoryPictuer';



export default function App() {

  return (

    <div className="App">


      <div className="container ">
        <div className="row ">

          <div style={{display:"inline-block"}} className="col-12 justify-content-center‏">
            <Switch>
              <Route component={NavBar} path="/navbar" />
              <Route component={Register} path="/register" />
              <Route component={TodayPicture} path="/login/todayPicture" />
              <Route component={HistoryPictuer} path="/login/historyPicture" />
              <Route component={Picture} path="/login/picture" />
              <Route component={Login} path="/" />
            </Switch>
          </div>

          {/* <div className="col-6">
              <Register />
            </div> */}
          {/* </Provider> */}

        </div>
        {/* <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img style={{opacity:0.5,display:'flex'}} className="d-block w-100" src="1.jpg" alt="First slide" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src="2.jpg" alt="Second  slide" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src="3.jpg" alt="Third  slide" />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}


