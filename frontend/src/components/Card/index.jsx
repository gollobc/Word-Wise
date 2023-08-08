import './styles.css'
import { postCollection } from '../../../utils/backend'

export default function Card({wordDetails}) {
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
    
    function handleClick() {
        postCollection({word:wordDetails.word})
    }

    return (
        <div className="wordCard">
            <div className="word"><p>{wordDetails.word} - </p> {pronunciation}  </div>
            <div className='syllables'>{syllables}</div>
            {partOfSpeech}
            {definition}
            <button onClick={handleClick}>Add to List</button>
        </div>
    )
}