import React, { useState } from 'react';
import { DatePicker, Button, Spin, message, InputNumber } from 'antd';
import axios from 'axios';
import { api_key } from '../../utils/Constants';

const { RangePicker } = DatePicker;

const Earth = () => {
  const [date, setDate] = useState(null);
  const [latitude, setLatitude] = useState(29.78);
  const [longitude, setLongitude] = useState(-95.33);
  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState('');

  const handleDateChange = (date) => {
    setDate(date ? date.format('YYYY-MM-DD') : null);
  };

  const fetchImage = () => {
    if (!date) {
      message.error('Please select a date.');
      return;
    }

    setLoading(true);
    axios
      .get(`https://api.nasa.gov/planetary/earth/imagery?lon=${longitude}&lat=${latitude}&date=${date}&dim=0.15&api_key=${api_key}`)
      .then((response) => {
        setImageURL(`https://api.nasa.gov/planetary/earth/imagery?lon=${longitude}&lat=${latitude}&date=${date}&dim=0.15&api_key=${api_key}`);
      })
      .catch((error) => {
        message.error('Failed to fetch image.');
        console.error('Error fetching image:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <span>Latitude: </span>
        <InputNumber value={latitude} onChange={setLatitude} />
        <span style={{ marginLeft: 16 }}>Longitude: </span>
        <InputNumber value={longitude} onChange={setLongitude} />
      </div>
      <DatePicker onChange={handleDateChange} />
      <Button type="primary" onClick={fetchImage} style={{ marginLeft: 16 }}>
        Fetch Image
      </Button>
      {loading && <Spin style={{ marginLeft: 16 }} />}
      {imageURL && (
        <div style={{ marginTop: 16 }}>
          <img src={imageURL} alt="NASA Earth Imagery" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
};

export default Earth;
