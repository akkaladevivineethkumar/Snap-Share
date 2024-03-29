import {Switch, Route, Redirect} from 'react-router-dom'
<<<<<<< HEAD

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import MyProfile from './components/MyProfile'
import UserProfile from './components/UserProfile'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

=======
import Login from './components/Login'
import Home from './components/Home'
import MyProfile from './components/MyProfile'
import UserProfile from './components/UserProfile'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
>>>>>>> 70fce280b41a005ce90c3b9cf857aca59736b9e2
import './App.css'

const App = () => (
  <Switch>
<<<<<<< HEAD
    <Route exact path="/login" component={LoginForm} />
=======
    <Route exact path="/login" component={Login} />
>>>>>>> 70fce280b41a005ce90c3b9cf857aca59736b9e2
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/my-profile" component={MyProfile} />
    <ProtectedRoute exact path="/users/:id" component={UserProfile} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)
<<<<<<< HEAD

=======
>>>>>>> 70fce280b41a005ce90c3b9cf857aca59736b9e2
export default App
