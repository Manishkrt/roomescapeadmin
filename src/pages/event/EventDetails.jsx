import React, { useEffect, useState } from 'react'
import api from '../../api/api'
import { useParams } from 'react-router-dom';

const initialValue = {
    event: {},
    appliedForms: [],
    totalApplied: 0,
    totalPages: 1,
    currentPage: 1,
}
const EventDetails = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(initialValue)

    const fetchEventFunc = async()=>{
        try {
            const response = await api.get(`/event/with-form-applied/${eventId}`)
            // console.log("response event with applied", response);
            if(response.status == 200){
                setEvent(response.data)
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }
    useEffect(()=>{
        fetchEventFunc()
    }, [])

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    };
    return (
        <>
        <h2 className='text-capitalize'>Event  : {event?.event.titel}</h2>
        <p>event date : {formatDate(event?.event.date)}</p>
        <p>event details : {event?.event.description}</p>
        <div className='d-flex gap-3 '> 
            <img src={event?.event.image} alt={`event image`} width={270}/> 
        </div>
        <div>
            {/* {event?.appliedForms?.map()} */}
        </div>

        
        </>
    )
}

export default EventDetails