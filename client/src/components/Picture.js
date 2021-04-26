import axios from 'axios';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBar from './NavBar';
let url;

class Picture extends React.Component {
    state = {
        selectedFile: null
    };
    onFileChange = event => {
        this.setState({ selectedFile: event.target.files[0] });
    };
    onFileUpload = () => {
        const formData = new FormData();
        formData.append(
            "myFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );
        console.log(this.state.selectedFile);
        uploadPicture(this.props.name, this.props.password, this.state.selectedFile)
    };
    fileData = () => {
        if (this.state.selectedFile) {
            return (
                <div>
                    <h2>File Details:</h2>
                    <p>File Name: {this.state.selectedFile.name}</p>
                    <p>File Type: {this.state.selectedFile.type}</p>
                    <p>
                        Last Modified:
                        {this.state.selectedFile.lastModifiedDate.toDateString()}
                    </p>

                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <h2>picture of the day</h2>
                                {
                                    this.state.selectedFile.type === "video" ?
                                        <iframe src={`${url}`} alt="vidio" />
                                        :
                                        <img src={`${url}`} alt="image today" />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <h4>Choose before Pressing the Upload button</h4>
                </div>
            );
        }
    };


    render() {
        return (

            <>
            
                <NavBar />

                <div style={{ marginTop: "12%" }}>

                    <h1>{`hello ${this.props.name}`}</h1>
                    <div>
                        <button style={{marginRight:"2%", direction:"rtl"}} className="btn btn-dark" onClick={this.onFileUpload}>Upload!</button>

                        <input className="btn btn-dark" type="file" onChange={this.onFileChange} />
                    </div>
                    {this.fileData()}
                </div >
            </>


        );
    }

}



export default connect(
    (state) => {
        return {
            name: state.name,
            password: state.password,
            email: state.email,
            picture: state.picture
        }
    },
    null
)(Picture);


const uploadPicture = (name, password, file) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `${localStorage.getItem("token")}`);
    console.log(`token ${localStorage.getItem("token")}`);
    var raw = "";
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    console.log(`detailes ${name}/${password}/${file.name}/jpg/${file.webkitRelativePath}/${file.lastModifiedDate}`);

    url = "D:\אתרא\פרויקט ענק\client\try-app\src";
    fetch(`http://localhost:4200/uploadPicture/${name}/${password}/${file.name}/jpg/${url}/${file.lastModifiedDate}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}