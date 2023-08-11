import { useState } from "react"
import { postCollection } from "../../../../utils/backend"
import { Button, Form, Input } from "semantic-ui-react"

export default function SearchCardForm({ wordDetails }) {
    const [collectionData, setCollectionData] = useState('')
    const [showCollectionForm, setShowCollectionForm] = useState(false)

    let collectionForm = <Button size="mini" onClick={toggleCollectionForm}>Add</Button>
    
    function toggleCollectionForm() {
        setShowCollectionForm(true)
    }

    function handleSubmit(event) {
        event.preventDefault()
        setShowCollectionForm(false)
        postCollection({
            name:collectionData,
            word:wordDetails.hwi.hw
        })
    }

    function handleInputChange(event) {
        setCollectionData(event.target.value)
        console.log(wordDetails.hwi.hw)
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
            <Button type='submit'>Add</Button>
            <Button onClick={() => setShowCollectionForm(false)}>Close</Button>
            </Button.Group>
        </Form>
    }

    return (
        <>
            {collectionForm}
        </>
    )
}