import { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { fetchImages } from "services/photoService";
import { STATUSES } from "utils/constants";

export class App extends Component{
  state = {
    searchText: '',
    data: null,
    status: STATUSES.idle,
    error: null,
    page: 1,
    modalData: null,
    isModalOpen: false
  }

  handleModal = (idToFind) => {
    // console.log('imgId', idToFind)
    const imgData = this.state.data.find(img => img.id === idToFind)
    console.log(imgData.largeImageURL)
    this.setState({ isModalOpen: true, modalData: imgData.largeImageURL})
    console.log(this.state.modalData)
  }

  handleCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      this.setState({isModalOpen: false})
    }
  }

  handleModalOnEscClose = (e) => {
    console.log('ESC')
    if (e.code === 'Escape') {
      this.setState({isModalOpen: false})
    }
  }



  onSubmit = e => {
    e.preventDefault();
    const searchText = e.currentTarget.elements.searchText.value;

    this.setState({
      searchText: searchText,
      data: null,
      page: 1})
  }

  getImages = async (seatchText, page) => {
    try {
      this.setState({ status: STATUSES.pending });
      const data = await fetchImages(seatchText, page);
      this.setState({status: STATUSES.success, data:data.hits})
    }
    catch (error){
      this.setState({
        error: error.message,
        status:STATUSES.error
      })
    }
  }


  componentDidUpdate = (prevProps, prevState) => {
      if (this.state.page !== prevState.page || this.state.searchText !== prevState.searchText) {
        this.getImages(this.state.searchText, this.state.page)
    }
  }
  
  onInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,

    })
  }

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.onSubmit}/>
        <ImageGallery data={this.state.data} handleCloseModal={ this.handleCloseModal} handleModal={this.handleModal} modalData={this.state.modalData} isModalOpen={this.state.isModalOpen}></ImageGallery>
        <Button></Button>
      </div>
    );
  }
};