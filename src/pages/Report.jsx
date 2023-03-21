import React from 'react';
import { useEffect } from 'react';
import axios from "../axios";
import { auth } from '../firebase/config';

const Report = () => {
  const getMyResult = async () => {
    try {
      const res = await axios.post("/jobs/",{

          "title": "yash",
          "text": "barman",
          "job": 1,
          "profile_id": auth.currentUser.uid,
          "time_stamp":1000000000,
          "user":1
    });
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getMyResult();
  },[]);
  return (
    <div>
      Report
    </div>
  )
}

export default Report
