import './index.css'

import {Link} from 'react-router-dom'
import {BsHeart} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import {FcLike} from 'react-icons/fc'

const PostFeedItems = props => {
  const {eachFeed, onSelectUnLike, likedId, onSelectLike} = props

  const {post_id, user_name, post_details, likes_count, comments, created_at} =
    eachFeed

  const selectUnLike = () => {
    onSelectUnLike(post_id)
  }

  const selectLike = () => {
    onSelectLike(post_id)
  }

  return (
    <li>
      <div className="post-feed-item">
        <div className="post-feed-item-dp-section">
          <div className="post-feed-item-dp-profile">
            <img
              src={eachFeed.profile_pic}
              alt="post author profile"
              className="post-feed-item-dp-profile-pic"
            />
          </div>
          <Link to={`/users/${eachFeed.user_id}`} className="link">
            <h1 className="post-feed-item-dp-profile-name">{user_name}</h1>
          </Link>
        </div>
        <img
          className="post-feed-item-user-post-image"
          src={eachFeed?.post_details?.image_url}
          alt="post"
        />
        <div className="post-feed-item-comments-and-likes-section">
          <div className="post-feed-item-icons-container">
            {likedId.includes(post_id) ? (
              <button
                type="button"
                className="post-feed-item-icons-btn"
                onClick={selectLike}
                data-testid="unLikeIcon"
              >
                <FcLike className="post-feed-item-Fclike-icon" />
              </button>
            ) : (
              <button
                type="button"
                className="post-feed-item-icons-btn"
                onClick={selectUnLike}
                data-testid="likeIcon"
              >
                <BsHeart className="post-feed-item-BsHeart-icon" />
              </button>
            )}
            <FaRegComment className="post-feed-item-FaRegComment" />
            <BiShareAlt className="post-feed-item-BiShareAlt" />
          </div>
          <p className="post-feed-item-likes-count">
            {likes_count + (likedId.includes(post_id) ? 1 : 0) + ' '}
            likes
          </p>
          <p className="post-feed-item-caption">{post_details.caption}</p>
          <ul className="post-feed-item-comments-list-container">
            {comments.map(eachcomment => (
              <li
                className="post-feed-item-comment-item"
                key={eachcomment.user_id}
              >
                <p className="post-feed-item-comment-item-comment">
                  <span className="post-feed-item-comment-item-username">
                    {eachcomment.user_name + ' '}
                  </span>
                  {eachcomment.comment}
                </p>
              </li>
            ))}
          </ul>
          <p className="post-feed-item-created-at">{created_at}</p>
        </div>
      </div>
    </li>
  )
}
export default PostFeedItems
