import React from "react";
import "./custom-button.styles.scss";

<<<<<<< HEAD
const CustomButton = ({ children, isGoogleSignedIn, inverted, ...otherProps }) => (
    <button className={`${inverted ? 'inverted': ''} ${isGoogleSignedIn ? 'google-sign-in': ''} custom-button`} {...otherProps}>
=======
const CustomButton = ({ children, isGoogleSignedIn, ...otherProps }) => (
    <button className={`${isGoogleSignedIn ? 'google-sign-in': ''} custom-button`} {...otherProps}>
>>>>>>> 8a6bd8b477b16783dd7e582b989c7ddac72ec28c
        {children}
    </button>
);

export default CustomButton;