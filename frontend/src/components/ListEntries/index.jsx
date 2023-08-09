import { useState } from "react"
import './styles.css'
import { updateCollection, deleteCollection } from "../../../utils/backend"

export default function ListEntries({data}) {
    const [showEditForm, setShowEditForm] = useState(false)
    const [editFormData, setEditFormData] = useState({
        name: data.name,
        word: data.word
    })

    function handleInputChange(event) {
        setEditFormData({
            ...editFormData,
            [event.target.name]: event.target.value
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        setShowEditForm(false)
        updateCollection(editFormData, data._id)        
    }

    function handleDelete() {
        deleteCollection(data._id)
    }

    let entry = <div className="entry">
        <p>{data.word}</p>
        <div>
            <button onClick={() => {setShowEditForm(true)}}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
        
    </div>

if (showEditForm) {
    entry = <form className="edit-form" onSubmit={handleSubmit}>
        <input
            className="form-control" 
            name='name'
            placeholder="Name"
            value={editFormData.name}
            onChange={handleInputChange}
        />
        <br/>
        <textarea 
            className="form-control"
            name='word'
            placeholder="word..."
            value={editFormData.word}
            onChange={handleInputChange}
        />
        <div className="edit-delete-btns">
            <button onClick={() => {setShowEditForm(false)}}>Close</button>
            <button type="submit">Submit</button>
        </div>
    </form>
}
    return entry
}