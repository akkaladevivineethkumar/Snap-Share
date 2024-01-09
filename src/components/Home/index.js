import {useState, useEffect} from 'react'
import Header from '../Header'
import StoriesSlider from '../StoriesSlider'
import PostFeed from '../PostFeed'
import SearchResult from '../SearchResult'
import instance from '../Instance'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const Home = () => {
  const [searchMode, setsearchMode] = useState(false)
  const [searchRes, setsearchRes] = useState([])
  const [searchInput, setsearchInput] = useState('')
  const [apiStatus, setapiStatus] = useState(apiStatusConstants.initial)

  const searchData = async () => {
    try {
      setapiStatus(apiStatusConstants.inProgress)
      const res = await instance.get(
        `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`,
      )
      setsearchRes(res.data.posts)
      setapiStatus(apiStatusConstants.success)
    } catch (e) {
      setapiStatus(apiStatusConstants.failure)
    }
  }

  const pageActive = 'HOME'

  const onChangeSearchInput = event => {
    setsearchInput(event.target.value)
  }
  const onChangeSearchModeDesktop = () => {
    setsearchMode(true)
    setsearchInput('')
  }
  const onChangeSearchModeOff = () => {
    setsearchMode(false)
  }

  return (
    <>
      <Header
        pageActive={pageActive}
        onChangeSearchInput={onChangeSearchInput}
        searchMode={searchMode}
        searchInput={searchInput}
        getSearchResults={searchData}
        onChangeSearchModeDesktop={onChangeSearchModeDesktop}
        onChangeSearchModeOff={onChangeSearchModeOff}
      />
      {searchMode ? (
        <div className="search-results-container">
          <SearchResult
            searchRes={searchRes}
            searchData={searchData}
            apiStatus={apiStatus}
          />
        </div>
      ) : (
        <>
          <div className="home-container">
            <StoriesSlider />
            <PostFeed />
          </div>
        </>
      )}
    </>
  )
}
export default Home
