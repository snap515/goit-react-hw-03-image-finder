export const ImageGalleryItem = ({id, webImg, largeImg}) => {
  return (
    <li key={id} className="gallery-item">
      <img src={webImg} alt="" />
    </li>
  )
}