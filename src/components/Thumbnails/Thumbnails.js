import './Thumbnails.css'

const Thumbnails = props => {
  const {detail, imageclicked} = props
  const {thumbnailUrl, id} = detail
  const imageclick = () => {
    imageclicked(id)
  }
  return (
    <li className="thumb-list-item">
      <button className="image-button" type="button">
        <img
          onClick={imageclick}
          className="thumb-image"
          alt="thumbnail"
          src={thumbnailUrl}
        />
      </button>
    </li>
  )
}

export default Thumbnails
