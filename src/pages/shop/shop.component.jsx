import React from "react";
import { connect } from "react-redux";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import { db, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
import { collection, onSnapshot } from "firebase/firestore";
import { updateCollections } from "../../redux/shop/shop.action";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);

class ShopPage extends React.Component {
    state = {
        loading: true
    };

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { updateCollections } = this.props;
        const collectionRef = collection(db, "collections");
        onSnapshot(collectionRef, async snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
            this.setState({ loading: false });
        });
    }

    render() {
        const { loading } = this.state;
        return (
            <div className="shop-page">
                <CollectionsOverviewWithSpinner isLoading={loading} />
            </div>
        );
    }
};

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);