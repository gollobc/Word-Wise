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

    function refreshCollections() {
        getCollections()
            .then(newCollectionData => setCollections(newCollectionData))
    }

    if (collections.length > 0) {
        pageContent = collections
            .map((collection, i) => {
                return <ListEntries 
                    key={i}
                    data={collection}
                    refreshCollections={refreshCollections}
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