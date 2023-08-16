import axios from "axios"
import { useEffect, useState } from "react"
import './styles.css'


export default function Synonyms({ word }) {

    const [synonyms, setSynonyms] = useState([])

    const apiThesaurusKey=import.meta.env.VITE_THESAURUSKEY
    const thesUrl = `https://dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=${apiThesaurusKey}`

    useEffect(() => {
        getSynonyms()
    }, [])

    function getSynonyms() {
        axios.get(thesUrl)
            .then((res) => {
                setSynonyms([...res.data])
            })
    }

    
    let synonymsHeader = <></>
    let synonymsContent = <></>
    let antonymsHeader = <></>
    let antonymsContent = <></>
    if (typeof synonyms[0] === 'object') {
        synonymsHeader = <p>Synonyms</p>
        synonymsContent = synonyms[0].meta.syns[0].map((synonym,i) => {
            return <p key={i}>{synonym}</p>
            })
        if (synonyms[0].meta.ants.length > 0) {
            antonymsHeader = <p>Antonyms</p>
            antonymsContent = synonyms[0].meta.ants[0].map((antonym,i) => {
                return <p key={i}>{antonym}</p>
            })
        }
    } else if (synonyms.length > 0) {
        synonymsHeader = <p>Synonyms</p>
        synonymsContent = synonyms.map((synonym,i) => {
            return <p key={i}>{synonym}</p>
        })
    }
        

    return (
        <>
        {synonymsHeader}
        <div className="syn-content">
            {synonymsContent}
        </div>
        {antonymsHeader}
        <div className="ant-content">
            {antonymsContent}
        </div>
        </>
    )
}