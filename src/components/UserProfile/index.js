import {useEffect, useState} from 'react'
import Loader from 'react-loader-spinner'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import Header from '../Header'
import instance from '../Instance'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

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

  const renderAllUserProfileViews = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderUserProfileSuccessView()
      case apiStatusConstants.inProgress:
        return renderAllUserProfileLoadingView()
      case apiStatusConstants.failure:
        return renderUserProfileFailureView()
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      <div className="user-profile-container">
        {renderAllUserProfileViews()}
      </div>
    </>
  )
}
export default UserProfile
