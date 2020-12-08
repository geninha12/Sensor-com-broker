console.log("aplication start");

var mqtt;
var host="test.mosquitto.org";
var port=8081;
		
function onFailure(message) {
    console.log("Connection Attempt to Host "+host+"Failed");
    //setTimeout(MQTTconnect, reconnectTimeout);
}
function onMessageArrived(msg){
    out_msg="Message received "+msg.payloadString+"<br>";
    out_msg=out_msg+"Message received Topic "+msg.destinationName;
    console.log(out_msg);
    var ponteiro = document.getElementById("ponteiro");

    ponteiro.style.transform = "rotate("+msg.payloadString+"deg)";

}

function onConnect() {
// Once a connection has been made, make a subscription and send a message.

    console.log("Connected ");
    mqtt.subscribe("test");
    message = new Paho.MQTT.Message("Hello World");
    message.destinationName = "test";
    mqtt.send(message);
}

function MQTTconnect() {
    console.log("connecting to "+ host +" "+ port);
    mqtt = new Paho.MQTT.Client(host,port,"clientjs");
    console.log("Erro?");
    //document.write("connecting to "+ host);
    var options = {
        timeout: 3,
        onSuccess: onConnect,
        onFailure: onFailure,
    };
    mqtt.onMessageArrived = onMessageArrived;
    
    mqtt.connect(options); //connect
}

MQTTconnect();