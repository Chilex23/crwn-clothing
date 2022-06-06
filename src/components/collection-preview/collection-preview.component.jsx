import React from "react";
import CollectionItem from "../collecion-item/collection-item.component";
import "./collection-preview.styles.scss";

const CollectionPreview = ({ title, items }) => (
    <div className="collection-preview">
        <h1 className="title">{title.toUpperCase()}</h1>
        <div className="preview">
            {
                items
                .filter((item, idx) => idx < 4)
<<<<<<< HEAD
                .map(item => (
                    <CollectionItem key={item.id} item={item} />
=======
                .map(({id, ...otherItemProps}) => (
                    <CollectionItem key={id} {...otherItemProps} />
>>>>>>> 8a6bd8b477b16783dd7e582b989c7ddac72ec28c
                ))
            }
        </div>
    </div>
)

export default CollectionPreview;