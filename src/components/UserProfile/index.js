<<<<<<< HEAD
import './index.css'

import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'

import Header from '../Header'
=======
import {useEffect, useState} from 'react'
import Loader from 'react-loader-spinner'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import Header from '../Header'
import instance from '../Instance'
import './index.css'
>>>>>>> 70fce280b41a005ce90c3b9cf857aca59736b9e2

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

<<<<<<< HEAD
class UserProfile extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    userProfileData: {},
    isMobile: false,
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowSizeChange)
    this.handleWindowSizeChange()

    this.getUserProfileData()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange)
  }

  handleWindowSizeChange = () => {
    const isMobile = window.innerWidth <= 768
    this.setState({isMobile})
  }

  getUserProfileData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({apiStatus: apiStatusConstants.inProgress})

    const accessToken = Cookies.get('jwt_token')

    const userProfileUrl = `https://apis.ccbp.in/insta-share/users/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(userProfileUrl, options)

    if (response.ok === true) {
      const fetchedData = await response.json()

      //   console.log(fetchedData)

      const updatedData = {
        id: fetchedData.user_details.id,
        userId: fetchedData.user_details.user_id,
        username: fetchedData.user_details.user_name,
        profilePic: fetchedData.user_details.profile_pic,
        followersCount: fetchedData.user_details.followers_count,
        followingCount: fetchedData.user_details.following_count,
        userBio: fetchedData.user_details.user_bio,
        posts: fetchedData.user_details.posts,
        postsCount: fetchedData.user_details.posts_count,
        stories: fetchedData.user_details.stories,
      }

      this.setState({
        userProfileData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderUserProfileSuccessView = () => {
    const {userProfileData, isMobile} = this.state
    const {
      userId,
      username,
      userBio,
      profilePic,
      postsCount,
      followersCount,
      followingCount,
      stories,
      posts,
    } = userProfileData

    const shouldShowPosts = posts.length > 0

    return (
      <div className="user-profile-success-view">
        <div className="user-profile-success-view-profile-section">
          {/* Profile info Mobile & Desktop View */}

          {isMobile ? (
            <div className="user-profile-success-view-profile-mobile-info-container">
              <h1 className="user-profile-success-view-profile-mobile-info-username">
                {username}
              </h1>
              <div className="user-profile-success-view-profile-mobile-info-stats-container">
                <img
                  src={profilePic}
                  alt="profile_pic"
                  className="user-profile-success-view-profile-mobile-info-profile-pic"
                />

                <div className="user-profile-success-view-profile-mobile-info-stats">
                  <p className="user-profile-success-view-profile-mobile-info-stats-count">
                    {postsCount}
                  </p>
                  <p className="user-profile-success-view-profile-mobile-info-stats-type">
                    posts
                  </p>
                </div>
                <div className="user-profile-success-view-profile-mobile-info-stats">
                  <p className="user-profile-success-view-profile-mobile-info-stats-count">
                    {followersCount}
                  </p>
                  <p className="user-profile-success-view-profile-mobile-info-stats-type">
                    followers
                  </p>
                </div>
                <div className="user-profile-success-view-profile-mobile-info-stats">
                  <p className="user-profile-success-view-profile-mobile-info-stats-count">
                    {followingCount}
                  </p>
                  <p className="user-profile-success-view-profile-mobile-info-stats-type">
                    following
                  </p>
                </div>
              </div>
              <div className="user-profile-success-view-profile-mobile-info-bio-container">
                <p className="user-profile-success-view-profile-mobile-info-bio-userId">
                  {userId}
                </p>
                <p className="user-profile-success-view-profile-mobile-info-bio-description">
                  {userBio}
                </p>
              </div>
            </div>
          ) : (
            <div className="user-profile-success-view-profile-desktop-info-container">
              <img
                src={profilePic}
                alt="user profile"
                className="user-profile-success-view-profile-desktop-info-profile-pic"
              />
              <div className="user-profile-success-view-profile-desktop-info-stats-container">
                <h1 className="user-profile-success-view-profile-desktop-info-stats-username">
                  {username}
                </h1>
                <div className="user-profile-success-view-profile-desktop-info-stats-details-container">
                  <p className="user-profile-success-view-profile-desktop-info-stats-details-type">
                    <span className="user-profile-success-view-profile-desktop-info-stats-details-count">
                      {postsCount}
                    </span>{' '}
                    posts
                  </p>

                  <p className="user-profile-success-view-profile-desktop-info-stats-details-type">
                    <span className="user-profile-success-view-profile-desktop-info-stats-details-count">
                      {followersCount}
                    </span>{' '}
                    followers
                  </p>

                  <p className="user-profile-success-view-profile-desktop-info-stats-details-type">
                    <span className="user-profile-success-view-profile-desktop-info-stats-details-count">
                      {followingCount}
                    </span>{' '}
                    following
                  </p>
                </div>
                <div className="user-profile-success-view-profile-desktop-info-bio-container">
                  <p className="user-profile-success-view-profile-desktop-info-bio-userId">
                    {userId}
                  </p>
                  <p className="user-profile-success-view-profile-desktop-info-bio-description">
                    {userBio}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Profile Stories Section */}
          <ul className="user-profile-success-view-stories-list-container">
            {stories.map(eachStory => (
              <li
                key={eachStory.id}
                className="user-profile-success-view-story-item"
              >
                <img
                  src={eachStory.image}
                  alt="user story"
                  className="user-profile-success-view-story-item-image"
=======
const UserProfile = props => {
  const [userProfileData, setuserProfileData] = useState([])
  const [apiStatus, setapiStatus] = useState(apiStatusConstants.initial)

  const profiles = async () => {
    try {
      setapiStatus(apiStatusConstants.inProgress)
      const {match} = props
      const {params} = match
      const {id} = params
      const res = await instance.get(
        `https://apis.ccbp.in/insta-share/users/${id}`,
      )
      setuserProfileData(res.data.user_details)
      setapiStatus(apiStatusConstants.success)
    } catch (e) {
      setapiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    profiles()
  }, [])

  const renderAllUserProfileLoadingView = () => (
    <div className="user-profile-loading-view">
      <div
        className="user-profile-desktop-loader-container"
        data-testid="loader"
      >
        <Loader type="TailSpin" color="#4094EF" height={53} width={53} />
      </div>
    </div>
  )

  const onClickTryAgainBtn = () => {
    profiles()
  }

  const renderUserProfileFailureView = () => (
    <div className="user-profile-failure-view">
      <img
        className="user-profile-failure-view-image"
        src="https://res.cloudinary.com/dmlhm8dwi/image/upload/v1683130740/Group_7522something-went-wrong-image_hjsfjr.png"
        alt="failure view"
      />
      <p className="user-profile-failure-view-error">
        Something went wrong. Please try again
      </p>
      <button
        className="user-profile-failure-view-btn"
        type="button"
        onClick={onClickTryAgainBtn}
      >
        Try again
      </button>
    </div>
  )

  const renderUserProfileSuccessView = () => {
    const {
      user_id,
      user_name,
      user_bio,
      profile_pic,
      posts_count,
      followers_count,
      following_count,
      stories,
      posts,
    } = userProfileData
    const shouldShowPosts = posts.length > 0

    return (
      <div className="my-profile-success-view">
        <div className="my-profile-success-view-profile-section">
          {/* Profile info Mobile & Desktop View */}
          <div className="my-profile-success-view-profile-desktop-info-container">
            <img
              src={profile_pic}
              alt="my profile"
              className="my-profile-success-view-profile-desktop-info-profile-pic"
            />
            <div className="my-profile-success-view-profile-desktop-info-stats-container">
              <h1 className="my-profile-success-view-profile-desktop-info-stats-username">
                {user_name}
              </h1>
              <div className="my-profile-success-view-profile-desktop-info-stats-details-container">
                <p className="my-profile-success-view-profile-desktop-info-stats-details-type">
                  <span className="my-profile-success-view-profile-desktop-info-stats-details-count">
                    {posts_count}
                  </span>{' '}
                  posts
                </p>

                <p className="my-profile-success-view-profile-desktop-info-stats-details-type">
                  <span className="my-profile-success-view-profile-desktop-info-stats-details-count">
                    {followers_count}
                  </span>{' '}
                  followers
                </p>

                <p className="my-profile-success-view-profile-desktop-info-stats-details-type">
                  <span className="my-profile-success-view-profile-desktop-info-stats-details-count">
                    {following_count}
                  </span>{' '}
                  following
                </p>
              </div>
              <div className="my-profile-success-view-profile-desktop-info-bio-container">
                <p className="my-profile-success-view-profile-desktop-info-bio-userId">
                  {user_id}
                </p>
                <p className="my-profile-success-view-profile-desktop-info-bio-description">
                  {user_bio}
                </p>
              </div>
            </div>
          </div>
          {/* My Profile Stories Section */}
          <ul className="my-profile-success-view-stories-list-container">
            {stories.map(eachStory => (
              <li
                key={eachStory.id}
                className="my-profile-success-view-story-item"
              >
                <img
                  src={eachStory.image}
                  alt="my story"
                  className="my-profile-success-view-story-item-image"
>>>>>>> 70fce280b41a005ce90c3b9cf857aca59736b9e2
                />
              </li>
            ))}
          </ul>
        </div>
<<<<<<< HEAD
        {/* Profile Posts Section */}
        <div className="user-profile-success-view-posts-section">
          <div className="user-profile-success-view-posts-icon-container">
            <BsGrid3X3 className="user-profile-success-view-posts-icon" />
            <h1 className="user-profile-success-view-posts-icon-heading">
=======
        {/* My Profile Posts Section */}
        <div className="my-profile-success-view-posts-section">
          <div className="my-profile-success-view-posts-icon-container">
            <BsGrid3X3 className="my-profile-success-view-posts-icon" />
            <h1 className="my-profile-success-view-posts-icon-heading">
>>>>>>> 70fce280b41a005ce90c3b9cf857aca59736b9e2
              Posts
            </h1>
          </div>
          {shouldShowPosts ? (
<<<<<<< HEAD
            <ul className="user-profile-success-view-posts-list-container">
              {posts.map(eachPost => (
                <li
                  key={eachPost.id}
                  className="user-profile-success-view-posts-list-item"
                >
                  <img
                    src={eachPost.image}
                    alt="user post"
                    className="user-profile-success-view-posts-list-item-image"
=======
            <ul className="my-profile-success-view-posts-list-container">
              {posts.map(eachPost => (
                <li
                  key={eachPost.id}
                  className="my-profile-success-view-posts-list-item"
                >
                  <img
                    src={eachPost.image}
                    alt="my post"
                    className="my-profile-success-view-posts-list-item-image"
>>>>>>> 70fce280b41a005ce90c3b9cf857aca59736b9e2
                  />
                </li>
              ))}
            </ul>
          ) : (
<<<<<<< HEAD
            <div className="user-profile-success-view-no-posts-container">
              <div className="user-profile-success-view-no-posts-icon-container">
                <BiCamera />
              </div>
              <h1 className="user-profile-success-view-no-posts-heading">
=======
            <div className="my-profile-success-view-no-posts-container">
              <div className="my-profile-success-view-no-posts-icon-container">
                <BiCamera />
              </div>
              <h1 className="my-profile-success-view-no-posts-heading">
>>>>>>> 70fce280b41a005ce90c3b9cf857aca59736b9e2
                No Posts
              </h1>
            </div>
          )}
        </div>
      </div>
    )
  }

<<<<<<< HEAD
  renderAllUserProfileLoadingView = () => {
    const {isMobile} = this.state

    return (
      <div className="user-profile-loading-view">
        {isMobile ? (
          <div
            data-testid="loader"
            className="user-profile-mobile-loader-container"
          >
            <Loader type="TailSpin" color="#4094EF" height={32} width={32} />
          </div>
        ) : (
          <div
            data-testid="loader"
            className="user-profile-desktop-loader-container"
          >
            <Loader type="TailSpin" color="#4094EF" height={53} width={53} />
          </div>
        )}
      </div>
    )
  }

  onClickTryAgainBtn = () => {
    this.getUserProfileData()
  }

  renderUserProfileFailureView = () => (
    <div className="user-profile-failure-view">
      <img
        className="user-profile-failure-view-image"
        src="https://res.cloudinary.com/dmlhm8dwi/image/upload/v1683130740/Group_7522something-went-wrong-image_hjsfjr.png"
        alt="failure view"
      />
      <p className="user-profile-failure-view-error">
        Something went wrong. Please try again
      </p>
      <button
        className="user-profile-failure-view-btn"
        type="button"
        onClick={this.onClickTryAgainBtn}
      >
        Try again
      </button>
    </div>
  )

  renderAllUserProfileViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderUserProfileSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderAllUserProfileLoadingView()
      case apiStatusConstants.failure:
        return this.renderUserProfileFailureView()
=======
  const renderAllUserProfileViews = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderUserProfileSuccessView()
      case apiStatusConstants.inProgress:
        return renderAllUserProfileLoadingView()
      case apiStatusConstants.failure:
        return renderUserProfileFailureView()
>>>>>>> 70fce280b41a005ce90c3b9cf857aca59736b9e2
      default:
        return null
    }
  }

<<<<<<< HEAD
  render() {
    return (
      <>
        <Header />
        <div className="user-profile-container">
          {this.renderAllUserProfileViews()}
        </div>
      </>
    )
  }
}

=======
  return (
    <>
      <Header />
      <div className="user-profile-container">
        {renderAllUserProfileViews()}
      </div>
    </>
  )
}
>>>>>>> 70fce280b41a005ce90c3b9cf857aca59736b9e2
export default UserProfile
