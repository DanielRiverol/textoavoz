const textarea = document.querySelector("textarea"),
  speechBtn = document.querySelector("button"),
  voiceList = document.querySelector("select");

let synth = speechSynthesis;

function voices() {
  for (const voice of synth.getVoices()) {
    let selected = voice.name === "Google UK English Male" ? "selected" : "";
    let option = ` <option value="${voice.name}"${selected}>${voice.name} (${voice.lang})</option>`;
    voiceList.insertAdjacentHTML("beforeend", option);
  }
}
synth.addEventListener("voiceschanged", voices);
function textToSpeech(text) {
  let utternance = new SpeechSynthesisUtterance(text);
  for (const voice of synth.getVoices()) {
    if (voice.name === voiceList.value) {
      utternance.voice = voice;
    }
  }

  synth.speak(utternance);
}

speechBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (textarea.value !== "") {
    textToSpeech(textarea.value);
  } else {
    textarea.value = "Insert text";
  }
});
