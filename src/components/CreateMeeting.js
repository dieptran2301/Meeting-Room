import React, { useState, useEffect } from 'react';
import './CreateMeeting.css';
import { TextField, Select, MenuItem, FormControl, InputLabel, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import 'react-datetime/css/react-datetime.css';
import DateTimePicker from 'react-datetime-picker';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 190,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const CreateMeeting = () => {
  const classes = useStyles();
  const [project, setProject] = useState([]);
  const [joiner, setJoiner] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [user, setUser] = useState([]);
  const [startDate, setStartDate] = useState( new Date() );
  const [endDate, setEndDate] = useState(new Date());
  const [name, setName] = useState('');
  useEffect(() => {
    axios.get('http://localhost:8080/api/firt-get')
    .then(res => {
      console.log(res.data);
      setProject(res.data.projects);
      setJoiner(res.data.users);
    }).catch(err => console.log(err));
  }, []);
  const onCreateMeeting = (e) => {
    e.preventDefault();
    const newMeeting = {
      meetingName : name,
      projectID : projectName,
      userId : user,
      startTime : startDate,
      endTime : endDate
    }
    axios.post('http://localhost:8080/api/save-meeting', newMeeting,
     {
      headers : {
        "Content-Type" : "application/json"
      }
     }).then(res => {
      
       console.log(res.data.users);
       alert('Tham gia buổi họp thành công');
       setName('');
       setStartDate(new Date());
       setEndDate(new Date());
       console.log(startDate);
       console.log(endDate);
      setProjectName('');
      setUser('');
      window.location.reload();
     }).catch(err => console.log(err));
  }
  const onCancel = () => {
    setName('');
    setStartDate(new Date());
    setEndDate(new Date());
    setProjectName('');
    setUser('');
  }
  
  return (
    <div className="createMeeting">
      <h2 className="title">Tạo cuộc họp</h2>
      <form onSubmit={onCreateMeeting} >
        <div className="form-group" >
          <label>
            Tên cuộc họp
          </label>
          <TextField label="Tên cuộc họp" value={name} onChange={e => setName(e.target.value)} />
          
        </div>
        <div className="form-group" >
          <label>
            Dự án
          </label>
          <FormControl className={classes.formControl}>
            <InputLabel id="project">-- Chọn dự án --</InputLabel>
            <Select
              labelId="project"
              value={projectName}
              onChange={e => setProjectName(e.target.value)}
            >
              {
                project.length > 0 && project.map(p => <MenuItem key={p.projectId} value={p.projectId}>
                  {p.projectName} </MenuItem> )
              }
            </Select>
          </FormControl>
        </div>
        <div className="form-group" >
          <label>
            Thành phần tham gia
          </label>
          <FormControl className={classes.formControl}>
            <InputLabel id="joiner">--Thành phần tham gia--</InputLabel>
            <Select
            
            multiple
              labelId="joiner"
              value={user}
              onChange={e => setUser(e.target.value)}
            >
               {
                joiner.length > 0 && joiner.map(j => <MenuItem key={j.userId} value={j.userId}>
                  {j.fullName} </MenuItem> )
              }
            </Select>
          </FormControl>
        </div>
        <div className="form-group" >
          <label>
            Thời gian bắt đầu
          </label>
          <DateTimePicker
          onChange={date => setStartDate(date)}
          value={startDate}
        />
        </div>
        <div className="form-group" >
          <label>
            Thời gian kết thúc
          </label>
          <DateTimePicker
          onChange={date => setEndDate(date)}
          value={endDate}
        />
        </div>
        <Button className="btn" type="submit" variant="contained" color="primary">
          Save
        </Button>
        <Button onClick={onCancel} className="btn" variant="contained" color="secondary">
          Cancel
        </Button>
      </form>
    </div>
  );
}

export default CreateMeeting;