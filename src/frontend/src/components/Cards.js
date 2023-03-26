import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Our team</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/img-Mik.jpg'
              text='Mikhail Sannikov'
              text2='Mechanical Engineering'
            />    
            <CardItem
              src='images/img-noah.jpg'
              text='Noah Provenzano'
              text2='Computer Science and Physics'
            /> 
            <CardItem
              src='images/img-rit.jpg'
              text='Rituraj Sharma'
              text2='Computer Science'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
