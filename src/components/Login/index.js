import {useState} from 'react'
import {useHistory, Redirect} from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import './index.css'

const Login = () => {
  const History = useHistory()
  const [errorMsg, seterrormsg] = useState('')
  const [error, seterror] = useState(false)

  const submitForm = async event => {
    try {
      event.preventDefault()
      const formData = new FormData(event.target)
      const username = formData.get('user')
      const password = formData.get('pass')
      const userDetails = JSON.stringify({
        username,
        password,
      })
      const url = 'https://apis.ccbp.in/login'
      const res = await axios.post(url, userDetails)
      if (res?.status === 200) {
        Cookies.set('jwt_token', res.data.jwt_token)
        History.replace('/')
      }
    } catch (e) {
      seterrormsg(e.response.data.error_msg)
      seterror(true)
    }
  }

  const renderPasswordField = () => (
    <>
      <label className="input-label" htmlFor="password">
        PASSWORD
      </label>
      <input
        type="password"
        id="password"
        className="password-input-field"
        name="pass"
        placeholder="Password"
      />
    </>
  )

  const renderUsernameField = () => (
    <>
      <label className="input-label" htmlFor="username">
        USERNAME
      </label>
      <input
        type="text"
        id="username"
        className="username-input-field"
        name="user"
        placeholder="Username"
      />
    </>
  )

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }

  return (
    <>
      <div className="login-form-container">
        <img
          className="login-image"
          src="https://res.cloudinary.com/dmlhm8dwi/image/upload/v1682592775/Layer_2login-image_vgli1y.png"
          alt="website login"
        />
        <form className="form-container" onSubmit={submitForm}>
          <img
            className="login-website-logo"
            src="https://res.cloudinary.com/dv99nu7xv/image/upload/v1704462448/Group_b0oiny.png"
            alt="website logo"
          />
          <h1 className="website-logo-name">Insta Share</h1>
          <div className="input-container">{renderUsernameField()}</div>
          <div className="input-container">{renderPasswordField()}</div>
          {error && <p className="error-message">{errorMsg}</p>}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </>
  )
}
export default Login
