import './styles.css'
import { postCollection } from '../../../utils/backend'
import { useState } from 'react'
import { Input, Button } from 'semantic-ui-react'

export default function Card({wordDetails}) {
    const [collectionData, setCollectionData] = useState('')
    const [showCollectionForm, setShowCollectionForm] = useState(false)
    let definitions = <></>
    let syllables = <></>
    let definition = <></>
    let partOfSpeech = <></>
    let pronunciation = <></>
    
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

    function toggleCollectionForm () {
        setShowCollectionForm(!showCollectionForm)
    }

    function handleInputChange(event) {
        
        setCollectionData(event.target.value)
    }
    
    function handleSubmit(event) {
        event.preventDefault()
        setShowCollectionForm(false)
        postCollection({
            name:collectionData,
            word:wordDetails.word
        })
    }

    let collectionForm = <></>
    if (showCollectionForm) {
        collectionForm = <form onSubmit={handleSubmit}>
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
        </form>
    }

    return (
        <div className="wordCard">
            <div className="word"><p>{wordDetails.word} - </p> {pronunciation}  </div>
            <div className='syllables'>{syllables}</div>
            {partOfSpeech}
            {definition}
            <button onClick={toggleCollectionForm}>Add to List</button>
            {collectionForm}
        </div>
    )
}