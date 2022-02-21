import React, { useEffect, useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap';
import { updatePatient } from '../../../services/patientservice';

export const EditPProfile = () => {
    const [name, setname] = useState("");
    const [address, setaddress] = useState("");
    const [email, setemail] = useState("");
    const [phoneCode, setphoneCode] = useState("");
    const [phoneNo, setphoneNo] = useState("");
    const [pincode, setpincode] = useState("");
    const [gender, setgender] = useState("");
    let mystyle = {
        width: "500px",
        margin: "auto"
    }
    let fotter = {
        margin: "10px"
    }
    let myref = React.createRef();

    const submit = (e) => {
        e.preventDefault();
        const info = {
            name:name,
            address:address,
            email:email,
            phoneCode:phoneCode,
            phoneCode:phoneCode,
            phoneNo:phoneNo,
            pincode:pincode,
        }
        if(!(myref.current.value === 'Male' || myref.current.value === 'Female' || myref.current.value === 'Other')){
            alert("please provide gender");
            return;
        }
        info.gender = myref.current.value;
        updatePatient(info);
    }

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('data'));
        setname(data.name);
        setemail(data.email);
        setaddress(data.address);
        setphoneCode(data.phoneCode);
        setphoneNo(data.phoneNo);
        setpincode(data.pincode);
        myref.current.value = data.gender;
        
        
        // if (data.profilePic && data.profilePic.data) {
        //     var base64Flag = 'data:image/jpeg;base64,';
        //     var imageStr = arrayBufferToBase64(data.profilePic.data);
        //     setprofilePic(base64Flag + imageStr);
        // }


        

    }, []);
    return (
        <>
            <div style={mystyle}>
                <Container fluid="xl" >
                    <Form onSubmit={submit}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={name} onChange={(e) => setname(e.target.value)} placeholder="Name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicaddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" value={address} onChange={(e) => setaddress(e.target.value)} placeholder="Address" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" value={email} onChange={(e) => setemail(e.target.value)} placeholder="Enter email" />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="SelectGender">Gender</Form.Label>
                            <Form.Select  ref={myref} id="disabledSelect">
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicphoneCode">
                            <Form.Label>phoneCode</Form.Label>
                            <Form.Control type="text" value={phoneCode} onChange={(e) => setphoneCode(e.target.value)} placeholder="phoneCode" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicphoneNo">
                            <Form.Label>phoneNo</Form.Label>
                            <Form.Control type="text" value={phoneNo} onChange={(e) => setphoneNo(e.target.value)} placeholder="phoneNo" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicpincode">
                            <Form.Label>pincode</Form.Label>
                            <Form.Control type="text" value={pincode} onChange={(e) => setpincode(e.target.value)} placeholder="pincode" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Save
                        </Button>
                    </Form>
                </Container>
            </div>
            <div style={fotter}>

            </div>


        </>
    )
}
