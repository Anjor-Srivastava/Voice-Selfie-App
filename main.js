var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

function start() {
    document.getElementById("textbox").innerHTML = "";
    recognition.start();
}

recognition.onresult = function (event) {
    console.log(event);
    var content = event.results[0][0].transcript;
    document.getElementById("textbox").innerHTML = content;
    console.log(content);
    if(content == "take my selfie") {
        speak();
    }
}

function speak() {
    var synth = window.speechSynthesis;
    var speak_data = "Taking your selfie in five seconds";

    var utter_this = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utter_this);

    Webcam.attach(camera);

    setTimeout(function () {
        take_snapshot();
        save();
    }, 5000);
}

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("selfie_reasult").src = data_uri;
    });
}

function save() {
    var link = document.getElementById("link");
    link.href = document.getElementById("selfie_reasult").src;
    link.click();
}

var camera = document.getElementById("camera");
Webcam.set({
    width: 360,
    height: 250,
    image_format: 'jpeg',
    jpeg_quality: 90
});