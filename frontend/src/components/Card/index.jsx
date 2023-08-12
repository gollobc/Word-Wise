import './styles.css'
import { postCollection } from '../../../utils/backend'
import { useState } from 'react'
import { Input, Button, Form } from 'semantic-ui-react'

export default function Card({wordDetails}) {
    const [collectionData, setCollectionData] = useState('')
    const [showCollectionForm, setShowCollectionForm] = useState(false)
    const [addedToCollection, setAddedToCollection] = useState(false)
    let definitions = <></>
    let syllables = <></>
    let definition = <></>
    let partOfSpeech = <></>
    let pronunciation = <></>

    //let collectionForm = <Button size='mini' onClick={toggleCollectionForm}>Add to List</Button>

    if (wordDetails.syllables) {
        syllables = wordDetails.syllables.list
            .map((syllable,i) => {
                return <p key={i}>{syllable} -</p>
            })
    }

    if (wordDetails.results) {
        definition = <p>{wordDetails.results[0].definition}</p>
        partOfSpeech = <p>{wordDetails.results[0].partOfSpeech}</p>
        pronunciation = <p>{wordDetails.pronunciation}</p>
    }

    function toggleCollectionForm() {
        setShowCollectionForm(!showCollectionForm)
        //setCollectionFormButton(<></>)
    }



    function handleInputChange(event) {  
        setCollectionData(event.target.value)
    }
    
    function handleSubmit(event) {
        event.preventDefault()
        setShowCollectionForm(false)
        setAddedToCollection(true) 
        postCollection({
            name:collectionData,
            word:wordDetails.word
        })
    }

    let collectionForm = <></>
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
            <Button onClick={toggleCollectionForm}>Close</Button>
            </Button.Group>
        </Form>
    }

    return (
        <div className="wordCard">
            <div className="word"><p>{wordDetails.word} </p></div>
            <div className='syllables'>{syllables}</div>
            {/* {partOfSpeech}
            {definition} */}
            {/* {collectionFormButton} */}
            {addedToCollection ? 
                null :
                !showCollectionForm && <Button size='mini' onClick={toggleCollectionForm}>Add to List</Button> 
                
            }
            {collectionForm}
        </div>
    )
}