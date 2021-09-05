import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ src, alt }) {
  return (
    <li className={s.ImageGalleryItem}>
      <img src={src} alt={alt} className={s.ImageGalleryItemImage} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  // url: PropTypes.string.isRequired,
  // openModal: PropTypes.func.isRequired,
};
