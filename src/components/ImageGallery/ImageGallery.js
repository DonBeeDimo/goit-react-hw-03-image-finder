import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/';
import ImageError from '../ImageError';
import Loader from '../Loader';
import pixabayAPI from '../../services/Pixabay-api';
import Modal from '../Modal';
import Button from '../Button';

export default class ImageGallery extends Component {
  static propTypes = {
    imageName: PropTypes.string,
  };

  state = {
    images: null,
    page: 1,
    error: null,
    showModal: false,
    modalImgProps: { url: '', alt: '' },
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imageName;
    const nextName = this.props.imageName;

    if (prevName !== nextName) {
      this.reset();
      this.setState({ status: 'pending' });
      this.fetchQuery(nextName);
    }
  }

  fetchQuery = nextName => {
    const { page } = this.state;
    pixabayAPI
      .fetchImage(nextName, page)
      .then(({ hits }) => {
        if (hits.length === 0) {
          return Promise.reject(
            new Error(`Изображение с именем - ${nextName} - отсутствует`),
          );
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          page: prevState.page + 1,
          status: 'resolved',
        }));
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  scrollDown = () => {
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: 'smooth',
      });
    }, 1000);
  };

  handleLoadBtnClick = () => {
    const nextQuery = this.props.imageName;
    this.fetchQuery(nextQuery);
    this.scrollDown();
  };

  reset = () => {
    this.setState({ page: 1, images: [] });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleImgClick = props => {
    this.setState({ modalImgProps: props });
    this.toggleModal();
  };

  render() {
    const { images, error, showModal, status } = this.state;
    const { url, alt } = this.state.modalImgProps;

    if (status === 'idle') {
      return <div>Введите название изображения</div>;
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return <ImageError message={error.message} />;
    }

    if (status === 'resolved') {
      return (
        <div>
          {showModal && (
            <Modal onClose={this.toggleModal}>
              <img src={url} alt={alt} className={s.modalImage} />
            </Modal>
          )}
          <ul className={s.ImageGallery}>
            {images.map(({ id, webformatURL, tags, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                src={webformatURL}
                url={largeImageURL}
                alt={tags}
                openModal={this.handleImgClick}
              />
            ))}
          </ul>
          <Button handleLoadMore={this.handleLoadBtnClick} />
        </div>
      );
    }
  }
}
