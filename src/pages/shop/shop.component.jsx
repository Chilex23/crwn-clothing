import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import CategoryPage from "../category/category.component";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";

const ShopPage = () => ( 
    <div className="shop-page">
        <CollectionsOverview />
        <Outlet />
    </div>
);
export default ShopPage;