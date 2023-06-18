import React, { useState } from 'react'
import { supabase } from '../client'

const AddCreator = () => {
    const [creator, setCreator] = useState({ name: "", url: "", description: "", imageURL: "" })

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCreator((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    const addCreator = async (event) => {
        event.preventDefault()

        const { error } = await supabase
            .from('creators')
            .insert({ name: creator.name, url: creator.url, description: creator.description, imageURL: creator.imageURL })
            .select()

        if (error) {
            console.log(error)
        }

        window.location = "/"
    }

    return (
        <div className="AddEditCreator">
            <form id="addCreatorForm">
                <label>Name</label>
                <input type="text" id="name" name="name" value={creator.name} onChange={handleInputChange} required></input>

                <label>Image</label>
                <input type="text" id="imageURL" name="imageURL" value={creator.imageURL} onChange={handleInputChange} required></input>

                <label>Description</label>
                <input type="text" id="description" name="description" value={creator.description} onChange={handleInputChange} required></input>

                <label>Link</label>
                <input type="text" id="url" name="url" value={creator.url} onChange={handleInputChange} required></input>

                <button type="submit" onClick={addCreator}>Submit</button>
            </form>
        </div>
    )
}

export default AddCreator