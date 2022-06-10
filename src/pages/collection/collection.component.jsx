import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectCollection } from "../../redux/shop/shop.selector";
import collectionItemComponent from "../../components/collecion-item/collection-item.component";
import "./collection.styles.scss";

const CollectionPage = () => {
    const { collectionId } = useParams();
    const collection = useSelector(state => selectCollection(collectionId)(state));
    console.log(collection);
    console.log(collectionId);
    return (
    <div className="category-page">
        <h2>Collection Page</h2>
        {/* <collectionItemComponent /> */}
    </div>
    );
};

export default CollectionPage;

