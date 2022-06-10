import React from "react";
import { Outlet } from "react-router-dom";
import collectionItemComponent from "../../components/collecion-item/collection-item.component";
import "./category.styles.scss";

const CategoryPage = () => (
    <div className="category-page">
        <h2>Category Page</h2>
        {/* <collectionItemComponent /> */}
    </div>
)

export default CategoryPage;

