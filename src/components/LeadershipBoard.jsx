import React from 'react'
import { useSelector } from 'react-redux'

function LeadershipBoard() {
    const leaderBoard = useSelector(state=>state.auth.leaderBoard);
    return (

       <ul>
        {leaderBoard?.map(ele=>{
            return <li key={ele.UserId}>
                <p>{ele.User.name}</p>
                <p>{ele.totalExpense}</p>
            </li>
        })}

       </ul>
    )
}

export default LeadershipBoard
