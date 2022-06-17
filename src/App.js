import './App.css';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import CheckoutPage from './pages/checkout/checkout.component';
import CollectionPage from './pages/collection/collection.component';
import WithSpinner from './components/with-spinner/with-spinner.component';

import { auth, createUserProfileDocument, db, convertCollectionsSnapshotToMap } from './firebase/firebase.utils';
import { collection, onSnapshot } from 'firebase/firestore';

import { setCurrentUser } from "./redux/user/user.actions";
import { updateCollections } from "./redux/shop/shop.action";
import { selectCurrentUser } from './redux/user/user.selectors';
import { selectCollectionsForPreview } from './redux/shop/shop.selector';

const ShopPageWithSpinner = WithSpinner(ShopPage);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class App extends React.Component {
  state = {
    loading: true
  };

  unsubsribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubsribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        onSnapshot(userRef, async userDoc => {
          setCurrentUser({
              id: userAuth.uid,
              ...userDoc.data()
            })
          });
      } else {
        // Setting the current user to null
        setCurrentUser(userAuth);
      }
      //addCollectionAndDocuments('collections', collectionsArray.map(({title, items}) => ({ title, items }) ));
    });

    // Fetching the collections from the database and updating the state with the collections data from the database (if the data is not already present in the state) and then setting the loading to false so that the ShopPageWithSpinner component will render the ShopPage component and not the WithSpinner component anymore (which is the default behaviour)
    const { updateCollections } = this.props;
    const collectionRef = collection(db, "collections");
    onSnapshot(collectionRef, async snapshot => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        updateCollections(collectionsMap);
        this.setState({ loading: false });
    });
  }

  componentWillUnmount() {
    this.unsubsribeFromAuth();
  }

  render() {
    const { loading } = this.state;
    return (
      <div>
        <Header/>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPageWithSpinner isLoading={loading} />} />
          <Route path="/shop/:collectionId" element={<CollectionPageWithSpinner isLoading={loading} />} />
          <Route exact path="/checkout" element={<CheckoutPage />} />
          <Route exact path="/signin" element={this.props.currentUser ? <Navigate replace to="/" /> : <SignInAndSignUpPage/>}/>
        </Routes>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
