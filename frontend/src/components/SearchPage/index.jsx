import { useState } from "react"
import axios from 'axios'
import './styles.css'
import { Input } from "semantic-ui-react"
import SearchCardForm from "./SearchCardForm"
import Synonyms from "./Synonyms"


export default function SearchPage() {
    const [query, setQuery] = useState('')
    const [queryResults, setQueryResults] = useState([])
    const [searchString, setSearchString] = useState('')
    const [showCollectionForm, setShowCollectionForm] = useState(false)
   
    const apiDictionaryKey=import.meta.env.VITE_DICTIONARYKEY
    const dictUrl = `https://dictionaryapi.com/api/v3/references/collegiate/json/${query}?key=${apiDictionaryKey}`


    function getDictionary() {
        axios.get(dictUrl)
            .then((res) => {
                setQueryResults([...res.data])
            })
    }    

    function handleQuerySubmit(event) {
        event.preventDefault()
        setQueryResults([])
        getDictionary()
        setSearchString(`Showing results for ${query}`)
    }

    function playAudio(id) {
        document.getElementById(id).play()
    }

    let pageContent = <></>
    let soundBit = <></>
    let collectionForm = <></>
    let etyContent = <></>

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

    if (queryResults.length > 0 && typeof queryResults[0] === 'object') {
        console.log(queryResults)
        pageContent = queryResults
            .map((word,i) => {
                let defs = ''
                defs = word.shortdef
                    .map((def, x) => {                       
                        return <p className='def' key={x}>{def}</p>
                    })

                if (word.hwi.prs) {
                    let baseFile = word.hwi.prs[0].sound.audio
                    let wordId = word.meta.id

                    let subDirectory = <></>
                    if (baseFile.startsWith('bix')) {
                        subDirectory = 'bix'
                    } else if (baseFile.startsWith('gg')) {
                        subDirectory = 'gg'
                    } else if (baseFile.charCodeAt(0) < 97) {
                        subDirectory = 'number'
                    } else {
                        subDirectory = word.hwi.hw[0].toLowerCase()
                    }

                    let soundUrl=`https://media.merriam-webster.com/audio/prons/en/us/mp3/${subDirectory}/${baseFile}.mp3`

                    soundBit =  <>
                        <audio hidden preload='auto' id={wordId}>
                            <source src={soundUrl} type='audio/mpeg'/>
                    
                        </audio>   
                        <i 
                        className="fa-solid fa-volume-high"
                        onClick={() => playAudio(wordId)}
                        ></i>
                    </>
                } else {
                    soundBit = <></>
                }

                if (word.et) {
                    etyContent = <>
                        <p className="etymology">Etymology</p>
                        <p className="ety-info">{word.et[0][1].replaceAll(/{(.*?)}/g,'')}</p>
                    </>
                } else {
                    etyContent = <></>
                }
         
                
                return (
                    <div className="wordCard" key={i}>
                        <h2 className="search-word">
                            {word.hwi.hw.replaceAll('*','')}
                            {soundBit}
                        </h2>
                        
                        
                        <p>{word.fl}</p>
                        {defs}
                        <Synonyms word={word.hwi.hw}/>
                        {etyContent}
                        <SearchCardForm wordDetails={word}/>
                    </div>
                )
            })
    } else if (typeof queryResults[0] === 'string') {
        pageContent = queryResults
            .map((word, i) => {
                return <p className='alternate-results' key={i}>{word}</p>
            })
    }
 

    

    return (
        <div className="search-container">

            <h1>Search</h1>

            <form onSubmit={handleQuerySubmit} >
                    <label htmlFor="search">
                        
                        <Input 
                            action={{
                                content:'Search',
                                color: 'black'
                            }}
                            size='small'
                            className="search-bar"
                            name="search" 
                            placeholder="Search..." 
                            value={query}
                            onChange={event => setQuery(event.target.value)}
                        />
                    </label>
            </form>

            <div className="search-string">
               {searchString}  
            </div>
            
            <div className="results-container">
                {pageContent}
            </div>
            
            
            
        </div>
    )
}