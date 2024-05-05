import { Col, Image, Row } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { api_key } from '../../utils/Constants';
import Loader from '../../components/Loader';

function MarsRoverPhotos() {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Check if data is cached
                const cachedData = localStorage.getItem('marsRoverPhotosData');
                if (cachedData) {
                    setPhotos(JSON.parse(cachedData));
                    setLoading(false);
                    return;
                }

                // Make request only if not cached
                const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${api_key}`);
                setPhotos(response.data.photos);
                setLoading(false);

                // Cache the response
                localStorage.setItem('marsRoverPhotosData', JSON.stringify(response.data.photos));
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {loading ? (
                <Loader />
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : (
                <Row gutter={16}>
                    {photos.map(photo => (
                        <Col key={photo.id} xs={24} sm={6}>
                            <Image src={photo.img_src} alt={`Mars Rover Photo ${photo.id}`} />
                            <p>Earth Date: {photo.earth_date}</p>
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
}

export default MarsRoverPhotos;
