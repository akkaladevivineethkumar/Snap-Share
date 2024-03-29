import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Component} from 'react'
<<<<<<< HEAD
import {GiHamburgerMenu} from 'react-icons/gi'
import {FaSearch} from 'react-icons/fa'
import {AiFillCloseCircle} from 'react-icons/ai'

import './index.css'

class Header extends Component {
  state = {
    showMobileMenu: false,
  }

=======
import {FaSearch} from 'react-icons/fa'
import './index.css'

class Header extends Component {
>>>>>>> 70fce280b41a005ce90c3b9cf857aca59736b9e2
  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

<<<<<<< HEAD
  onShowMobileMenu = () => {
    this.setState(prevState => ({showMobileMenu: !prevState.showMobileMenu}))
  }

  render() {
    const {showMobileMenu} = this.state
=======
  render() {
>>>>>>> 70fce280b41a005ce90c3b9cf857aca59736b9e2
    const {
      onChangeSearchInput,
      searchInput,
      getSearchResults,
<<<<<<< HEAD
      onChangeSearchMode,
=======
>>>>>>> 70fce280b41a005ce90c3b9cf857aca59736b9e2
      onChangeSearchModeDesktop,
      onChangeSearchModeOff,
      pageActive,
      searchMode,
    } = this.props
<<<<<<< HEAD
=======
    console.log(searchMode)
>>>>>>> 70fce280b41a005ce90c3b9cf857aca59736b9e2

    const classHomeActive =
      pageActive === 'HOME' && !searchMode ? 'nav-link-active' : ''

    const classProfileActive = pageActive === 'PROFILE' ? 'nav-link-active' : ''

<<<<<<< HEAD
    const classSearchModeActive = searchMode === true ? 'nav-link-active' : ''

    return (
      <nav className="nav-header">
        <div className="nav-content">
          <div className="nav-bar-mobile-logo-container">
            <Link
              to="/"
              className="nav-bar-website-logo-link"
              onClick={onChangeSearchModeOff}
            >
              <img
                className="nav-website-logo"
                src="https://res.cloudinary.com/dv99nu7xv/image/upload/v1711689686/logo-no-background_c7wr63.png"
                alt="website logo"
              />
              {/* <h1 className="nav-website-name">Insta Share</h1> */}
            </Link>
            <button
              type="button"
              className="nav-mobile-btn"
              onClick={this.onShowMobileMenu}
            >
              <span>""</span>
              <GiHamburgerMenu className="nav-mobile-menu-icon" />
            </button>
          </div>
=======
    return (
      <nav className="nav-header">
        <div className="nav-content">
>>>>>>> 70fce280b41a005ce90c3b9cf857aca59736b9e2
          <div className="nav-bar-large-container">
            <Link
              to="/"
              className="nav-bar-website-logo-link"
              onClick={onChangeSearchModeOff}
            >
              <img
                className="nav-website-logo"
<<<<<<< HEAD
                src="https://res.cloudinary.com/dv99nu7xv/image/upload/v1711689686/logo-no-background_c7wr63.png"
                alt="website logo"
              />
              {/* <h1 className="nav-website-name">Insta Share</h1> */}
=======
                src="https://res.cloudinary.com/dmlhm8dwi/image/upload/v1682664216/Standard_Collection_8website-logo-sm_rj35e0.png"
                alt="website logo"
              />
              <h1 className="nav-website-name">Insta Share</h1>
>>>>>>> 70fce280b41a005ce90c3b9cf857aca59736b9e2
            </Link>
            <ul className="nav-menu">
              <li
                className="nav-search-bar"
                onClick={onChangeSearchModeDesktop}
              >
                <input
                  onChange={onChangeSearchInput}
                  type="search"
                  className="nav-search-input"
                  placeholder="Search Caption"
                  value={searchInput}
                />
                <button
                  type="button"
                  data-testid="searchIcon"
                  className="nav-search-button"
                  onClick={getSearchResults}
                >
<<<<<<< HEAD
                  <span className="hide">1</span>
=======
>>>>>>> 70fce280b41a005ce90c3b9cf857aca59736b9e2
                  <FaSearch className="nav-search-icon" />
                </button>
              </li>
              <li className="nav-menu-item" onClick={onChangeSearchModeOff}>
                <Link to="/" className={`nav-link ${classHomeActive}`}>
                  Home
                </Link>
              </li>
              <li className="nav-menu-item">
                <Link
                  to="/my-profile"
                  className={`nav-link ${classProfileActive}`}
                >
                  Profile
                </Link>
              </li>
            </ul>
            <button
              type="button"
              className="logout-desktop-btn"
              onClick={this.onClickLogout}
            >
              Logout
            </button>
          </div>
        </div>
<<<<<<< HEAD

        {showMobileMenu && (
          <div className="nav-menu-mobile">
            <ul className="nav-menu-list-mobile">
              <li
                className="nav-menu-item-mobile"
                onClick={onChangeSearchModeOff}
              >
                <Link to="/" className={`nav-link ${classHomeActive}`}>
                  Home
                </Link>
              </li>
              <li className="nav-menu-item-mobile" onClick={onChangeSearchMode}>
                <Link to="/" className={`nav-link ${classSearchModeActive}`}>
                  Search
                </Link>
              </li>
              <li className="nav-menu-item-mobile">
                <Link
                  to="/my-profile"
                  className={`nav-link ${classProfileActive}`}
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className="nav-menu-item-mobile-logout-btn"
                  onClick={this.onClickLogout}
                >
                  Logout
                </button>
              </li>
              <li>
                <button
                  onClick={this.onShowMobileMenu}
                  type="button"
                  className="nav-menu-item-mobile-close-btn"
                >
                  <span>1</span>
                  <AiFillCloseCircle />
                </button>
              </li>
            </ul>
          </div>
        )}
=======
>>>>>>> 70fce280b41a005ce90c3b9cf857aca59736b9e2
      </nav>
    )
  }
}

export default withRouter(Header)
