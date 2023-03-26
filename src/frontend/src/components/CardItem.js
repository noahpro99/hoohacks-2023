import React from 'react';
import { Link } from 'react-router-dom';

function CardItem(props) {
  return (
    <>
      <li className='cards__item'>
        <div className='cards__item__structure'>
          <figure className='cards__item__pic-wrap'>
            <img
              className='cards__item__img'
              alt=''
              src={props.src}
            />
          </figure>
          <div className='cards__item__info'>
            <h1 className='cards__item__text'>{props.text}</h1>
            <h1 className='cards__item__text'>{props.text2}</h1>
          </div>
        </div>
      </li>
    </>
  );
}

export default CardItem;
