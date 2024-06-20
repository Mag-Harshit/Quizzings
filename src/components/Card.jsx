import React from 'react'

const Card = (props) => {
  return (<div>
  <a href="/HELLO">
    <div class="card" style={{width:" 18rem"}}>
  <img src={props.img} class="card-img-top" alt="..."/>
  <div class="card-body">
  <h5 className='card-text'>{props.title}</h5>
    <p class="card-text">{props.description}</p>
  </div>
</div>
</a>
</div>
  )
}

export default Card