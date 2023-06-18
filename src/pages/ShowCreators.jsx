import React, { useEffect, useState } from "react";
import Card from '../components/Card'

const ShowCreators = (props) => {
    
    const [creators, setCreators] = useState([])

    useEffect(() => {
        setCreators(props.data)
    }, [props])

    return(
        <section className="ShowCreators">
        {
            creators && creators.length > 0 ? creators.map((creator, index) => <Card key={creator.id} id={creator.id} name={creator.name} url={creator.url} description={creator.description} imageURL={creator.imageURL}/>) : <h3>{'No Creators Yet'}</h3>
        }
        </section>
    )
}

export default ShowCreators