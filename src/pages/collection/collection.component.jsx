import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectCollection } from "../../redux/shop/shop.selector";
import CollectionItem from "../../components/collecion-item/collection-item.component";
import "./collection.styles.scss";

const CollectionPage = () => {
    const { collectionId } = useParams();
    const collection = useSelector(state => selectCollection(collectionId)(state));
    const { title, items } = collection;
    console.log(collection);
    console.log(collectionId);
    return (
    <div className="collection-page">
        <h2 className="title">{title}</h2>
        <div className="items">
            {items.map(item => (
                <CollectionItem key={item.id} item={item} />
            ))}
        </div>
        {/* <collectionItemComponent /> */}
    </div>
    );
};

export default CollectionPage;

