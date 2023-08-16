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
            <div className='main-body'>


                <Routes>
                    <Route path='/' element={<HomePage/>}/>
                    <Route path='/search' element={<SearchPage/>}/>
                    <Route path='/mylist' element={<ListPage/>}/>
                    <Route path='/random' element={<RandomPage/>}/>
                    <Route path="/*" element={<NotFoundPage />} />
                </Routes>

            <footer>
                <h2 className='copyright'>Copyright © 2023 WordWise</h2>
                <div>
                    <Link to='/'><i className="fa-solid fa-house"></i></Link>
                    <a href='https://github.com/gollobc' target='_blank' rel="noreferrer noopener"><i className="fa-brands fa-github" ></i></a>
                    <a href='https://linkedin.com/in/cadegollob' target='_blank' rel="noreferrer noopener"><i className="fa-brands fa-linkedin" ></i></a>
                </div>
            </footer>

            </div>
            
        </>
    )
}