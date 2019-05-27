import React from "react";
import { Route, Switch } from "react-router-dom";
//import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import RecordPage from "./records/RecordPage";
import ManagerecordPage from "./records/ManageRecordPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={RecordPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/records" component={RecordPage} />
        <Route path="/record/:slug" component={ManagerecordPage} />
        <Route path="/record" component={ManagerecordPage} />
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
