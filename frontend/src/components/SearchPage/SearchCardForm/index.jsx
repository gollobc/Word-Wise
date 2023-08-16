import { useState } from "react"
import { postCollection } from "../../../../utils/backend"
import { Button, Form, Input } from "semantic-ui-react"

export default function SearchCardForm({ wordDetails }) {
    const [collectionData, setCollectionData] = useState('')
    const [showCollectionForm, setShowCollectionForm] = useState(false)
    const [addedToCollection, setAddedToCollection] = useState(false)

    let collectionForm = <></>

    if (!addedToCollection) {
        collectionForm = <Button secondary size="mini" onClick={toggleCollectionForm}>Add</Button>
    } else {
        collectionForm = null
    }
   
    
    function toggleCollectionForm() {
        setShowCollectionForm(true)
    }

    function handleSubmit(event) {
        event.preventDefault()
        setShowCollectionForm(false)
        setAddedToCollection(true)
        postCollection({
            name:collectionData,
            word:wordDetails.hwi.hw.replaceAll('*','')
        })
    }

    function handleInputChange(event) {
        setCollectionData(event.target.value)
    }

    if (showCollectionForm) {
        collectionForm = <Form onSubmit={handleSubmit}>
            <Input
                size='mini'
                name='collection'
                placeholder='Set Collection'
                onChange={handleInputChange}
            />
            <Button.Group size='mini'>
            <Button secondary type='submit'>Add</Button>
            <Button secondary onClick={() => setShowCollectionForm(false)}>Close</Button>
            </Button.Group>
        </Form>
    }

    return (
        <>
            {collectionForm}
        </>
    )
}