import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MeetingList.css';

const MeetingList  = () => {
    const [meetings, setMeetings] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/api/get-all-meeting')
        .then(res => {
            console.log(res.data.meettings);
            setMeetings(res.data);
            console.log(meetings)
        }).catch(err => console.log(err));
    }, []);
  
    return (
        <div className="meetingList" >
            {
                meetings.length > 0 ?  meetings.map(meeting => <div className="meetingItem" key={meeting.meetingId}>
                                <h4>Tên cuộc họp: {meeting.nameMeeting}</h4>
                                <p><strong>Dự án:</strong> {meeting.nameProject}</p>
                                <p><strong>Thành phần tham gia:</strong> {meeting.usersList} </p>
                                <p> <strong>Từ : </strong> { meeting.startTime } </p>
                                <p> <strong>Đến : </strong> { meeting.endTime } </p>
                                
                        </div>     
                ) :  <h3>Không có cuộc họp nào để hiển thị</h3>
            }
        </div>
    )
}

export default MeetingList;