import React from 'react';

import { Firstpage } from "../copmonents/website/firstpage"

import {
    Routes,
    Route
} from "react-router-dom";
import { PatientSignIn } from '../copmonents/patient/signIn';
import { PatientLogIn } from '../copmonents/patient/login';
import { DoctorSignIn } from '../copmonents/doctor/signIn';
import { DoctorLogIn } from '../copmonents/doctor/login';
import { Notfound } from '../notfound';
import { Wauth } from '../copmonents/wauth';


export const AppRouter = () => {

    return (
        <main>
            <Firstpage />
            <Routes>
                <Route path="patient" element={<Wauth who='Patient' />}>
                    <Route path="signup" element={<PatientSignIn />} />
                    <Route path="login" element={<PatientLogIn />} />
                </Route>
                <Route path="doctor" element={<Wauth who='Doctor' />}>
                    <Route exact path="signup" element={<DoctorSignIn />} />
                    <Route exact path="login" element={<DoctorLogIn />} />
                </Route>

                <Route path='*' element={<Notfound />}></Route>
            </Routes>
        </main>
    )
}