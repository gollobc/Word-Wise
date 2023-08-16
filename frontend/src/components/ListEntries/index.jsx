import { useState } from "react"
import './styles.css'
import { getCollections, updateCollection, deleteCollection } from "../../../utils/backend"
import { Button, Form, Input } from "semantic-ui-react"

export default function ListEntries({data, refreshCollections}) {
    const [showEditForm, setShowEditForm] = useState(false)
    const [editFormData, setEditFormData] = useState({
        name: data.name,
        word: data.word
    })
    const [showEditBtns, setShowEditBtns] = useState(false)

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
        {showEditBtns ? 
        <div>
            <Button.Group size='mini'>
                <Button secondary onClick={() => {setShowEditForm(true)}}>Edit</Button>
                <Button inverted color="red" onClick={handleDelete}>Delete</Button>
            </Button.Group>
        </div> :
        null
        }

        
    </div>

if (showEditForm) {
    entry = <Form className="edit-form" onSubmit={handleSubmit}>
        <Form.Group widths='equal'>
            <Form.Input
                className="form-control" 
                name='name'
                placeholder="Name"
                value={editFormData.name}
                onChange={handleInputChange}
            />
            <br/>
            <Form.Input 
                className="form-control"
                name='word'
                placeholder="word..."
                value={editFormData.word}
                onChange={handleInputChange}
            />
        </Form.Group>
        <div className="close-sub-btns">
            <Button.Group size='mini'>
                <Button secondary onClick={() => {setShowEditForm(false)}}>Close</Button>
                <Button secondary type="submit">Submit</Button>
            </Button.Group>
        </div>
    </Form>
}
    return entry
}