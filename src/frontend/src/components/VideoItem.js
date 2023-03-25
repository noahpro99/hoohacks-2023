import React from 'react';
import { Link } from 'react-router-dom';

function VideoItem(props) {
  return (
    <>
      <li className='videos__item'>
        <Link className='videos__item__link' to={props.path}>
          <figure className='videos__item__pic-wrap'>
            <img
              className='cards__item__img'
              alt=''
              src={props.src}
            />
          </figure>
          <div className='videos__item__info'>
            <h1 className='videos__item__text'>{props.text}</h1>
          </div>
        </Link>
      </li>
    </>
  );
}

export default VideoItem;
