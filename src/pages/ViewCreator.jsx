import { supabase } from "../client";
import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';

const ViewCreator = ({ data }) => {
    const goToURL = () => {
        window.open(creator.url)
    }

    const { id } = useParams()
    const [creator, setCreator] = useState({ id: null, name: "", url: "", description: "", imageURL: "" })

    useEffect(() => {
        const result = data.filter(item => String(item.id) === id)[0]
        setCreator({ id: result.id, name: result.name, url: result.url, description: result.description, imageURL: result.imageURL })
    }, [data, id])

    const deleteCreator = async (event) => {
        event.preventDefault()
        const { error } = await supabase
            .from('creators')
            .delete()
            .eq('id', id)

        if(error){
            console.log(error);
        }

        window.location = "/"
    }

    return(
        <div class="ViewCreator">
            <section class="creator-image">
                <img src={creator.imageURL}
                    alt={creator.name} />
            </section>
            <section class="creator-info">
                <h2>{creator.name}</h2>
                <p>{creator.description}</p>
                {creator.url !== null && creator.url !== '' ? (
                    <button class="social-button" onClick={goToURL}>{creator.url}</button>
                ) : ""}
            </section>
            <section class="modify-creator">
                <Link to={'/edit/' + creator.id}><button onClick={() => window.scrollTo({top: 600, behavior: 'smooth'})}>Edit</button></Link>
                <button onClick={deleteCreator} class="delete-button" >Delete</button>
            </section>
        </div>
    )
}

export default ViewCreator