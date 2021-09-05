import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Container from './components/Container';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';

export default class App extends Component {
  state = {
    imageName: '',
  };

  handleFormSubmit = imageName => {
    this.setState({ imageName });
  };

  // componentDidMount() {
  //   this.setState({ loading: true });

  //   fetch(
  //     'https://pixabay.com/api/?q=кот&page=1&key=22062260-6c25df741ce11e2802dec385a&image_type=photo&orientation=horizontal&per_page=12',
  //   )
  //     .then(response => response.json())
  //     .then(images => this.setState({ images }))
  //     .finally(() => this.setState({ loading: false }));
  // }

  render() {
    return (
      <Container>
        {/* {this.state.loading && <h1>Загружаем...</h1>}
        {this.state.images && (
          <div>
            {this.state.images.hits.map(hit => (
              <ul className="ImageGallery">
                <li className="ImageGalleryItem">{hit.id}</li>
              </ul>
            ))}
          </div>
        )} */}

        <Searchbar onSearch={this.handleFormSubmit} />
        <ImageGallery imageName={this.state.imageName} />
        <ToastContainer autoClose={3000} theme="colored" />
      </Container>
    );
  }
}

// export default class App extends Component {
//   state = {
//     imageName: '',
//   };

//   handleFormSubmit = imageName => {
//     this.setState({ imageName });
//   };

//   render() {
//     return (
//       <Container>
//         <Searchbar onSearch={this.handleFormSubmit} />
//         <ImageFetch imageName={this.state.imageName} />
//         <ToastContainer autoClose={3000} theme="colored" />
//       </Container>
//     );
//   }
// }
