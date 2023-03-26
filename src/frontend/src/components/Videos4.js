import React from 'react';
import './Videos4.css';
import VideoItem from './VideoItem';

function Videos4() {
  return (
    <div className='videos'>
      <h1>Click on any image to see the model working</h1>
      <div className='videos__container'>
        <div className='videos__wrapper'>
          <ul className='videos__items'>
            <VideoItem
              src='images/ex-1.png'
              text='Pizza Box'
              path='/service?image=1'
            /> 
            <VideoItem
              src='images/ex-2.png'
              text='Water Bottle'
              path='/service?image=2'
            />
          </ul>  
          <ul className='videos__items'> 
            <VideoItem
              src='images/ex-3.png'
              text='Battery'
              path='/service?image=3'
            />
            <VideoItem
              src='images/ex-4.png'
              text='Compost'
              path='/service?image=4'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Videos4;
