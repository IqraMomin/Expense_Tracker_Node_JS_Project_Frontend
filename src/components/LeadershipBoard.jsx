import React from 'react'
import { Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux'

function LeadershipBoard() {
    const leaderBoard = useSelector(state => state.auth.leaderBoard);
    const isPremium = useSelector(state => state.auth.isPremium);

    return (
        <Row>
            <div className='d-flex justify-content-center align-items-center my-4'>
                <h4 className='text-center'>Leadership Board</h4>
            </div>
            {isPremium && <Table striped border="0">

                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Total Expenses</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderBoard?.map(ele => {
                        return <tr key={ele.id}>
                            <td>{ele.name}</td>
                            <td>{ele.totalExpense}</td>
                        </tr>
                    })}
                </tbody>



            </Table>}
            {!isPremium && <p>Please buy Premium Membership to see Leadershipboard</p>}
        </Row>
    )
}

export default LeadershipBoard
