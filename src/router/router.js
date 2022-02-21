import React from 'react';

import { Firstpage } from "../copmonents/website/firstpage"

import {
    Routes,
    Route,
    Prompt
} from "react-router-dom";
import { PatientSignIn } from '../copmonents/patient/signIn';
import { PatientLogIn } from '../copmonents/patient/login';
import { DoctorSignIn } from '../copmonents/doctor/signIn';
import { DoctorLogIn } from '../copmonents/doctor/login';
import { Notfound } from '../notfound';
import { Wauth } from '../copmonents/wauth';
import { PatientPage } from '../copmonents/patient/Pview/ppage';
import { PatientProfile } from '../copmonents/patient/Pview/profile';
import { PatientAppointment } from '../copmonents/patient/Pview/pappointment';
import { PFindDoc } from '../copmonents/patient/Pview/finddoc';
import { Appointment } from '../copmonents/patient/appointment';
import { Document } from '../copmonents/general/document';
import { PDoc } from '../copmonents/patient/Pview/Pdoc';
import { Gmessaging } from '../copmonents/message/messagin';



import { DoctorPage } from '../copmonents/doctor/Dvieww/dpage';
import { DoctorProfile } from '../copmonents/doctor/Dvieww/profile';
import { DoctorAppointment } from '../copmonents/doctor/Dvieww/dappointment';
import { Messenger } from './../copmonents/messenger/Messenger';
import { Videocall } from '../copmonents/video/video';
import { UploadDocument } from '../copmonents/general/uploadDocument';
import { PMakeappointment } from '../copmonents/patient/Pview/makeAppoinment';
import { EditPProfile } from '../copmonents/patient/Pview/editProfile';
import { VideocallPage } from '../copmonents/video/videocallPage';


export const AppRouter = () => {

    return (
        <main>
            <Routes>
                <Route exact path="/" element={<Firstpage />}></Route>


                <Route path="patients" element={<Wauth who='Patient' />}>
                    <Route path="signup" element={<PatientSignIn />} />
                    <Route path="login" element={<PatientLogIn />} />
                </Route>

                <Route path="doctors" element={<Wauth who='Doctor' />}>
                    <Route path="signup" element={<DoctorSignIn />} />
                    <Route path="login" element={<DoctorLogIn />} />
                </Route>


                <Route path="patient" element={<PatientPage />}>
                    <Route exact path="profile" element={<PatientProfile />} />
                    <Route path="profile/edit" element={<EditPProfile />} />
                    <Route path="appointments" element={<PatientAppointment />} >
                    <Route path="create-appointment/:doctorid" element={<PMakeappointment />} />
                        <Route path=":appointmentid" element={<Appointment />} >
                            <Route path="document" element={<Document all="false"/>} />
                            <Route path="alldocument" element={<Document all="true"/>} />
                            <Route path="upload-document" element={<UploadDocument />} />
                        </Route>
                    </Route>

                    <Route path="find-doctor" element={<PFindDoc />} >
                        <Route path=":id" element={<PDoc />} />
                    </Route>

                    <Route path="messenger" element={<Messenger />} >

                    </Route>
                    <Route path="messenger/:id" element={<Gmessaging />} >
                    </Route>
                    
                </Route>

                <Route path="doctor" element={<DoctorPage />}>
                    <Route path="profile" element={<DoctorProfile />} />
                    <Route path="appointments" element={<DoctorAppointment />} />
                    <Route path="messenger" element={<Messenger />}>
                        <Route path=":id" element={<Gmessaging />} />
                    </Route>
                </Route>
                <Route path="messenger/:id" element={<Gmessaging />} >
                </Route>
                <Route path="video-call/:id" element={<VideocallPage />} />


                <Route path='*' element={<Notfound />}></Route>
            </Routes>
        </main>
    )
}