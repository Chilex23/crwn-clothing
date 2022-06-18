import ShopActionTypes from "./shop.types";
import { db, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
import { collection, getDocs } from "firebase/firestore";

export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
});

export const fetchCollectionsStartAsync = () => {
    return async dispatch => {
        const collectionRef = collection(db, "collections");
        dispatch(fetchCollectionsStart());
        await getDocs(collectionRef)
        .then(snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            dispatch(fetchCollectionsSuccess(collectionsMap));
        }).catch(error => dispatch(fetchCollectionsFailure(error)));
    }
}