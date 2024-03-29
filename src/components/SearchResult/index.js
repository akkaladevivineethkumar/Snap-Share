import {useState} from 'react'
import PostFeedItems from '../PostFeedItems'
import Loader from 'react-loader-spinner'
import instance from '../Instance'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const SearchResult = props => {
  const {searchData, apiStatus, searchRes} = props

  const [likedIds, setlikedIds] = useState([])

  const onSelectLike = async id => {
    try {
      const res = await instance.post(
        `https://apis.ccbp.in/insta-share/posts/${id}/like`,
        JSON.stringify({like_status: true}),
      )
      const updatedLikedIds = likedIds.filter(eachId => {
        if (eachId !== id) {
          return true
        }
        return false
      })
      setlikedIds(updatedLikedIds)
      console.log(res.data, 'abc')
    } catch (e) {
      console.log(e)
    }
  }

  const onSelectUnLike = async id => {
    try {
      const res = await instance.post(
        `https://apis.ccbp.in/insta-share/posts/${id}/like`,
        JSON.stringify({like_status: false}),
      )
      setlikedIds([...likedIds, id])
    } catch (e) {
      console.log(e)
    }
  }

  const renderSearchResultsSuccessView = () => {
    const showSearchResults = searchRes.length > 0
    return (
      <div className="search-results-success-view">
        {showSearchResults ? (
          <>
            <h1 className="search-results-success-view-heading">
              Search Results
            </h1>
            <ul className="search-results-list-container">
              {searchRes.map(eachFeed => (
                <PostFeedItems
                  key={eachFeed.post_id}
                  eachFeed={eachFeed}
                  onSelectUnLike={onSelectUnLike}
                  onSelectLike={onSelectLike}
                  likedId={likedIds}
                />
              ))}
            </ul>
          </>
        ) : (
          <div className="search-results-success-view-search-not-found">
            <img
              className="search-results-success-view-search-not-found-image"
              src="https://res.cloudinary.com/dmlhm8dwi/image/upload/v1684481635/Groupsearch-notfound-img_x7hs6m.png"
              alt="search not found"
            />
            <h1 className="search-results-success-view-search-not-found-heading">
              Search Not Found
            </h1>
            <p className="search-results-success-view-search-not-found-description">
              Try different keyword or search again
            </p>
          </div>
        )}
      </div>
    )
  }

  const renderSearchResultLoaderView = () => (
    <>
      <div
        className="desktop-search-result-loader-container"
        data-testid="loader"
      >
        <Loader type="TailSpin" color="#4094EF" height={80} width={80} />
      </div>
    </>
  )

  const onClickTryAgainBtn = () => {
    searchData()
  }

  const renderSearchResultFailureView = () => (
    <div className="search-results-failure-view">
      <img
        className="search-results-failure-view-image"
        src="https://res.cloudinary.com/dmlhm8dwi/image/upload/v1683130740/Group_7522something-went-wrong-image_hjsfjr.png"
        alt="failure view"
      />
      <p className="search-results-failure-view-error">
        Something went wrong. Please try again
      </p>
      <button
        className="search-results-failure-view-btn"
        type="button"
        onClick={onClickTryAgainBtn}
      >
        Try again
      </button>
    </div>
  )

  const renderSearchResultInitialView = () => (
    <div className="search-results-initial-view-container">
      <img
        className="search-results-initial-view-search-icon-img"
        src="https://res.cloudinary.com/dmlhm8dwi/image/upload/v1684479910/1623738902553_qpxiqe.png"
        alt="search-icon"
      />
      <p className="search-results-initial-view-description">
        Search Results will be appear here
      </p>
    </div>
  )

  const renderAllSearchResultsViews = () => {
    switch (apiStatus) {
      case apiStatusConstants.initial:
        return renderSearchResultInitialView()
      case apiStatusConstants.success:
        return renderSearchResultsSuccessView()
      case apiStatusConstants.inProgress:
        return renderSearchResultLoaderView()
      case apiStatusConstants.failure:
        return renderSearchResultFailureView()
      default:
        return null
    }
  }

  return (
    <>
      <div className="user-profile-container">
        {renderAllSearchResultsViews()}
      </div>
    </>
  )
}
export default SearchResult
