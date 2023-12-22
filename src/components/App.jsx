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
    isModalOpen: false,
    totalHits: null
  }

  onSubmit = e => {
    e.preventDefault();
    const searchText = e.currentTarget.elements.searchText.value;

    this.setState({
      searchText: searchText,
      data: null,
      page: 1,
    })
  }

  getImages = async (searchText, page) => {
    try {
      this.setState({ status: STATUSES.pending });
      const data = await fetchImages(searchText, page);
      this.setState({ status: STATUSES.success, data: data.hits })
      console.log(data)
      return data;
    }
    catch (error){
      this.setState({
        error: error.message,
        status:STATUSES.error
      })
    }
  }

  onLoadMore = () => {
    const nextPage = this.state.page + 1;
    this.setState({ page: nextPage })
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.page !== prevState.page ||
      this.state.searchText !== prevState.searchText) {
        fetchImages(this.state.searchText, this.state.page).then(fetchData => {
          this.setState(prevState => ({
            data: [...prevState.data, ...fetchData.hits]
          }))
        })
    }
  }

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.onSubmit}/>
        <ImageGallery data={this.state.data}></ImageGallery>
        <Button onLoadMore={this.onLoadMore}></Button>
      </div>
    );
  }
};