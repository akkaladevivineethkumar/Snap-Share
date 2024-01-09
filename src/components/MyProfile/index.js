import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import instance from '../Instance'
import './index.css'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

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

  const renderAllMyProfileViews = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderMyProfileSuccessView()
      case apiStatusConstants.inProgress:
        return renderAllMyProfileLoadingView()
      case apiStatusConstants.failure:
        return renderMyProfileFailureView()
      default:
        return null
    }
  }

  const pageActive = 'PROFILE'

  return (
    <>
      <Header pageActive={pageActive} />
      <div className="my-profile-container">{renderAllMyProfileViews()}</div>
    </>
  )
}
export default MyProfile
