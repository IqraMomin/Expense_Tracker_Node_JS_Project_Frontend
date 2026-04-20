import React,{useState} from 'react'
import { Button } from 'react-bootstrap';
import { getLeaderBoard } from "../store/Slices/authSlice";
import LeadershipBoard from './LeadershipBoard';
import { useDispatch, useSelector } from 'react-redux';


function PremiumFeatures() {
    const [showBoard,setShowBoard] = useState(false);
    const isPremium = useSelector(state=>state.auth.isPremium);
    const dispatch = useDispatch();

    
    const leaderBoardHandler = ()=>{
        setShowBoard(prev=>!prev);
        if(!showBoard){
            dispatch(getLeaderBoard());
        }
        

    }

    return (
        <div>
           {isPremium && <Button onClick={leaderBoardHandler}>{!showBoard ? "Show Leadership" : "Hide LeaderShip Board"}</Button>}
            {showBoard && <LeadershipBoard/>}
        </div>
    )
}

export default PremiumFeatures
