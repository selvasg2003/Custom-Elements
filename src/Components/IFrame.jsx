// create a typescript functional component with the name IFrame which renders an iframe element with the following props: url
//


import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';

const IFrame = ({ url }) => {
    url = "https://vimeo.com/1051607288/dd60d529bf";
    return(
        <div style={{height: "100vh"}}>     
        <iframe src={url} width="100%" height="100%" frameBorder="0"></iframe>
        </div>
    );
}

export default IFrame;


{/* <div style="padding:56.25% 0 0 0;position:relative;">
    <iframe src="https://player.vimeo.com/video/1051607288?h=dd60d529bf&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="HFCU_CollegeLesson_1_Video3_v3_Deliverable">
    </iframe>
    </div>
    
    <script src="https://player.vimeo.com/api/player.js"></script> 
*/}

