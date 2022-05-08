import {Component} from 'react'

import Thumbnails from '../Thumbnails/Thumbnails'
import TabItem from '../TabItem/TabItem'

import './MatchGame.css'

class MatchGame extends Component {
  state = {
    category: 'FRUIT',
    id: 'b11ec8ce-35c9-4d67-a7f7-07516d0d8186',
    seconds: 60,
    score: 0,
    gameOver: false,
  }

  componentDidMount() {
    this.intervalFunction()
  }

  tabTriggered = tabId => {
    this.setState({category: tabId})
  }

  imageclicked = idd => {
    const {id} = this.state
    if (idd === id) {
      this.setState(prevState => ({score: prevState.score + 1}))
      const {imagesList} = this.props
      const index = Math.floor(Math.random() * imagesList.length)
      this.setState({id: imagesList[index].id})
    } else {
      this.setState({gameOver: true})
      const {intervalId} = this.state
      clearInterval(intervalId)
    }
  }

  intervalFunction = () => {
    this.state.intervalId = setInterval(() => {
      const {seconds} = this.state
      if (seconds === 0) {
        const {intervalId} = this.state
        this.setState({gameOver: true})
        clearInterval(intervalId)
      } else {
        this.setState(prevState => ({seconds: prevState.seconds - 1}))
      }
    }, 1000)
  }

  resetButton = () => {
    this.setState({gameOver: false, seconds: 60, score: 0})
    this.intervalFunction()
  }

  render() {
    const {category, id, seconds, score, gameOver} = this.state
    const {tabsList, imagesList} = this.props
    const bigImage = imagesList.filter(each => each.id === id)
    const {imageUrl} = bigImage[0]
    const filteredimagesList = imagesList.filter(
      each => each.category === category,
    )

    return (
      <>
        <nav className="navbar">
          <ul className="unorder-list-extra">
            <li>
              <img
                className="logo"
                alt="website logo"
                src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
              />
            </li>

            <li>
              <div className="score-timer-con">
                <div className="score-con">
                  <p className="score-text">score:</p>
                  <p className="score-num">{score}</p>
                </div>
                <div className="timer-con">
                  <img
                    alt="timer"
                    className="clock"
                    src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                  />
                  <p className="seconds-paraa">{seconds} sec</p>
                </div>
              </div>
            </li>
          </ul>
        </nav>
        <div className="main-container">
          {gameOver ? (
            <div className="game-over-con">
              <img
                alt="trophy"
                className="trophy"
                src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
              />
              <p className="score-heading">YOUR SCORE</p>
              <h1 className="score-paraa">{score}</h1>
              <button
                onClick={this.resetButton}
                type="button"
                className="play-again-button"
              >
                <img
                  alt="reset"
                  src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                  className="replay"
                />
                <p>PLAY AGAIN</p>
              </button>
            </div>
          ) : (
            <div className="card-container">
              <img alt="match" src={imageUrl} className="big-image" />
              <ul className="tabs-un-order-list">
                {tabsList.map(each => (
                  <TabItem
                    tabTriggered={this.tabTriggered}
                    detail={each}
                    key={each.tabId}
                    category={category}
                  />
                ))}
              </ul>
              <ul className="un-order-thumbs-list">
                {filteredimagesList.map(each => (
                  <Thumbnails
                    imageclicked={this.imageclicked}
                    detail={each}
                    key={each.id}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
      </>
    )
  }
}

export default MatchGame
