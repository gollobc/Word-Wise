import axios from "axios"
import { useEffect, useState } from "react"


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

    
    
    let synonymsContent = <></>
    if (synonyms.length > 0) {
        console.log(synonyms[0])
        // if (synonyms[0].meta.syns) {
        //     synonymsContent = synonyms.meta.syns.map((synonym,i) => {
        //         <p key={i}>{synonym}</p>
        //     })
        //     console.log(synonyms[0].meta)
        // } else if (synonyms.length > 1) {
        //     synonymsContent = synonyms.map((synonym,i) => {
        //         <p key={i}>{synonym}</p>
        //     })
        // }
    }

    return (
        <>
            {synonymsContent}
        </>
    )
}