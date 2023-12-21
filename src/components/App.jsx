import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Component } from "react";
import { getImages } from "services/photoService";

export class App extends Component{
  state = {
    searchText: '',
    data: null,
    status: "idle",
    error: null,
  }

  onSubmit = e => {
    e.preventDefault();
    getImages(this.state.searchText).then(data => {
      this.setState({ data: data.hits })
    });
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