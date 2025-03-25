import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/api'

const BlockGameList = () => {
    const [blockeGames, setBlockGames] = useState([])

    const fetchGames = async()=>{
        try {
            const response = await api.get("/block-games");
            console.log("response response", response.data);
            
            if(response.status == 200){
                setBlockGames(response.data)
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
    };

    useEffect(()=>{
        fetchGames()
    }, [])

    // const response = await api.post("/block-games/add", payload);
    return (
        <div className="container box-shadow-common p-3">
            <div className="d-flex justify-content-between flex-wrap box-shadow-common-strip p-3 mb-3">
                <h5>Blocked Game with Date List</h5>
                <Link
                    to={'/add-block-game'}

                    className="text-white d-inline-block mb-0 d-flex align-items-center justify-content-center px-3 bg-escape text-decoration-none rounded-2"
                >
                    <i className="fa-solid fa-chess-board"></i> &nbsp;
                    Add New Game
                </Link>
            </div>

            <div className="table-responsive">
                <table className="table table-hover table-bordered text-center">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Game Name</th>
                            <th>Reason</th> 
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>


                        {blockeGames.length > 0 ? (
                            blockeGames.map((value) => (
                                <tr key={value._id}>
                                     
                                    <td className="text-capitalize">{formatDate(value.date)}</td>
                                    <td className='text-start'>
                                        {value?.game.map((game)=>(
                                            <li key={game._id} className='text-capitalize'>{game.name}</li>
                                        ))}
                                    </td>
                                     
                                    <td>{value.reason}</td>
                                    <td>
                                        <div className="card-footer d-flex gap-2">
                                            <button
                                                className="btn btn-outline-primary btn-sm"
                                                onClick={() => handleEdit(value._id)}
                                            >
                                                <i className="fas fa-edit me-1"></i>
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={() => handleDelete(value._id)}
                                            >
                                                <i className="fas fa-trash-alt me-1"></i>
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className="text-center">
                                <td colSpan={6}> Oops, there is no data </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
        </div>
    )
}

export default BlockGameList