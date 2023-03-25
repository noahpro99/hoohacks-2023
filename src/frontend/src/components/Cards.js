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
              path='/service'
            />    
            <CardItem
              src='images/img-2.jpeg'
              text='Noah Provenzano'
              text2='Computer Science and Physics'
              path='/videos'
            /> 
            <CardItem
              src='images/img-2.jpeg'
              text='Rituraj Sharma'
              text2='Computer Science'
              path='/videos'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
