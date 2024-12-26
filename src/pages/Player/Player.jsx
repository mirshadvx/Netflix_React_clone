import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const {id} = useParams()
  const navigate = useNavigate()

  const [apiData, setApiDate ] = useState({
    name: "",
    key: "",
    published_at: "",
    type: ""
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZjMyOWQwYWRmZmU1YTA4MmZmMWU1YzAwZDY5ZTgyZCIsIm5iZiI6MTczMjk0MTYyNy45MjUsInN1YiI6IjY3NGE5NzNiNTFkMjZiYTkzYzc4OTkwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pRq7fKYERFwu2wASUf0R_5BkQ7AJJRHOb4CpotC_MTQ'
    }
  };

  useEffect(() => {
  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => setApiDate(res.results[0]))
    .catch(err => console.error(err));    
  },[])

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={() => {navigate("/")}} />
      <iframe title='trailer' width="90%" height="90%"
       src={`https://www.youtube.com/embed/${apiData.key}`}   
       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowfullscreen ></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
    
  )
}

export default Player
