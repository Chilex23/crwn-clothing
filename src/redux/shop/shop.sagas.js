import { takeLatest, call, put } from 'redux-saga/effects';
import ShopActionTypes from './shop.types';
import { db, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
import { collection, getDocs } from "firebase/firestore";
import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.action';

export function* fetchCollectionsAsync() {
    yield console.log("I'm fired");

    try {
        const collectionRef = collection(db, "collections");
        const snapshot = yield getDocs(collectionRef);
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionsFailure(error));
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}