import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem"
import css from "./ImageGallery.module.css"
import { Modal } from "components/Modal/Modal"
export const ImageGallery = ({ data, handleModal,modalData, isModalOpen, handleCloseModal }) => {
  return (
    <ul className={css.ImageGallery}>
        {data?.map(dataElem => {
        return (
          <ImageGalleryItem key={dataElem.id} id={dataElem.id} webImg={dataElem.webformatURL} largeImg={dataElem.largeImageURL} handleModal={handleModal}></ImageGalleryItem>
        )
        })}
      {isModalOpen && (<Modal modalData={modalData} isModalOpen={isModalOpen} handleCloseModal={handleCloseModal}></Modal>)}
      
      
    </ul>
  )
}