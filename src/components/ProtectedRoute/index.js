<<<<<<< HEAD
import {Redirect, Route} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = props => {
  const accessToken = Cookies.get('jwt_token')
  if (accessToken === undefined) {
=======
import Cookies from 'js-cookie'

import {Redirect, Route} from 'react-router-dom'

const ProtectedRoute = props => {
  const token = Cookies.get('jwt_token')

  if (token === undefined) {
>>>>>>> 70fce280b41a005ce90c3b9cf857aca59736b9e2
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}
<<<<<<< HEAD

=======
>>>>>>> 70fce280b41a005ce90c3b9cf857aca59736b9e2
export default ProtectedRoute
