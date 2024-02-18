import React from 'react'

const Card = ({album}) => {
    console.log(album)
    let link = album.external_urls.spotify;
    let name = (album.name).substring(0,20)
  return (
    <>
        <div className='card'>
            <div className="card_inner">
              <div className="card_front">
                  <img src={album.images[1].url} />
                  <p>{name+"..."}</p>
              </div>
              <div className="card_back">
                  <p>Name: {album.name}</p>
                  <p>Release Date: {album.release_date}</p>
                  <p>Toatal Tracks: {album.total_tracks}</p>
              </div>
            </div>
            <button><a href={link} target='blank'>Listen Now</a></button>
        </div>
    </>
  )
}

export default Card
