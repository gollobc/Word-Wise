import './styles.css'
import { postCollection } from '../../../utils/backend'
import { useState } from 'react'

export default function Card({wordDetails}) {
    const [collection, setCollection] = useState({collection: ''})
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
        
        setCollection({...collection,[event.target.name]: event.target.value})
    }
    
    function handleSubmit(event) {
        event.preventDefault()
        setShowCollectionForm(false)
        postCollection({

            word:wordDetails.word
        })
    }

    let collectionForm = <></>
    if (showCollectionForm) {
        collectionForm = <form onSubmit={handleSubmit}>
            <input
                name='collection'
                placeholder='Set Collection'
                onChange={handleInputChange}
            />
            <button type='submit'>Add</button>
            <button onClick={() => setShowCollectionForm(false)}>Close</button>
        </form>
    }

    return (
        <div className="wordCard">
            <div className="word"><p>{wordDetails.word} - </p> {pronunciation}  </div>
            <div className='syllables'>{syllables}</div>
            {partOfSpeech}
            {definition}
            <button onClick={toggleCollectionForm}>Add to List</button>
        </div>
    )
}