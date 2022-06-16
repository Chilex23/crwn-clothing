import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { selectCollection } from "../../redux/shop/shop.selector";
import CollectionItem from "../../components/collecion-item/collection-item.component";
import {db, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
import { collection, onSnapshot } from "firebase/firestore";
import { updateCollections } from "../../redux/shop/shop.action";
import "./collection.styles.scss";

const CollectionPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const collectionRef = collection(db, "collections");
        onSnapshot(collectionRef, async snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            dispatch(updateCollections(collectionsMap));
        });
      }, [dispatch]);

    const { collectionId } = useParams();
    const collecton = useSelector(state => selectCollection(collectionId)(state));
    const { title, items } = collecton;
    console.log(collecton);
    console.log(collectionId);
    return (
    <div className="collection-page">
        <h2 className="title">{title}</h2>
        <div className="items">
            {items.map(item => (
                <CollectionItem key={item.id} item={item} />
            ))}
        </div>
    </div>
    );
};

export default CollectionPage;

