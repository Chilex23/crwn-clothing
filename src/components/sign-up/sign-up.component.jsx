import React from "react";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";
import "./sign-up.styles.scss";

class SignUp extends React.Component {
    constructor() {
        super();

        this.state = {
            displayName: "",
            email: "",
            password: "",
            confirmPassword: ""
        };
    }

    handleSubmit = async event => {
        event.preventDefault();
        const {displayName, email, password, confirmPassword} = this.state;
        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }
        try {
            // Auth user exists on the user property in the auth object
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                createUserProfileDocument(user, {displayName});
                this.setState({
                    displayName: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                });
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
                // ..
            });
        } catch {
            console.error("Error creating user");
        }
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        const { displayName, email, password, confirmPassword } = this.state;
        return(
            <div className="sign-up">
                <h2 className="title">I do not have an account</h2>
                <span>Sign up with your email and password</span>
                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <FormInput type="text"
                      name="displayName"
                      value={displayName}
                      handleChange={this.handleChange}
                      label="Display Name"
                      required/>

                    <FormInput type="email"
                      name="email"
                      value={email}
                      handleChange={this.handleChange}
                      label="Email"
                      required/>

                    <FormInput type="password"
                      name="password"
                      value={password}
                      handleChange={this.handleChange}
                      label="Password"
                      required/>

                    <FormInput type="password"
                      name="confirmPassword"
                      value={confirmPassword}
                      handleChange={this.handleChange}
                      label="Confirm Password"
                      required/>

                    <CustomButton type="submit">SIGN UP</CustomButton>
                </form>
            </div>
        )
    }
}

export default SignUp;