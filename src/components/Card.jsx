import React from 'react'
import { Link } from 'react-router-dom'

const Card = (props) => {

    return (
        <div className='Card' style={{ backgroundImage: `url(${props.imageURL})` }} >
            <article>
                <div className='card-header-name'>
                    <h3>{props.name}</h3>
                    <p>{props.url}</p>
                </div>
                <div className="card-header-edit">
                    <Link to={'/' + props.id} onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}><i className="fa-solid fa-circle-info"></i></Link>
                    <Link to={'/edit/' + props.id} onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}><i className="fa-solid fa-pen"></i></Link>
                </div>
                <div className='card-description'>
                    <p>{props.description}</p>
                </div>
            </article>
        </div>
    )
}

export default Card