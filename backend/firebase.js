const firebaseTokenModel = require('./models/firebasetoken');

var FCM = require('fcm-node');
var serverKey = 'AAAAx5b9Vc8:APA91bHGCpfOsBBZOYm-O-eQ4H7Gfam2HsFzcE0dRzI_mRoNSnIoIS2e38WA2U-J2-0D2h3ZKKuQ9wvRTQKFBEe_rkDCHtBMmlgQFRmqJEwz1cfjT-JfkqV6qR67SIEsA2PkX-UZfQtq';
var fcm = new FCM(serverKey);

var message = {
    to: 'ctknaTE7xwYfANPLzz4M3Z:APA91bHBjdgeSw2icuNMTsSynCiMxym8FvEmWlb3_A-F_aamXPlqNroof-1gQDV7EoDU0Csfhd60jFNnHIs9yGja6HxHoUcd_ZytEqPXfUJZfy6gJYfNbfSokQrhwNKhTqRRZsg-gg-q',
    
    notification: {
        title: 'NotifcatioTestAPP',
        body: '{"Message from node js app"}',
    },

    data: { //you can send only notification or only data(or include both)
        title: 'ok cdfsdsdfsd',
        body: '{"name" : "okg ooggle ogrlrl","product_id" : "123","final_price" : "0.00035"}'
    }
};

fcm.send(message, function (err, response) {
    if (err) {
        console.log("Something has gone wrong!" + err);
    } else {
        // showToast("Successfully sent with response");
        console.log("Successfully sent with response: ", response);
    }
});
// exports.sendMessage = async (message,id) => {

//     //HINTS for passing message and id.
//     //id is supposed to be of type object { "patient": patientId} or {"doctor": doctorId}
//     //and message is supposed of the type given above without to field.

//     const tokens = await firebaseTokenModel.find(id);
//     for(i = 0;i<tokens.length;i++){
//         message.to = tokens[0].firebasetoken;
//         console.log(message);
//         fcm.send(message, function (err, response) {
//             if (err) {
//                 console.log("Something has gone wrong!" + err);
//             } else {
//                 // showToast("Successfully sent with response");
//                 console.log("Successfully sent with response: ", response);
//             }
//         });
//     }
    
// }