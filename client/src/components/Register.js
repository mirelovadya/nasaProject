import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import *as Yup from 'yup'
import { setName, setPassword, setEmail } from '../redux/actions/action'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom';


let register=false;


const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('this field is requierd').min(2),
    email: Yup.string().required('this field is requierd').email('invalid mail'),
    password: Yup.string().required('this field is requierd')
})

function Register(props) {

    const history = useHistory();


    const register = (values) => {
        console.log(`${values.name} ${values.email} ${values.password}`);

    
        newUser(values);
        if (register) {
            props.changeNameFormLogin(values.name);
            props.changePasswordFormLogin(values.password);
            props.changeEmailFormLogin(values.email);

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
                            initialValues={{ name: '', email: '', password: '' }}
                            onSubmit={register}
                            validationSchema={RegisterSchema}>
                            <Form>

                                <h2 className="text-dark">Register form</h2>
                                <div className="form-group">
                                    <Field className="form-control" type="text" name="name" placeholder='name' />
                                    <ErrorMessage className="alert alert-danger" component="div" name="name" />
                                </div>
                                <div className="form-group">
                                    <Field className="form-control" type="email" name="email" placeholder='Email' />
                                    <ErrorMessage className="alert alert-danger" component="div" name="email" />
                                </div>
                                <div className="form-group">
                                    <Field className="form-control" type="password" name="password" placeholder='Password' />
                                    <ErrorMessage className="alert alert-danger" component="div" name="password" />
                                </div>
                                <div className="form-group">
                                    <button type='submit' className="btn btn-dark">Register</button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </div>





    )
}

export default connect(
    undefined,
    (dispatch) => {
        return {
            changeNameFormLogin: function (newName) {
                dispatch(setName(newName))
            },
            changePasswordFormLogin: function (newPassword) {
                dispatch(setPassword(newPassword))
            },
            changeEmailFormLogin: function (newEmail) {
                dispatch(setEmail(newEmail))
            }
        }
    }
)(Register);


function newUser(values) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    console.log(`values ${values.name} ${values.email} ${values.password}`);
    var raw = JSON.stringify({ "name": values.name, "email": values.email, "password": values.password });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:4200/newUser", requestOptions)
        .then(response => response.text())
        .then(result => {console.log(result)
            register=true;
        })
        .catch(error => console.log('error', error));
    console.log("hello");
}