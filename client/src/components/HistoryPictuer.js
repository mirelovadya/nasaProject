import React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import NavBar from './NavBar';
let i = 3;

function HistoryPicture(props) {
    const [picturs, setPicture] = useState([]);



    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `${localStorage.getItem("token")}`);
        console.log(`${localStorage.getItem("token")}`);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        console.log(`${props.name}/${props.password}`);
        fetch(`http://localhost:4200/getPictureByUserNameAndPassword/${props.name}/${props.password}`, requestOptions)
            .then(response => response.json())
            .then(result => {

                let result2 = result.picturs;
                console.log(`result2 ${result2}`);

                setPicture(result2)


            })
            .catch(error => console.log('error', error));
    }, [])


    // if (i < 5) {
    //     let result = getAllPicture();
    //     console.log("iiiii");
    //     i++;;
    // }


    return (
        <div>
            <NavBar />
            <div className="container">
                <div className="row">
                    {
                        picturs && picturs.map((item, index) =>
                            <div>
                                <div className="col" style={{ marginTop: "12%" }}>
                                    <h2>{`picture ${index + 1}`}</h2>
                                    <h1>hi {item.media_type}</h1>
                                    {
                                        item.media_type === "video" ?
                                            <iframe src={`${item.url}`} alt="vidio" />
                                            :
                                            <img src={`${item.url}`} itemType={`${item.media_type}`} alt="image today" />
                                    }
                                    {/* <Image src={`${url}`} rounded className=" w-100" /> */}
                                </div>

                                <div className="col mt-5">
                                    <h2>{item.title}</h2>
                                    <p>{item.explanation}</p>
                                </div>
                            </div>
                        )}

                    {/* <div className="col">
                        <h2>picture of the day</h2>
                        {
                            mediaType === "video" ?
                                <iframe src={`${url}`} alt="vidio" />
                                :
                                <img src={`${url}`} itemType={`${mediaType}`} alt="image today" />
                        }
                    </div>

                    <div className="col mt-5">
                        <h2>{title}</h2>
                        <p>{explanation}</p>
                    </div> */}

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
)(HistoryPicture);

