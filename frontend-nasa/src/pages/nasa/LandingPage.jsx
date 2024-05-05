import React, { useState, useEffect } from 'react';
import { Row, Col, Typography } from 'antd';
import { api_key } from '../../utils/Constants';
import axios from 'axios';
import Loader from '../../components/Loader';
const { Title, Paragraph, Text } = Typography;

export default function LandingPage() {
    const [apodData, setApodData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Check if data is cached
                const cachedData = localStorage.getItem('apodData');
                if (cachedData) {
                    setApodData(JSON.parse(cachedData));
                    setLoading(false);
                    return;
                }

                // Make request only if not cached
                const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${api_key}`);
                setApodData(response.data);
                setLoading(false);

                // Cache the response
                localStorage.setItem('apodData', JSON.stringify(response.data));
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div><Loader /></div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!apodData) return null;

    return (
        <div>
            <Row gutter={16}>
                <Col xs={24} sm={12}>
                    <img src={apodData.hdurl} alt={apodData.title} style={{ maxWidth: '75%' }} />
                            <Text type="secondary">©{apodData?.copyright}</Text>
                </Col>
                <Col xs={24} sm={12}>
                    <div style={{ padding: '0 24px' }}>
                        <Title level={2}>{apodData.title}</Title>
                        <Paragraph>
                            {apodData.explanation}
                        </Paragraph>
                        <Text type="secondary">Date: {apodData.date}</Text>
                    </div>
                </Col>
            </Row>
        </div>
    );
}
