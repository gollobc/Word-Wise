import { Link } from "react-router-dom"

export default function HomePage() {

    return (
        <>
            <h1> WordWise
                {/* <span>W</span>
                <span>o</span>
                <span>r</span>
                <span>d</span>
                <span>W</span>
                <span>i</span>
                <span>s</span>
                <span>e</span> */}
            </h1>

            <div className="about">
                <p>
                    Looking to expand your vocabulary? Trying to get a leg up in your next scrabble game? Or maybe, you just like learning about words. Whatever the reason might be, WordWise is here to help! 
                </p>
                <p>
                    The English language contains hundreds of thousands of words but the average adult only knows somewhere in the range of 20000-40000 words. The number of words we use in our daily lives, is even less than that. This is where WordWise can help. Not everyone is interesed in learning more words but for those who are, our goal is to offer a new and fun learning experience. Here you will have access to over a 150000 words. So there will always be something new to learn. You'll be able to search any word you like and get back information such as synonyms, antonyms, similar words, and much more. You'll also be able to create collections of words for studying purposes. Ready to get started?
                </p>
            </div>

            <div className="search">
                <Link to='/search'><button>Start Searching</button></Link>
            </div>
        </>
    )
}