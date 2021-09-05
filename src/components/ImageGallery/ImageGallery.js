import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/';
import s from './ImageGallery.module.css';
import ImageError from '../ImageError';
// import ImageGalleryItem from '../ImageGalleryItem';
// import imageAPI from '../../services/image-api';

export default class ImageGallery extends Component {
  state = {
    images: null,
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imageName;
    const nextName = this.props.imageName;

    if (prevName !== nextName) {
      this.setState({ status: 'pending' });

      fetch(
        `https://pixabay.com/api/?q=${nextName}&page=1&key=22062260-6c25df741ce11e2802dec385a&image_type=photo&orientation=horizontal&per_page=12`,
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }

          return Promise.reject(
            new Error(`Изображение ${nextName} отсутствует`),
          );
        })
        .then(images => this.setState({ images, status: 'resolved' }))
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  render() {
    const { images, error, status } = this.state;
    // const { imageName } = this.props;

    if (status === 'idle') {
      return <div>Введите название изображения</div>;
    }

    if (status === 'pending') {
      return <div>Загружаем...</div>;
    }

    if (status === 'rejected') {
      return <ImageError message={error.message} />;
    }

    if (status === 'resolved') {
      return (
        <div>
          <ul className={s.ImageGallery}>
            {images &&
              images.hits.map(({ id, webformatURL, tags, largeImageURL }) => (
                <ImageGalleryItem
                  key={id}
                  src={webformatURL}
                  url={largeImageURL}
                  alt={tags}
                />
              ))}
          </ul>
        </div>
      );
    }

    // return (
    //   <div>
    //     {error && <h1>{error.message}</h1>}
    //     {loading && <div>Загружаем...</div>}
    //     {!imageName && <div>Введите название изображения</div>}

    //     <ul className={s.ImageGallery}>
    //       {images &&
    //         images.hits.map(({ id, webformatURL, tags, largeImageURL }) => (
    //           <ImageGalleryItem
    //             key={id}
    //             src={webformatURL}
    //             url={largeImageURL}
    //             alt={tags}
    //           />
    //         ))}
    //     </ul>
    //   </div>
    // );
  }
}

// export default class ImageFetch extends Component {
//   state = {
//     images: null,
//     error: null,
//     status: 'idle',
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const prevName = prevProps.imageName;
//     const nextName = this.props.imageName;

//     if (prevName !== nextName) {
//       this.setState({ status: 'pending' });

//       imageAPI
//         .fetchImage(nextName)
//         .than(images => this.setState({ images, status: 'resolved' }))
//         .catch(error => this.setState({ error, status: 'rejected' }));
//     }
//   }

//   render() {
//     const { images, error, status } = this.state;

//     if (status === 'idle') {
//       return <div>Введите название изображения</div>;
//     }

//     if (status === 'pending') {
//       return <div>Загружаем...</div>;
//     }

//     if (status === 'rejected') {
//       return <ImageError message={error.message} />;
//     }

//     if (status === 'resolved') {
//       return <ImageGalleryItem images={images} />;
//     }
//   }
// }
