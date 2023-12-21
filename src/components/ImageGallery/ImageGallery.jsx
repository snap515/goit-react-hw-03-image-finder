import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem"

export const ImageGallery = ({data}) => {
  return (
    <ul className="gallery">
      {data?.map(dataElem => {
        return (
          <ImageGalleryItem key={dataElem.id} webImg={dataElem.webformatURL} largeImg={dataElem.largeImageURL}></ImageGalleryItem>
        )
      })}
      
    </ul>
  )
}