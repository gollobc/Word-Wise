import { Link } from "react-router-dom"
import { Button } from "semantic-ui-react"
import { Icon, Transition } from "semantic-ui-react"
import './styles.css'
import { useEffect, useState } from "react"

export default function HomePage() {
    const [visibleJig, setVisibleJig] = useState(false)
    const [visibleFly, setVisibleFly] = useState(false)
    const hide = 100
    const show = 1000
    function toggleVisible() {
        setVisibleJig(!visibleJig)
    }

    useEffect(() => {
        setVisibleJig(true)
        setVisibleFly(true)
        ,[]})

    return (
        <>
            <Transition
                animation="jiggle"
                duration={{hide, show}}
                visible={visibleJig}
                
            >
                <h1 className='title' onClick={() => toggleVisible()}> WordWise</h1>
            </Transition>

            <Transition
                animation="fly right"
                duration={900}
                visible={visibleFly}
            >
            <div className="about">
                <p>
                    Looking to expand your vocabulary? Trying to get a leg up in your next scrabble game? Or maybe, you just like learning about words. Whatever the reason might be, WordWise is here to help! 
                </p>
                <p>
                    The English language contains hundreds of thousands of words but the average adult only knows somewhere in the range of 20000-40000 words. The number of words we use in our daily lives, is even less than that. This is where WordWise can help.
                </p>
                <p>
                     Not everyone is interesed in learning more words but for those who are, our goal is to offer a fun learning experience. Here you will have access to over a 150000 words. So there will always be something new to learn. You'll be able to search any word you like and get back information such as synonyms, definitions, related words, and more. You'll also be able to create collections for studying purposes. Ready to get started?
                </p>
                <div className="search">
                    <Link to='/search'>
                        <Button animated color="black" fluid id='home-search'>
                            <Button.Content visible>Start Searching</Button.Content>
                            <Button.Content hidden>
                                <Icon name='search' ></Icon>
                            </Button.Content>
                        </Button>
                    </Link>
                </div>    
            </div>
            </Transition>

            
        </>
    )
}