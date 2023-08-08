import axios from 'axios'
import { useState } from "react"
import Card from '../Card'

export default function RandomPage() {
    const [random, setRandom] = useState([])
    let pageContent = <></>

    const randomOptions = {
        method: 'GET',
        url: 'https://wordsapiv1.p.rapidapi.com/words/',
        params: {random: 'true'},
        headers: {
          'X-RapidAPI-Key': 'b56557e2f0mshbdc8958efe57781p113817jsn958d0bf11017',
          'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
        }
      };

    function getRandom() {
        axios.request(randomOptions)
            .then( (res) => {
                setRandom([res.data])
            })
    }

    function handleRandomClick() {
        setRandom([])
        getRandom()
    }

    if (random.length > 0) {
        //console.log(random)
        pageContent = <Card wordDetails={random[0]}/>
    }

    return (
        <>
            <p>Not sure what to search?</p>
            <button onClick={handleRandomClick}>Random</button>
            {pageContent}
        </>
    )
}