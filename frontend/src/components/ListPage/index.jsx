import { useEffect, useState } from "react"
import { getCollections, updateCollection, deleteCollection } from "../../../utils/backend"
import ListEntries from "../ListEntries"

export default function ListPage() {
    const [collections, setCollections] = useState([])


    let pageContent = <p>Loading collections</p>

    useEffect(() => {
        getCollections()
            .then(collections => setCollections(collections))
    }, [])

    if (collections.length > 0) {
        pageContent = collections
            .map((collection, i) => {
                return <ListEntries 
                    key={i}
                    data={collection}
                />
            })
    }
    return (
        <>
            <h1>Your Words</h1>
            {pageContent}
        </>
    )
}