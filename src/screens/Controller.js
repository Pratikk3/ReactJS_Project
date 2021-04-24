import React from 'react';
import { BrowserRouter as Router, Route  } from 'react-router-dom'
import Details from './details/Details';
import Home from './home/Home';

const Controller = () => {

    const baseUrl = "/api/v1/"

    return(
        <Router>
            <div  className="main-container">
                <Route
                    exact
                    path="/"
                    render={(props) => <Home {...props} baseUrl={baseUrl}/>}
                />
                <Route
                    exact
                    path="/detail"
                    render={(props) => <Details {...props} baseUrl={baseUrl}/>}
                />
            </div>
        </Router>
    )
}

export default Controller