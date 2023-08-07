import { useState } from "react"
import axios from 'axios'


export default function SearchPage() {
    const [query, setQuery] = useState('')
    const [queryResults, setQueryResults] = useState([])
    const [searchString, setSearchString] = useState('')

    const apiKey=import.meta.env.X_RAPIDAPI_KEY

    const options = {
        method: 'GET',
        url: `https://wordsapiv1.p.rapidapi.com/words/${query}`,
        headers: {
          'X-RapidAPI-Key': `${apiKey}`,
          'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
        }
      };
      
    function getWords() {
        axios.request(options)
            .then( (res) => {
                console.log(res.data)
            })
    }

    function handleQuerySubmit(event) {
        event.preventDefault()
        setQueryResults([])
        getWords()
        setSearchString(`Showing results for ${query}`)
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
        </>
    )
}