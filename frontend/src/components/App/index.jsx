import { useEffect, useState } from 'react'
import { Routes, Route, Link } from "react-router-dom"
import HomePage from '../HomePage'
import SearchPage from '../SearchPage'
import NotFoundPage from '../NotFoundPage'
import RandomPage from  '../RandomPage'
import ListPage from '../ListPage'
import { Button } from 'semantic-ui-react'

export default function App() {

    return(
        <>
            <div className='main-body'>
                <nav>
                    <div className="home"><Link to='/'><p>WordWise</p></Link></div>
                    <div className='navigation'>
                        <Link to='/search'><p>Search</p></Link>
                        <Link to='/mylist'><p>My List</p></Link>
                        <Link to='/random'><p>Random</p></Link>
                    </div>
                    
                </nav>

                <Routes>
                    <Route path='/' element={<HomePage/>}/>
                    <Route path='/search' element={<SearchPage/>}/>
                    <Route path='/mylist' element={<ListPage/>}/>
                    <Route path='/random' element={<RandomPage/>}/>
                    <Route path="/*" element={<NotFoundPage />} />
                </Routes>
            </div>

            <footer>
                <p className='copyright'>Copyright © 2023 WordWise</p>
                <div>
                    <Link to='/'><i className="fa-solid fa-house"></i></Link>
                    <a href='github.com/gollobc'><i className="fa-brands fa-github" ></i></a>
                    <a><i className="fa-brands fa-linkedin" ></i></a>
                </div>
            </footer>
        </>
    )
}