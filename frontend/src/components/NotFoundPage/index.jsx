import { Link } from 'react-router-dom'
export default function NotFound() {

    return (
        <>
            <h1>404 Error</h1>
            <p>Page not found</p>
            <Link to="/"><button>Return Home</button></Link>
        </>
    )
}