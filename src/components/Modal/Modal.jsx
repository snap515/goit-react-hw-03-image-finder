import { Component } from 'react'
import css from './Modal.module.css'

export class Modal extends Component {


  
  render() {
    const { modalData } = this.props;
    const { handleCloseModal } = this.props;
    const { handleModalOnEscClose } = this.props;
  return (
    <div className={css.Overlay} onClick={handleCloseModal}>
      <div className={css.Modal}>
        <img src={modalData} alt="" />
      </div>
    </div>
  )
  }
  
}