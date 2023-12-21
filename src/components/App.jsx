import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Component } from "react";
import { getImages } from "services/photoService";
import { STATUSES } from "utils/constants";

export class App extends Component{
  state = {
    searchText: '',
    data: null,
    status: STATUSES.idle,
    error: null,
    page: 1
  }

  onSubmit = e => {
    e.preventDefault();
    const searchText = e.currentTarget.elements.searchText.value;
    console.log(searchText)

    this.setState({searchText: searchText})
  }

  componentDidUpdate = (prevProps, prevState) => {
    if(this.state.page !== prevState.page || this.state.searchText!== prevState.searchText ){
      getImages(this.state.searchText, this.state.page).then(data => {
        this.setState({ data: data.hits })
      });
    }
  }
  
  onInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.onSubmit} onInput={this.onInput}/>
        <ImageGallery data={this.state.data}></ImageGallery>
        <Button></Button>
      </div>
    );
  }
};