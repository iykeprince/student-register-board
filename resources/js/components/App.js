import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import Teacher from "./teachers";
import AddStudent from './students/AddStudent';
import ViewStudent from "./students/ViewStudent";
import Login from "./auth/Login";
import Register from "./auth/Register";

function App() {
    

    return (
        <div className="container">
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Teacher} />
                    <Route exact path="/add-student" component={AddStudent} />
                    <Route exact path="/view-student/:id" component={ViewStudent} />
                    {/* <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} /> */}
                </Switch>
            </BrowserRouter>
        </div>
    );
}
 
export default App;

if (document.getElementById("root")) {
    ReactDOM.render(<App />, document.getElementById("root"));
}
