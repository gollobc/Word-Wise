import { useState } from "react"
import './styles.css'
import { getCollections, updateCollection, deleteCollection } from "../../../utils/backend"
import { Button } from "semantic-ui-react"

export default function ListEntries({data, refreshCollections}) {
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
            .then(() => refreshCollections())       
    }

    function handleDelete() {
        deleteCollection(data._id)
            .then(() => refreshCollections())
    }

    let entry = <div className="entry">
        <p>{data.word}</p>
        <div>
            <Button.Group size='mini'>
                <Button secondary onClick={() => {setShowEditForm(true)}}>Edit</Button>
                <Button inverted color="red" onClick={handleDelete}>Delete</Button>
            </Button.Group>
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
            <Button.Group size='mini'>
                <Button onClick={() => {setShowEditForm(false)}}>Close</Button>
                <Button type="submit">Submit</Button>
            </Button.Group>
        </div>
    </form>
}
    return entry
}