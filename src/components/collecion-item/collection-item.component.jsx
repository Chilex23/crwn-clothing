import React from "react";
<<<<<<< HEAD
import { connect } from "react-redux";
import CustomButton from "../custom-button/custom-button.component";
import "./collection-item.styles.scss";
import { addItem } from "../../redux/cart/cart.action";

const CollectionItem = ({ item, addItem }) => {
    const { name, price, imageUrl } = item;
    return (<div className="collection-item">
=======

import "./collection-item.styles.scss";

const CollectionItem = ({ id, name, price, imageUrl}) => (
    <div className="collection-item">
>>>>>>> 8a6bd8b477b16783dd7e582b989c7ddac72ec28c
        <div className="image"
            style={{
                backgroundImage: `url(${imageUrl})`
            }}
         />
        <div className="collection-footer">
            <span className="name">{ name }</span>
            <span className="price">{ price }</span>
        </div>
<<<<<<< HEAD
        <CustomButton onClick={() => addItem(item) } inverted> Add to Cart </CustomButton>
    </div>)
}

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
})

export default connect(null, mapDispatchToProps)(CollectionItem);
=======
    </div>
)

export default CollectionItem;
>>>>>>> 8a6bd8b477b16783dd7e582b989c7ddac72ec28c
