// create a typescript functional component with the name IFrame which renders an iframe element with the following props: url
//


import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';

const IFrame = ({ url }) => {
    url = "https://roadtrip.wearehfc.org/roadtrip";
    return(
        <div style={{height: "100vh"}}>     
        <iframe src={url} width="100%" height="100%" frameBorder="0"></iframe>
        </div>
    );
}

export default IFrame;


