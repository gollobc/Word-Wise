import { useEffect, useState } from "react"
import { getCollections, updateCollection, deleteCollection } from "../../../utils/backend"
import ListEntries from "../ListEntries"
import { Button } from "semantic-ui-react"

export default function ListPage() {
    const [collections, setCollections] = useState([])
    const [showEditBtns, setShowEditBtns] = useState(false)

    let pageContent = <p>Loading collections</p>

    useEffect(() => {
        getCollections()
            .then(collections => setCollections(collections))
    }, [])

    function refreshCollections() {
        getCollections()
            .then(newCollectionData => setCollections(newCollectionData))
    }

    function toggleEdit() {
        setShowEditBtns(!showEditBtns)
    }

    if (collections.length > 0) {
        pageContent = collections
            .map((collection, i) => {
                return <ListEntries 
                    key={i}
                    data={collection}
                    refreshCollections={refreshCollections}
                    showEditBtns={showEditBtns}
                />
            })
    }
    return (
        <>
            <h1>Your Words</h1>
            <div className="edit-mode">
                <Button secondary onClick={toggleEdit} >Edit Mode</Button>
            </div>

            {pageContent}
        </>
    )
}