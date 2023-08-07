import { useEffect, useState } from 'react'
import { Routes, Route, Link } from "react-router-dom"
import HomePage from '../HomePage'
import SearchPage from '../SearchPage'
import NotFoundPage from '../NotFoundPage'
import RandomPage from  '../RandomPage'
import ListPage from '../ListPage'

export default function App() {

    return(
        <>
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
    
            <footer>
                <i className="fa-brands fa-github" ></i>
                <i className="fa-brands fa-linkedin" ></i>
            </footer>
        </>
    )
}