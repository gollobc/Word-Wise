import { useState } from "react"
import axios from 'axios'
import { set } from "mongoose"


export default function SearchPage() {
    const [query, setQuery] = useState('')
    const [specificQuery, setSpecificQuery] = useState('')
    const [queryResults, setQueryResults] = useState([])
    const [specificQueryResults, setSpecificQueryResults] = useState([])
    const [searchString, setSearchString] = useState('')
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

    function getWords() {
        axios.request(generalSearchOptions)
            .then( (res) => {
                setQueryResults([...res.data.results.data])
            })
    }

    function getWord() {
        axios.request(specificSearchOptions)
            .then( (res) => {
                setSpecificQueryResults(res.data)
                
            })
    }
    
    function handleQuerySubmit(event) {
        event.preventDefault()
        setQueryResults([])
        getWords()
        setSearchString(`Showing results for ${query}`)
    }

    function handleQueryClick(event) {
        setSpecificQuery(event.target.innerText)
        setSpecificQueryResults([])
        getWord()
    }

    let pageContent = <></>

    if (queryResults.length > 0 && specificQueryResults.length < 1) {
        pageContent = queryResults
            .map((word,i) => {
                return <p 
                key={i}
                className="searchResults"
                onClick={handleQueryClick}>
                    {word}
                </p>
            })
    } 
    
    if (specificQueryResults.length > 0) {
        console.log(specificQueryResults)
        pageContent= <div>
            <h1>{specificQueryResults.word}</h1>
        </div>
    }
        

    return (
        <>
            <form onSubmit={handleQuerySubmit}>
                    <label htmlFor="search">
                        <h1>Search</h1>
                        <br/>
                        <input 
                            name="search" 
                            placeholder="Search..." 
                            value={query}
                            onChange={event => setQuery(event.target.value)}
                        />
                        <button type="submit">Search</button>
                    </label>
            </form>
            {/* {searchString} */}
            {pageContent}
        </>
    )
}