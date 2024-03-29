<<<<<<< HEAD
import Cookies from 'js-cookie'

import Slider from 'react-slick'
import Loader from 'react-loader-spinner'

import {Component} from 'react'

import StoryItem from '../StoryItem'

=======
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {useState, useEffect} from 'react'
import instance from '../Instance'
>>>>>>> 70fce280b41a005ce90c3b9cf857aca59736b9e2
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

<<<<<<< HEAD
// testid

class StoriesSlider extends Component {
  state = {
    usersStories: [],
    apiStatus: apiStatusConstants.initial,
    isMobile: false,
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowSizeChange)
    this.handleWindowSizeChange()

    this.getStoriesData()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange)
  }

  handleWindowSizeChange = () => {
    const isMobile = window.innerWidth <= 768
    this.setState({isMobile})
  }

  getStoriesData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const accessToken = Cookies.get('jwt_token')

    const storiesUrl = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(storiesUrl, options)

    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.users_stories.map(eachStory => ({
        userId: eachStory.user_id,
        userName: eachStory.user_name,
        storyUrl: eachStory.story_url,
      }))
      this.setState({
        usersStories: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderStoriesLoadingView = () => {
    const {isMobile} = this.state

    return isMobile ? (
      <div data-testid="loader" className="stories-loader-container">
        <Loader
          type="TailSpin"
          color="#4094EF"
          height={32}
          width={32}
          className="mobile-stories-loader"
        />
      </div>
    ) : (
      <div data-testid="loader" className="stories-loader-container">
        <Loader
          type="TailSpin"
          color="#4094EF"
          height={48}
          width={48}
          className="desktop-stories-loader"
        />
      </div>
    )
  }

  renderStoriesSliderView = () => {
    const {usersStories, isMobile} = this.state

    const mobileSettings = {
      dots: false,
      slidesToScroll: 1,
      slidesToShow: 4,
      centerPadding: '50px',
    }
=======
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
>>>>>>> 70fce280b41a005ce90c3b9cf857aca59736b9e2
    const desktopSettings = {
      dots: false,
      slidesToScroll: 1,
      slidesToShow: 7,
      centerPadding: '50px',
    }
<<<<<<< HEAD

    return isMobile ? (
      <ul className="mobile-stories-slider">
        <Slider {...mobileSettings}>
          {usersStories.map(eachStory => (
            <StoryItem key={eachStory.userId} storyDetails={eachStory} />
          ))}
        </Slider>
      </ul>
    ) : (
      <ul className="desktop-stories-slider">
        <Slider {...desktopSettings}>
          {usersStories.map(eachStory => (
            <StoryItem key={eachStory.userId} storyDetails={eachStory} />
=======
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
>>>>>>> 70fce280b41a005ce90c3b9cf857aca59736b9e2
          ))}
        </Slider>
      </ul>
    )
  }

<<<<<<< HEAD
  onClickTryAgainButton = () => {
    this.getStoriesData()
  }

  renderStoriesFailureView = () => (
=======
  const onClickTryAgainButton = () => {
    fetchStories()
  }

  const renderStoriesFailureView = () => (
>>>>>>> 70fce280b41a005ce90c3b9cf857aca59736b9e2
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
<<<<<<< HEAD
        onClick={this.onClickTryAgainButton}
=======
        onClick={onClickTryAgainButton}
>>>>>>> 70fce280b41a005ce90c3b9cf857aca59736b9e2
      >
        Try again
      </button>
    </>
  )

<<<<<<< HEAD
  renderAllSliderViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderStoriesSliderView()
      case apiStatusConstants.inProgress:
        return this.renderStoriesLoadingView()
      case apiStatusConstants.failure:
        return this.renderStoriesFailureView()
=======
  const renderAllSliderViews = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderStoriesSuccessView()
      case apiStatusConstants.inProgress:
        return renderStoriesLoadingView()
      case apiStatusConstants.failure:
        return renderStoriesFailureView()
>>>>>>> 70fce280b41a005ce90c3b9cf857aca59736b9e2
      default:
        return null
    }
  }
<<<<<<< HEAD

  render() {
    return (
      <div className="stories-slider-container">
        {this.renderAllSliderViews()}
      </div>
    )
  }
=======
  return <>{renderAllSliderViews()}</>
>>>>>>> 70fce280b41a005ce90c3b9cf857aca59736b9e2
}

export default StoriesSlider
