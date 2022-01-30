import React, { useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap';
import { signUpDoctor } from '../../services/doctorservice';
import { signUpPatient } from '../../services/patientservice';





export const DoctorSignIn = () => {
    const [name, setname] = useState("");
    const [address, setaddress] = useState("");
    const [email, setemail] = useState("");
    const [phoneCode, setphoneCode] = useState("");
    const [phoneNo, setphoneNo] = useState("");
    const [pincode, setpincode] = useState("");
    const [password, setpassword] = useState("");
    const [configPassword, setconfigPassword] = useState("");
    const [specialization, setspecialization] = useState("");
    const [latitude, setlatitude] = useState("");
    const [longitude, setlongitude] = useState("");
    let mystyle = {
        width: "500px",
        margin: "auto"
    }
    let fotter = {
        margin: "10px"
    }
    let myref = React.createRef();
    const getlocaion = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position.coords.latitude);
            setlatitude(position.coords.latitude);
            setlongitude(position.coords.longitude);
        })
    }
    const submit = (e) => {
        e.preventDefault();
        signUpDoctor({
            name: name,
            address: address,
            email: email,
            gender: myref.current.value,
            phoneCode: phoneCode,
            phoneCode: phoneCode,
            phoneNo: phoneNo,
            configPassword: configPassword,
            pincode: pincode,
            password: password,
            specialization: specialization,
            hospitalAddress:{
                coordinates:[latitude,longitude]
            }
        });
    }
    return (
        <>
            <div style={mystyle}>
                <Container fluid="xl" >
                    <Form onSubmit={submit}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={name} onChange={(e) => setname(e.target.value)} placeholder="Name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicspecialization">
                            <Form.Label>Specialization</Form.Label>
                            <Form.Control type="text" value={specialization} onChange={(e) => setspecialization(e.target.value)} placeholder="specialization" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicaddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" value={address} onChange={(e) => setaddress(e.target.value)} placeholder="Address" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" value={email} onChange={(e) => setemail(e.target.value)} placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={password} onChange={(e) => setpassword(e.target.value)} placeholder="Password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicconfigPassword">
                            <Form.Label>Config. Password</Form.Label>
                            <Form.Control type="password" value={configPassword} onChange={(e) => setconfigPassword(e.target.value)} placeholder="Config. Password" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="SelectGender">Gender</Form.Label>
                            <Form.Select ref={myref} id="disabledSelect">
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
                        <Form.Group className="mb-3" controlId="formBasiclatitude">
                            <Form.Label>latitude</Form.Label>
                            <Form.Control type="text" value={latitude} onChange={(e) => setlatitude(e.target.value)} placeholder="latitude" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasiclongitude">
                            <Form.Label>longitude</Form.Label>
                            <Form.Control type="text" value={longitude} onChange={(e) => setlongitude(e.target.value)} placeholder="longitude" />
                        </Form.Group>
                        <Button className='m-3' variant="success" onClick={()=>getlocaion()} type="button">
                            Get Location
                        </Button>
                        <Button className='m-3' variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Container>
            </div>
            <div style={fotter}>

            </div>


        </>
    )
}

// "name":"ayush yadav",
// "address":"shiv nagar colony",
// "gender":"Male",
// "phoneCode":"+91",
// "phoneNo":"8957485273",
// "pincode": 209625,
// "email":"ayush913yadav@gmail.com",
// "password":"test@1234",
// "configPassword":"test@1234",
// "specialization": "dentist"