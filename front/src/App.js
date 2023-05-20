
import React from 'react';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import { Redirect } from 'react-router'

//import styles
import './scss/main.scss'

//import components
import Homepage from './pages/Homepage'
import Navbar from './components/nav/Navbar'
import Login from './components/user/Login'
import Signup from './components/user/Signup0'
import AdminDash from './components/nav/AdminDash'
import NewArticle from './components/article/NewArticle'
import ViewArticle from './components/article/ViewArticle'
import AuthDataProvider from "./components/auth-provider";
import {useAuthDataContext} from "./components/auth-provider";


const App = () => {
      return (
        <Router>
        <div>
              <Navbar/>
              <Switch>
                <Route exact path="/" component={Homepage}/>
                <Route exact path="/blog/*" component={ViewArticle}/>
                <Route path="/signup" component={Signup}/>
                <AuthDataProvider>
                  <SentryRoute path="/login" access='user' success={Login} fail={Login}/>
                  <SentryRoute path="/dash" access='user' success={AdminDash} fail={Login}/>
                  <SentryRoute path="/newArticle" access='user' success={NewArticle} fail={Login}/>
                </AuthDataProvider>
              </Switch>
            </div>
        </Router>

      )
  }

const SentryRoute = ({ access, success, fail, ...options }) => {
  //const { user } = useAuthDataContext();
// localStorage.setItem('user',null)
  let user = localStorage.getItem('user');
  if(user == '' || null){
    return <Route {...options} component={fail} />;
  }else{
    user = JSON.parse(localStorage.getItem('user'));
    const finalComponent = (user && user.role==access? success : fail);
    return <Route {...options} component={finalComponent} />;
  }



};

export default App;
