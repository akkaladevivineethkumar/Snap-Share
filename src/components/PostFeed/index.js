import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import PostFeedItems from '../PostFeedItems'
import instance from '../Instance'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const PostFeed = () => {
  const [feedData, setfeedData] = useState([])
  const [likedId, setlikedId] = useState([])
  const [apistatus, setapistatus] = useState(apiStatusConstants.initial)

  const postData = async () => {
    try {
      setapistatus(apiStatusConstants.inProgress)
      const res = await instance.get('https://apis.ccbp.in/insta-share/posts')
      setfeedData(res.data.posts)
      setapistatus(apiStatusConstants.success)
    } catch (e) {
      setapistatus(apiStatusConstants.failure)
    }
  }
  useEffect(() => {
    postData()
  }, [])

  const onSelectLike = async id => {
    try {
      const res = await instance.post(
        `https://apis.ccbp.in/insta-share/posts/${id}/like`,
        JSON.stringify({like_status: true}),
      )
      const updatedLikedIds = likedId.filter(eachId => {
        if (eachId !== id) {
          return true
        }
        return false
      })
      setlikedId(updatedLikedIds)
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
      setlikedId([...likedId, id])
      console.log(res.data, 'abc')
    } catch (e) {
      console.log(e)
    }
  }

  const onClickPostFeedFailureTryAgain = () => {
    postData()
  }

  const renderPostFeedFailureView = () => (
    <div className="post-feed-failure-view">
      <img
        className="post-feed-failure-view-image"
        src="https://res.cloudinary.com/dmlhm8dwi/image/upload/v1682953244/alert-trianglefailure-warning-icon-image_qdzegs.png"
        alt="failure view"
      />
      <h1 className="post-feed-failure-view-error">
        Something went wrong. Please try again
      </h1>
      <button
        type="button"
        className="post-feed-failure-view-button"
        onClick={onClickPostFeedFailureTryAgain}
      >
        Try again
      </button>
    </div>
  )

  const renderPostFeedSuccessView = () => (
    <>
      <div className="post-feed-success-view">
        <ul className="post-feed-list-container">
          {feedData.map(each => (
            <PostFeedItems
              key={each.post_id}
              eachFeed={each}
              onSelectUnLike={onSelectUnLike}
              onSelectLike={onSelectLike}
              likedId={likedId}
            />
          ))}
        </ul>
      </div>
    </>
  )

  const renderPostFeedLoadingView = () => (
    <div className="desktop-post-feed-loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={80} width={80} />
    </div>
  )

  const renderAllPostFeedViews = () => {
    switch (apistatus) {
      case apiStatusConstants.success:
        return renderPostFeedSuccessView()
      case apiStatusConstants.inProgress:
        return renderPostFeedLoadingView()
      case apiStatusConstants.failure:
        return renderPostFeedFailureView()
      default:
        return null
    }
  }

  return <>{renderAllPostFeedViews()}</>
}
export default PostFeed
