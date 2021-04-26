import React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import NavBar from './NavBar';

function TodayPicture(props) {
    const [url, setUrl] = useState("")
    const [title, setTitle] = useState("")
    const [explanation, setExplanation] = useState("")
    const [mediaType, setMediaType] = useState("")


    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `${localStorage.getItem("token")}`);
        console.log(`token ${localStorage.getItem("token")}`);
        console.log(`name ${props.name}`);
        console.log(`password ${props.password}`);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };


        fetch(`http://localhost:4200/newPicture/${props.name}/${props.password}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                let result2 = JSON.parse(result)
                setUrl(result2.newPicture.url)
                console.log(`url ${url}`);
                setTitle(result2.newPicture.title)
                setExplanation(result2.newPicture.explanation)
                setMediaType(result2.newPicture.media_type)
                console.log(`MediaType ${mediaType}`);

                console.log(result2);

            })
            .catch(error => console.log('error', error));
    },[])

    return (
        <div >
            <NavBar/>
            <div className="container">
                <div className="row ">
                    <div className="col" style={{marginTop:"12%"}}>
                        {
                            mediaType === "video" ?
                                <iframe src={`${url}`} alt="vidio" />
                                :
                                <img src={`${url}`} itemType={`${mediaType}`} alt="image today" />
                        }
                        {/* <Image src={`${url}`} rounded className=" w-100" /> */}
                    </div>

                    <div className="col mt-5">
                        <h2>{title}</h2>
                        <p>{explanation}</p>
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
            email: state.email,
            picture: state.picture
        }
    },
    null
)(TodayPicture);
