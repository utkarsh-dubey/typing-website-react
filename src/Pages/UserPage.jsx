import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth';
import { CircularProgress, LinearProgress } from '@mui/material';
import ResultTable from '../Components/ResultTable';
import Graph from '../Components/Graph';

const UserPage = () => {

    const [data, setData] = useState([]);
    const [graphData, setGraphData] = useState([]); 
    const [user, loading] = useAuthState(auth);

    const fetchUserData = ()=>{
        const resultsRef = db.collection('Results');
        const {uid} = auth.currentUser;
        let tempData = [];
        let tempGraphData = []
        resultsRef.where('userID','==',uid).orderBy('timeStamp','desc').get().then((snapshot)=>{
            snapshot.docs.forEach((doc)=>{
                console.log("working");
                tempData.push({...doc.data()});
                tempGraphData.push([doc.data().timeStamp, doc.data().wpm]);
            });
            console.log(tempData);
            setData(tempData);
            setGraphData(tempGraphData.reverse());
        });
    }

    useEffect(()=>{
        if(!loading){
            fetchUserData();
        }    
    },[loading]);

    if(loading){
        return <CircularProgress size={300}/>;
    }
    

  return (
    <div>
        <ResultTable data={data}/>
        <Graph graphData={graphData} type='date'/>
    </div>
  )
}

export default UserPage