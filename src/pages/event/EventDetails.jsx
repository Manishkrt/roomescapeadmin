import React, { useEffect, useState } from 'react'
import api from '../../api/api'
import { useParams } from 'react-router-dom';
import { Table } from 'react-bootstrap';

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
        <div className="d-flex align-items-center">
        <h4 className='text-capitalize '>Event  : </h4>
        <h5 className='text-secondary ms-2 text-capitalize '>{event?.event.title}</h5>
        </div>
        <p >event date : <span className='badge bg-danger rounded-pill'>{formatDate(event?.event.date)}</span></p>
        {/* <p>event details : {event?.event.description}</p> */}
        <div className='d-flex gap-3 '> 
            <img src={event?.event.image} className='rounded-2' alt={`event image`} width={270}/> 
        </div>
        <div>
            {/* {event?.appliedForms?.map()} */}
        </div>
        <Table responsive striped bordered hover className='mt-5'>

<thead className='text-center'>
  <tr>
    <th> Id</th>

    <th>Name</th>
    <th>phone</th>
    <th>event title</th>
    <th>Email</th>

  </tr>
</thead>
{/* <tbody className='text-center'>
  {currentData.map((vendor) => (
    <tr key={vendor.id}>
      <td>{vendor.id}</td>

      <td>{vendor.Name}</td>
      <td>{vendor.Role}</td>
      <td>{vendor.startdate}</td>
      <td>{vendor.enddate}</td>
      <td>{vendor.totaldays}</td>
      <td>{vendor.EmailId}</td>
      <td>{vendor.Phone}</td>

      <td>
        <Form>
          <Form.Check
            type="switch"
            id={`custom-switch-${vendor.id}`}
            checked={vendor.active === 'Yes'}
            readOnly
            className={vendor.active === 'Yes' ? 'switch-active' : 'switch-inactive'}
          />
        </Form>
      </td>
      <td>
        <i className="fa-regular fa-pen-to-square"></i>&nbsp;&nbsp;
        <i className="fa-solid fa-trash-can-arrow-up"></i>
      </td>
    </tr>
  ))}
</tbody> */}
</Table>
        
        </>
    )
}

export default EventDetails