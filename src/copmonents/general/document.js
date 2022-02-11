import React, { useState, useEffect } from 'react'
import { Form, Container, Nav, Navbar, Card } from 'react-bootstrap';
import { useNavigate, Link, useParams } from "react-router-dom";
import { arrayBufferToBase64 } from '../../services/genralservice';
import { getDocument } from '../../services/patientservice';

export const Document = (props) => {
    const params = useParams();
    const [documents, setdocuments] = useState([]);

    const setdocument = (data) => {
        if (data.length) {
            data.forEach(e => {
                if (e.document) {
                    var base64Flag = 'data:image/jpeg;base64,';
                    var imageStr = arrayBufferToBase64(e.document.data);
                    e.document = base64Flag + imageStr;
                }
            });
        } else {
            if (data.document) {
                var base64Flag = 'data:image/jpeg;base64,';
                var imageStr = arrayBufferToBase64(data.document.data);
                data.document = base64Flag + imageStr;
            }
        }
        setdocuments(data);
    }
    const fetchdocument = async () => {
        try {
            console.log("called");
            const document = await getDocument();
            console.log(document);
            setdocument(document.data.document);
            
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(async () => {
        await fetchdocument();
    }, [params])


    return (
        <>
            <Container>
                {documents.map(e => (
                    <Container className='p-0'>
                        <Card style={{ width: "100%" }}>
                            <Card.Img variant="top" src={e.document} />
                            <Card.Body>

                                <Card.Title>
                                    {e.name}
                                </Card.Title>

                            </Card.Body>
                        </Card>
                    </Container>
                )
                )}

            </Container>
        </>
    )
}
