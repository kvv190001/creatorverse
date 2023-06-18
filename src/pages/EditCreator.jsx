import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../client'

const EditCreator = ({data}) => {
    const {id} = useParams()
    const [creator, setCreator] = useState({id: null, name: "", url: "", description: "", imageURL: ""})

    useEffect(() => {
        const result = data.filter(item => String(item.id) === id)[0]
        setCreator({name: result.name, url: result.url, description: result.description, imageURL: result.imageURL})
    }, [data, id])

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setCreator( (prev) => {
            return{
                ...prev,
                [name]: value,
            }
        })
    }

    const editCreator = async (event) => {
        event.preventDefault()

        const { error } = await supabase
            .from('creators')
            .update({ name: creator.name, url: creator.url, description: creator.description, imageURL: creator.imageURL })
            .eq('id', id)

        if(error) {
            console.log(error)
        }

        window.location = "/"
    }

    const deleteCreator = async (event) => {
        event.preventDefault()

        const { error } = await supabase
            .from('creators')
            .delete()
            .eq('id', id)

        if(error){
            console.log(error)
        }

        window.location = "/"
    }

    return(
        <div className="AddEditCreator">
            <label>Name</label>
            <input type="text" id="name" name="name" value={creator.name} onChange={handleInputChange} required></input>
            
            <label>Image</label>
            <input type="text" id="imageURL" name="imageURL" value={creator.imageURL} onChange={handleInputChange} required></input>

            <label>Description</label>
            <input type="text" id="description" name="description" value={creator.description} onChange={handleInputChange} required></input>

            <label>Link</label>
            <input type="text" id="url" name="url" value={creator.url} onChange={handleInputChange} required></input>

            <button type="submit" onClick={editCreator}>Submit</button>
            <button type="submit" onClick={deleteCreator}>Delete</button>
        </div>
    )

}

export default EditCreator