let switches = [false, false, false];
let switchCombos = [
  {switches: [false, false, false], gif: "/assets/img/modal graphics/newGraphic001/static.gif", tracks: ["track1-1.mp3", "track1-2.mp3", "track1-3.mp3"]},
  {switches: [false, false, true], gif: "/assets/img/modal graphics/newGraphic001/dynChand.gif", tracks: ["track2-1.mp3", "track2-2.mp3", "track2-3.mp3"]},
  {switches: [false, true, false], gif: "/assets/img/modal graphics/newGraphic001/dynFig.gif", tracks: ["track3-1.mp3", "track3-2.mp3", "track3-3.mp3"]},
  {switches: [false, true, true], gif: "/assets/img/modal graphics/newGraphic001/dynFigChand.gif", tracks: ["track4-1.mp3", "track4-2.mp3", "track4-3.mp3"]},
  {switches: [true, false, false], gif: "/assets/img/modal graphics/newGraphic001/dynCand.gif", tracks: ["track5-1.mp3", "track5-2.mp3", "track5-3.mp3"]},
  {switches: [true, false, true], gif: "/assets/img/modal graphics/newGraphic001/dynCandChand.gif", tracks: ["track6-1.mp3", "track6-2.mp3", "track6-3.mp3"]},
  {switches: [true, true, false], gif: "/assets/img/modal graphics/newGraphic001/dynCandFig.gif", tracks: ["track7-1.mp3", "track7-2.mp3", "track7-3.mp3"]},
  {switches: [true, true, true], gif: "/assets/img/modal graphics/newGraphic001/allOn.gif", tracks: ["track8-1.mp3", "track8-2.mp3", "track8-3.mp3"]}
];

let audioChannels = [
  document.getElementById("channel1"),
  document.getElementById("channel2"),
  document.getElementById("channel3")
];
let constantChannel = document.getElementById("constant");

function toggleSwitch(switchNumber) {
  switches[switchNumber-1] = !switches[switchNumber-1];
  let combo = switchCombos.find(c => c.switches[0] == switches[0] && c.switches[1] == switches[1] && c.switches[2] == switches[2]);
  let gif = document.getElementById("animated-gif");
  gif.src = combo.gif;
  let audioTracks = combo.tracks;
  for (let i = 0; i < audioChannels.length; i++) {
    let audio = audioChannels[i];
    if (switches[i]) {
      audio.src = audioTracks[i];
      audio.play();
      audio.classList.add("audio-on");
    } else {
      audio.pause();
      audio.currentTime = 0;
      audio.classList.remove("audio-on");
    }
  }
  if (switches.every(s => s)) {
    constantChannel.play();
  } else {
    constantChannel.pause();
    constantChannel.currentTime = 0;
  }
}

document.addEventListener("DOMContentLoaded", function() {
  let areas = document.getElementsByTagName("area");
  for (let i = 0; i < areas.length; i++) {
    areas[i].addEventListener("click", function() {
      toggleSwitch(i+1);
      this.classList.toggle("area-on");
    });
  }
});