import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Component} from 'react'
import {FaSearch} from 'react-icons/fa'
import './index.css'

class Header extends Component {
  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    const {
      onChangeSearchInput,
      searchInput,
      getSearchResults,
      onChangeSearchModeDesktop,
      onChangeSearchModeOff,
      pageActive,
      searchMode,
    } = this.props
    console.log(searchMode)

    const classHomeActive =
      pageActive === 'HOME' && !searchMode ? 'nav-link-active' : ''

    const classProfileActive = pageActive === 'PROFILE' ? 'nav-link-active' : ''

    return (
      <nav className="nav-header">
        <div className="nav-content">
          <div className="nav-bar-large-container">
            <Link
              to="/"
              className="nav-bar-website-logo-link"
              onClick={onChangeSearchModeOff}
            >
              <img
                className="nav-website-logo"
                src="https://res.cloudinary.com/dmlhm8dwi/image/upload/v1682664216/Standard_Collection_8website-logo-sm_rj35e0.png"
                alt="website logo"
              />
              <h1 className="nav-website-name">Insta Share</h1>
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
      </nav>
    )
  }
}

export default withRouter(Header)
