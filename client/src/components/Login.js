import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import *as Yup from 'yup'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom';
import { setName, setPassword, setEmail } from '../redux/actions/action'

import Picture from './Picture';

let login;


const LoginSchema = Yup.object().shape({
    name: Yup.string().required('this field is requierd'),
    password: Yup.string().required('this field is requierd')
})

function Login(props) {

    const history = useHistory();

    const login = async (values) => {
        console.log(values);
        getUserByNameAndPassword(values);
        if (login) {
            console.log("hello!!!");
            props.changeNameFormLogin(values.name);
            props.changePasswordFormLogin(values.password);
            // history.push("/login/todayPicture");
            history.push("/navbar");

        }




    }
    return (
        <div>
            <img style={{ opacity: 0.5, width: '100%', position: 'fixed', marginLeft: "-9.35%", marginTop: "-2%" }} className="d-block w-100" src="1.jpg" alt="First slide" />
            <div className="container ">
                <div className="row" >
                    <div className="col-6" style={{ marginLeft: "25%" }}>
                        <h1 className="text-dark" style={{ marginBottom: "10%" }}>nasa project</h1>

                        <Formik
                            initialValues={{ name: props.name, password: props.password }}
                            onSubmit={login}
                            validationSchema={LoginSchema}>
                            <Form>

                                <h2 className="text-dark">Login form</h2>
                                <div className="form-group">
                                    <Field className="form-control" type="name" name="name" placeholder='name' />
                                    <ErrorMessage className="alert alert-danger" component="div" name="name" />
                                </div>
                                <div className="form-group">
                                    <Field className="form-control" type="password" name="password" placeholder='password' />
                                    <ErrorMessage className="alert alert-danger" component="div" name="password" />
                                </div>
                                <div className="form-group">
                                    <button type='submit' className="btn btn-dark">Login</button>
                                </div>

                                <h4 className="text-dark">
                                    new User?  <Link className="text-dark" to="/register">Register</Link>
                                </h4>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </div>



    )
}




export default connect(
    (state) => {
        return {
            name: state.name,
            password: state.password,
            email: state.email
        }
    },
    (dispatch) => {
        return {
            changeNameFormLogin: function (newName) {
                dispatch(setName(newName))
            },
            changePasswordFormLogin: function (newPassword) {
                dispatch(setPassword(newPassword))
            }

        }
    }
)(Login);

function getUserByNameAndPassword(values) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    console.log(`values ${values.name}/${values.password}`);
    fetch(`http://localhost:4200/login/${values.name}/${values.password}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            if (result === "The user is not defined, Please register") {
                alert('The user is not defined, Please register')
            }
            else {
                alert('The user is login')


                console.log(`result ${result}`);

                login = true;
                let result2 = JSON.parse(result)

                localStorage.setItem('token', result2.token)
                alert(`Hii hello ${result2.user.name}`)


                // history.push('/todayImage')

            }
        }

        )
        .catch(error => console.log('error', error));
}