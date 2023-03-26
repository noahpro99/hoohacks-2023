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
              src='images/img-1.jpg'
              text='Shop Robbery'
              path='/service'
            /> 
            <VideoItem
              src='images/img-1.jpg'
              text='Burglary'
              path='/service'
            />
          </ul>  
          <ul className='videos__items'> 
            <VideoItem
              src='images/img-1.jpg'
              text='Another form of burglary'
              path='/service'
            />
            <VideoItem
              src='images/img-1.jpg'
              text='Innocent video for comparison'
              path='/service'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Videos4;
