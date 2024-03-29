<<<<<<< HEAD
import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'

=======
import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import instance from '../Instance'
import './index.css'
>>>>>>> 70fce280b41a005ce90c3b9cf857aca59736b9e2
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

<<<<<<< HEAD
class MyProfile extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    myProfileData: {},
    isMobile: false,
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowSizeChange)
    this.handleWindowSizeChange()

    this.getMyProfileData()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange)
  }

  getMyProfileData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const accessToken = Cookies.get('jwt_token')

    const myProfileUrl = 'https://apis.ccbp.in/insta-share/my-profile'
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(myProfileUrl, options)

    if (response.ok === true) {
      const fetchedData = await response.json()

      //   console.log(fetchedData),

      const updatedData = {
        id: fetchedData.profile.id,
        userId: fetchedData.profile.user_id,
        username: fetchedData.profile.user_name,
        profilePic: fetchedData.profile.profile_pic,
        followersCount: fetchedData.profile.followers_count,
        followingCount: fetchedData.profile.following_count,
        userBio: fetchedData.profile.user_bio,
        posts: fetchedData.profile.posts,
        postsCount: fetchedData.profile.posts_count,
        stories: fetchedData.profile.stories,
      }

      this.setState({
        myProfileData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  handleWindowSizeChange = () => {
    const isMobile = window.innerWidth <= 768
    this.setState({isMobile})
  }

  renderMyProfileSuccessView = () => {
    const {myProfileData, isMobile} = this.state
    // console.log(isMobile)
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
    } = myProfileData

=======
const MyProfile = () => {
  const [myProfile, setmyProfile] = useState([])
  const [apiStatus, setapiStatus] = useState(apiStatusConstants.initial)

  const myProfileData = async () => {
    try {
      setapiStatus(apiStatusConstants.inProgress)
      const res = await instance.get(
        'https://apis.ccbp.in/insta-share/my-profile',
      )
      setmyProfile(res.data.profile)
      setapiStatus(apiStatusConstants.success)
      console.log(res.data.profile)
    } catch (e) {
      setapiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    myProfileData()
  }, [])

  const renderAllMyProfileLoadingView = () => (
    <>
      <div className="my-profile-loading-view">
        <div
          className="my-profile-desktop-loader-container"
          data-testid="loader"
        >
          <Loader type="TailSpin" color="#4094EF" height={53} width={53} />
        </div>
      </div>
    </>
  )

  const onClickTryAgainBtn = () => {
    myProfileData()
  }

  const renderMyProfileFailureView = () => (
    <div className="my-profile-failure-view">
      <img
        className="my-profile-failure-view-image"
        src="https://res.cloudinary.com/dmlhm8dwi/image/upload/v1683130740/Group_7522something-went-wrong-image_hjsfjr.png"
        alt="failure view"
      />
      <p className="my-profile-failure-view-error">
        Something went wrong. Please try again
      </p>
      <button
        className="my-profile-failure-view-btn"
        type="button"
        onClick={onClickTryAgainBtn}
      >
        Try again
      </button>
    </div>
  )

  const renderMyProfileSuccessView = () => {
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
    } = myProfile
>>>>>>> 70fce280b41a005ce90c3b9cf857aca59736b9e2
    const shouldShowPosts = posts.length > 0

    return (
      <div className="my-profile-success-view">
        <div className="my-profile-success-view-profile-section">
          {/* Profile info Mobile & Desktop View */}
<<<<<<< HEAD

          {isMobile ? (
            <div className="my-profile-success-view-profile-mobile-info-container">
              <h1 className="my-profile-success-view-profile-mobile-info-username">
                {username}
              </h1>
              <div className="my-profile-success-view-profile-mobile-info-stats-container">
                <img
                  src={profilePic}
                  alt="my profile"
                  className="my-profile-success-view-profile-mobile-info-profile-pic"
                />

                <div className="my-profile-success-view-profile-mobile-info-stats">
                  <p className="my-profile-success-view-profile-mobile-info-stats-count">
                    {postsCount}
                  </p>
                  <p className="my-profile-success-view-profile-mobile-info-stats-type">
                    posts
                  </p>
                </div>
                <div className="my-profile-success-view-profile-mobile-info-stats">
                  <p className="my-profile-success-view-profile-mobile-info-stats-count">
                    {followersCount}
                  </p>
                  <p className="my-profile-success-view-profile-mobile-info-stats-type">
                    followers
                  </p>
                </div>
                <div className="my-profile-success-view-profile-mobile-info-stats">
                  <p className="my-profile-success-view-profile-mobile-info-stats-count">
                    {followingCount}
                  </p>
                  <p className="my-profile-success-view-profile-mobile-info-stats-type">
                    following
                  </p>
                </div>
              </div>
              <div className="my-profile-success-view-profile-mobile-info-bio-container">
                <p className="my-profile-success-view-profile-mobile-info-bio-userId">
                  {userId}
                </p>
                <p className="my-profile-success-view-profile-mobile-info-bio-description">
                  {userBio}
                </p>
              </div>
            </div>
          ) : (
            <div className="my-profile-success-view-profile-desktop-info-container">
              <img
                src={profilePic}
                alt="my profile"
                className="my-profile-success-view-profile-desktop-info-profile-pic"
              />
              <div className="my-profile-success-view-profile-desktop-info-stats-container">
                <h1 className="my-profile-success-view-profile-desktop-info-stats-username">
                  {username}
                </h1>
                <div className="my-profile-success-view-profile-desktop-info-stats-details-container">
                  <p className="my-profile-success-view-profile-desktop-info-stats-details-type">
                    <span className="my-profile-success-view-profile-desktop-info-stats-details-count">
                      {postsCount}
                    </span>{' '}
                    posts
                  </p>

                  <p className="my-profile-success-view-profile-desktop-info-stats-details-type">
                    <span className="my-profile-success-view-profile-desktop-info-stats-details-count">
                      {followersCount}
                    </span>{' '}
                    followers
                  </p>

                  <p className="my-profile-success-view-profile-desktop-info-stats-details-type">
                    <span className="my-profile-success-view-profile-desktop-info-stats-details-count">
                      {followingCount}
                    </span>{' '}
                    following
                  </p>
                </div>
                <div className="my-profile-success-view-profile-desktop-info-bio-container">
                  <p className="my-profile-success-view-profile-desktop-info-bio-userId">
                    {userId}
                  </p>
                  <p className="my-profile-success-view-profile-desktop-info-bio-description">
                    {userBio}
                  </p>
                </div>
              </div>
            </div>
          )}

=======
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
>>>>>>> 70fce280b41a005ce90c3b9cf857aca59736b9e2
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
                />
              </li>
            ))}
          </ul>
        </div>
        {/* My Profile Posts Section */}
        <div className="my-profile-success-view-posts-section">
          <div className="my-profile-success-view-posts-icon-container">
            <BsGrid3X3 className="my-profile-success-view-posts-icon" />
            <h1 className="my-profile-success-view-posts-icon-heading">
              Posts
            </h1>
          </div>
          {shouldShowPosts ? (
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
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="my-profile-success-view-no-posts-container">
              <div className="my-profile-success-view-no-posts-icon-container">
                <BiCamera />
              </div>
              <h1 className="my-profile-success-view-no-posts-heading">
                No Posts
              </h1>
            </div>
          )}
        </div>
      </div>
    )
  }

<<<<<<< HEAD
  renderAllMyProfileLoadingView = () => {
    const {isMobile} = this.state

    return (
      <>
        <div className="my-profile-loading-view">
          {isMobile ? (
            <div
              data-testid="loader"
              className="my-profile-mobile-loader-container"
            >
              <Loader type="TailSpin" color="#4094EF" height={32} width={32} />
            </div>
          ) : (
            <div
              data-testid="loader"
              className="my-profile-desktop-loader-container"
            >
              <Loader type="TailSpin" color="#4094EF" height={53} width={53} />
            </div>
          )}
        </div>
      </>
    )
  }

  onClickTryAgainBtn = () => {
    this.getMyProfileData()
  }

  renderMyProfileFailureView = () => (
    <div className="my-profile-failure-view">
      <img
        className="my-profile-failure-view-image"
        src="https://res.cloudinary.com/dmlhm8dwi/image/upload/v1683130740/Group_7522something-went-wrong-image_hjsfjr.png"
        alt="failure view"
      />
      <p className="my-profile-failure-view-error">
        Something went wrong. Please try again
      </p>
      <button
        className="my-profile-failure-view-btn"
        type="button"
        onClick={this.onClickTryAgainBtn}
      >
        Try again
      </button>
    </div>
  )

  renderAllMyProfileViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderMyProfileSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderAllMyProfileLoadingView()
      case apiStatusConstants.failure:
        return this.renderMyProfileFailureView()
=======
  const renderAllMyProfileViews = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderMyProfileSuccessView()
      case apiStatusConstants.inProgress:
        return renderAllMyProfileLoadingView()
      case apiStatusConstants.failure:
        return renderMyProfileFailureView()
>>>>>>> 70fce280b41a005ce90c3b9cf857aca59736b9e2
      default:
        return null
    }
  }

<<<<<<< HEAD
  render() {
    const pageActive = 'PROFILE'
    return (
      <>
        <Header pageActive={pageActive} />
        <div className="my-profile-container">
          {this.renderAllMyProfileViews()}
        </div>
      </>
    )
  }
}

=======
  const pageActive = 'PROFILE'

  return (
    <>
      <Header pageActive={pageActive} />
      <div className="my-profile-container">{renderAllMyProfileViews()}</div>
    </>
  )
}
>>>>>>> 70fce280b41a005ce90c3b9cf857aca59736b9e2
export default MyProfile
