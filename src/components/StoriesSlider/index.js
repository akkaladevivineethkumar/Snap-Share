import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {useState, useEffect} from 'react'
import instance from '../Instance'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const StoriesSlider = () => {
  const [stories, setStories] = useState([])
  const [apiStatus, setapiStatus] = useState(apiStatusConstants.initial)

  const fetchStories = async () => {
    try {
      setapiStatus(apiStatusConstants.inProgress)
      const token = Cookies.get('jwt_token')
      const res = await instance.get('https://apis.ccbp.in/insta-share/stories')
      setStories(res.data.users_stories)
      setapiStatus(apiStatusConstants.success)
    } catch (e) {
      setapiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    fetchStories()
  }, [])

  const renderStoriesLoadingView = () => (
    <div className="stories-loader-container" data-testid="loader">
      <Loader
        type="TailSpin"
        color="#4094EF"
        height={48}
        width={48}
        className="desktop-stories-loader"
      />
    </div>
  )

  const renderStoriesSuccessView = () => {
    const desktopSettings = {
      dots: false,
      slidesToScroll: 1,
      slidesToShow: 7,
      centerPadding: '50px',
    }
    return (
      <ul className="desktop-stories-slider">
        <Slider {...desktopSettings}>
          {stories.map(story => (
            <li key={story.user_id}>
              <div className="story-item">
                <img
                  src={story.story_url}
                  alt="user story"
                  className="story-item-image"
                />
                <h1 className="story-item-name">{story.user_name}</h1>
              </div>
            </li>
          ))}
        </Slider>
      </ul>
    )
  }

  const onClickTryAgainButton = () => {
    fetchStories()
  }

  const renderStoriesFailureView = () => (
    <>
      <img
        className="stories-failure-view-image"
        src="https://res.cloudinary.com/dmlhm8dwi/image/upload/v1682953244/alert-trianglefailure-warning-icon-image_qdzegs.png"
        alt="failure view"
      />
      <p className="stories-failure-view-error">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="stories-failure-view-try-again-btn"
        onClick={onClickTryAgainButton}
      >
        Try again
      </button>
    </>
  )

  const renderAllSliderViews = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderStoriesSuccessView()
      case apiStatusConstants.inProgress:
        return renderStoriesLoadingView()
      case apiStatusConstants.failure:
        return renderStoriesFailureView()
      default:
        return null
    }
  }
  return <>{renderAllSliderViews()}</>
}

export default StoriesSlider
