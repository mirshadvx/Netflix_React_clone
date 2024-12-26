import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import { Link } from 'react-router-dom'

const TitleCards = ({title, category}) => {

  const [ apiData, setApiDate] = useState([])
  const cardRef = useRef()
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZjMyOWQwYWRmZmU1YTA4MmZmMWU1YzAwZDY5ZTgyZCIsIm5iZiI6MTczMjk0MTYyNy45MjUsInN1YiI6IjY3NGE5NzNiNTFkMjZiYTkzYzc4OTkwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pRq7fKYERFwu2wASUf0R_5BkQ7AJJRHOb4CpotC_MTQ'
    }
  };

  const handleWheel = (event) =>{
    event.preventDefault();
    cardRef.current.scrollLeft += event.deltaY;
  }

  useEffect(() =>{
    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setApiDate(res.results))
      .catch(err => console.error(err));
    cardRef.current.addEventListener('wheel', handleWheel);
    // console.log(apiData);
    
  },[])

  return (
    <div className='title-cards'>
      <h2>{title ? title : 'Popular on Netflix'}</h2>
      <div className="card-list" ref={cardRef}>
        { apiData.map((card, index)=>{
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default React.memo(TitleCards)
