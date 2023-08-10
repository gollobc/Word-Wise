import { useState } from "react"
import axios from 'axios'
import './styles.css'


export default function SearchPage() {
    const [query, setQuery] = useState('')
    const [specificQuery, setSpecificQuery] = useState('')
    const [queryResults, setQueryResults] = useState([])
    const [specificQueryResults, setSpecificQueryResults] = useState([])
    const [searchString, setSearchString] = useState('')
    const [expand, setExpand] = useState(false)
    let word = ''
    const apiKey=import.meta.env.VITE_XRAPIDAPIKEY
    
    const generalSearchOptions = {
        method: 'GET',
        url: `https://wordsapiv1.p.rapidapi.com/words/`,
        params: {
            letterPattern: `${query}`,
            limit: '50',
            page: '1'
          },
        headers: {
          'X-RapidAPI-Key': `${apiKey}`,
          'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
        }
      };

    const specificSearchOptions = {
        method: 'GET',
        url: `https://wordsapiv1.p.rapidapi.com/words/${specificQuery}`,
        headers: {
          'X-RapidAPI-Key': `${apiKey}`,
          'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
        }
      };  

    // function getWords() {
    //     axios.request(generalSearchOptions)
    //         .then( (res) => {
    //             setQueryResults([...res.data.results.data])
    //         })
    // }

    // function getWord() {
    //     axios.request(specificSearchOptions)
    //         .then( (res) => {
    //             setSpecificQueryResults(res.data)
                
    //         })
    // }
    
    function handleQuerySubmit(event) {
        event.preventDefault()
        setQueryResults([])
        getDictionary()
        //setSearchString(`Showing results for ${query}`)
    }

    function handleQueryClick() {
        setSpecificQueryResults([])
        console.log(specificQuery)
        //getWord()
    }

    // function getPronuciation() {
    //     axios.get(`https://media.merriam-webster.com/audio/prons/en/us/mp3/f/flower01.mp3
    //     `)
    // }

    let pageContent = <></>
    let soundBit = <></>

    function playAudio(id) {
        document.getElementById(id).play()
    }
    
    if (queryResults.length > 0 && specificQueryResults.length < 1) {
        // pageContent = queryResults
        //     .map((word,i) => {
        //         return <p 
        //         key={i}
        //         className="searchResults"
        //         onClick={handleQueryClick}>
        //             {word}
        //         </p>
        //     })

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
         
                
                return (
                    <div className="wordCard" key={i}>
                        <h3 
                        
                        className="searchResults"
                        onClick={handleQueryClick}
                        >
                            {word.hwi.hw}
                        </h3>
                        
                        {soundBit}
                        <p>{word.fl}</p>
                        {defs}
                    </div>
                )
            })
        //console.log(queryResults)
    } 
    
    if (expand) {

    }
    // if (specificQueryResults.length > 0) {
    //     pageContent= <div>
    //         <h1>{specificQueryResults.word}</h1>
    //     </div>
    // }
    
    /* Dictionary/Thesaurus -------------------------------------- */
    const apiDictionaryKey=import.meta.env.VITE_DICTIONARYKEY
    const apiThesaurusKey=import.meta.env.VITE_THESAURUSKEY
    const dictUrl = `https://dictionaryapi.com/api/v3/references/collegiate/json/${query}?key=${apiDictionaryKey}`
    const thesUrl = `https://dictionaryapi.com/api/v3/references/thesaurus/json/${query}?key=${apiThesaurusKey}`

    function getDictionary() {
        axios.get(dictUrl)
            .then((res) => {
                setQueryResults([...res.data])
            })
    }
    /* ----------------------------------------------------------- */

    return (
        <>
            <h1>Search</h1>
            <form onSubmit={handleQuerySubmit} >
                    <label htmlFor="search">
                        
                        <input 
                            className="search-bar"
                            name="search" 
                            placeholder="Search..." 
                            value={query}
                            onChange={event => setQuery(event.target.value)}
                        />
                        <button type="submit" className="search-button">Search</button>
                    </label>
            </form>
            {/* {searchString} */}
            {pageContent}
        </>
    )
}