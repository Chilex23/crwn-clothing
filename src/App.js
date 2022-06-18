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

import {fetchCollectionsStart } from "./redux/shop/shop.action";
import { selectCurrentUser } from './redux/user/user.selectors';
import { selectCollectionsForPreview, selectIsCollectionFetching, selectIsCollectionsLoaded } from './redux/shop/shop.selector';

const CollectionPageWithSpinner = WithSpinner(CollectionPage);
const HomePageWithSpinner = WithSpinner(HomePage);

class App extends React.Component {
  unsubsribeFromAuth = null;

  componentDidMount() {
    //const { setCurrentUser } = this.props;
    // onAuthStateChanged is a firebase function that will return an userauth object when the user is logged in
    // this.unsubsribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    //   if (userAuth) {
    //     const userRef = await createUserProfileDocument(userAuth);
    //     onSnapshot(userRef, async userDoc => {
    //       setCurrentUser({
    //           id: userAuth.uid,
    //           ...userDoc.data()
    //         })
    //       });
    //   } else {
    //     // Setting the current user to null
    //     setCurrentUser(userAuth);
    //   }
    //   //addCollectionAndDocuments('collections', collectionsArray.map(({title, items}) => ({ title, items }) ));
    // });

    // Fetching the collections from the database and dispatching the action to the redux store to update the state with the collections data from the database (if the collections are not already in the store).
    const { fetchCollectionsStart } = this.props;
    fetchCollectionsStart();
  }

  componentWillUnmount() {
    //this.unsubsribeFromAuth();
  }

  render() {
    const { isCollectionFetching, isCollectionsLoaded } = this.props;
    return (
      <div>
        <Header/>
        <Routes>
          <Route exact path="/" element={<HomePageWithSpinner isLoading={isCollectionFetching} />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:collectionId" element={<CollectionPageWithSpinner isLoading={!isCollectionsLoaded} />} />
          <Route exact path="/checkout" element={<CheckoutPage />} />
          <Route exact path="/signin" element={this.props.currentUser ? <Navigate replace to="/" /> : <SignInAndSignUpPage/>}/>
        </Routes>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview,
  isCollectionFetching: selectIsCollectionFetching,
  isCollectionsLoaded: selectIsCollectionsLoaded
});

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
