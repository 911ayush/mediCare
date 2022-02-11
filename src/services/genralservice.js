import { alignPropType } from "react-bootstrap/esm/types";

export const getimg = (profilePic) => {
    console.log(profilePic.data);
    const arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };
    var base64Flag = 'data:image/jpeg;base64,';
    var imageStr = arrayBufferToBase64(profilePic.data);
    return base64Flag + imageStr;
}

export const arrayBufferToBase64 = (buffer) => {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
};