import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth';
import ResultTable from '../Components/ResultTable';
import Graph from '../Components/Graph';
import UserInfo from '../Components/UserInfo';
import { useTheme } from '../Context/ThemeContext';
import { CircularProgress } from '@material-ui/core';

const UserPage = () => {

    const [data, setData] = useState([]);
    const [graphData, setGraphData] = useState([]); 
    const [dataLoading, setDataLoading] = useState(true);
    const [user, loading] = useAuthState(auth);

    const {theme} = useTheme();

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
            setDataLoading(false);
        });
    }

    useEffect(()=>{
        if(!loading && user){
            fetchUserData();
        }    
    },[loading]);

    if(!loading && !user){
        return (<div className='center-of-screen'>
            <span>Login to view user page!</span>
        </div>)
    }

    if(loading || dataLoading){
        return (<div className='center-of-screen'>
                    <CircularProgress size={300} color={theme.title}/>
             </div>);
    }
    

  return (
    <div className='canvas'>
        <UserInfo totalTestTaken={data.length}/>
        <div className="graph">
            <Graph graphData={graphData} type='date'/>
        </div>
        <ResultTable data={data}/>
    </div>
  )
}

export default UserPage