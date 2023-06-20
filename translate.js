// User-dependent variables
var languages = ['ja-JP', 'en-US']; // Languages array
var key = "{YOUR AZURE TRANSLATE RESOURCE API KEY}"; // Add your key
var endpoint = "https://api.cognitive.microsofttranslator.com"; // Endpoint URL
var region = "{YOUR AZURE TRANSLATE RESOURCE API REGION}"; // location, also known as region.
var path = '/translate'; // Path for the translation API

// Create a new SpeechRecognition object
var recognition = new webkitSpeechRecognition();
var languageIndex = 0; // Start with English

var divIndex = 1;

recognition.lang = languages[languageIndex]; // Set initial language
recognition.interimResults = true; // We want interim results

recognition.onresult = function(event) {
    var transcriptDiv = document.getElementById('transcript' + divIndex);
    var translationDiv = document.getElementById('translation' + divIndex);
    transcriptDiv.innerHTML = ''; 
    translationDiv.innerHTML = '';
    // remove the fade class when new recognition is started
    transcriptDiv.classList.remove('fade');
    translationDiv.classList.remove('fade');
    for (var i = event.resultIndex; i < event.results.length; ++i) {
        let transcript = event.results[i][0].transcript;
        transcriptDiv.innerHTML += transcript; // Add new transcript
        // Send transcript for translation only if result is final
        if (event.results[i].isFinal) {
            sendForTranslation(transcript);
        }
    }
};

recognition.onerror = function(event) {
    console.log('Error occurred in recognition: ' + event.error);
};

// Add this to restart recognition when it ends
recognition.onend = function() {
    recognition.start();
};

recognition.start(); // Start recognizing

// Function to send text for translation
function sendForTranslation(text) {
    var xhr = new XMLHttpRequest();
    var toLanguage = languages[(languageIndex + 1) % languages.length].split('-')[0]; // Get the other language code
    xhr.open("POST", endpoint + path + '?api-version=3.0&from=' + recognition.lang.split('-')[0] + '&to=' + toLanguage, true);
    xhr.setRequestHeader("Ocp-Apim-Subscription-Key", key);
    xhr.setRequestHeader("Ocp-Apim-Subscription-Region", region);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("X-ClientTraceId", generateUUID());
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            var translation = response[0].translations[0].text;
            var translationDiv = document.getElementById('translation' + divIndex);
            var transcriptDiv = document.getElementById('transcript' + divIndex);
            translationDiv.innerHTML = translation;
            divIndex = divIndex === 1 ? 2 : 1;
    
            // add the fade class 2 seconds after the translation has been shown
            setTimeout(function() {
                translationDiv.classList.add('fade');
                transcriptDiv.classList.add('fade');
            }, 3000);
        }
    };
    var body = '[{"text": "' + text + '"}]';
    xhr.send(body);
}

document.onkeydown = function(e) {
    if (e.key === 'l' || e.key === 'L') { // If 'L' key is pressed
        languageIndex = (languageIndex + 1) % languages.length; // Cycle through languages
        recognition.lang = languages[languageIndex]; // Change language

        // Show and then hide the message
        var messageDiv = document.getElementById('message');
        messageDiv.innerHTML = 'Now parsing ' + (languages[languageIndex] === 'en-US' ? 'English' : 'Japanese');
        messageDiv.style.display = 'block';
        setTimeout(function() {
            messageDiv.style.display = 'none';
        }, 3000);
    }
};

// Generate a UUID for the X-ClientTraceId header
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
