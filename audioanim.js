// ===============================
// 1. Loading Audio & Set up
// ===============================

let song;       // the audio track
let playBtn;    // play/pause button

// -------------------------------
// 1. Preload audio
// -------------------------------
function preloadAudio() {
  song = loadSound('MatadorOle.mp3'); // load  audio
}

// -------------------------------
// 2. Setup audio & button
// -------------------------------
function setupAudio() {
  playBtn = createButton('play');
  playBtn.style('background', 'rgba(255,255,255,0.8)');
  playBtn.style('border', 'none');
  playBtn.style('border-radius', '8px');
  playBtn.style('color', 'rgba(83, 89, 197, 1)')
  playBtn.style('padding', '10px 20px');
  playBtn.style('font-size', '15px');
  playBtn.style('cursor', 'pointer'); //button styling

    playBtn.mouseOver(() => playBtn.style('background', 'rgba(255,255,255,1)'));
    playBtn.mouseOut(() => playBtn.style('background', 'rgba(255,255,255,0.8)')); // button hover styling

  playBtn.mousePressed(toggleSong);

  // Initial button positioning
  positionAudioButton();
}

// -------------------------------
// 3. Button Positioning
// -------------------------------
function positionAudioButton() {
  if (!bullImg) return;

  let scaleFactor = min(width / bullImg.width, height / bullImg.height) * 0.8;
  let patternWidth = bullImg.width * scaleFactor;
  let patternHeight = bullImg.height * scaleFactor;
  let startX = (width - patternWidth) / 2;
  let startY = (height - patternHeight) / 2;

  // Center button under bull
  let btnX = startX + patternWidth / 2 - playBtn.width / 2;
  let btnY = startY + patternHeight + 20;
  playBtn.position(btnX, btnY);
}

// -------------------------------
// 4. Handle window resize
// -------------------------------
function windowResizedAudio() {
  positionAudioButton();
}

// -------------------------------
// 5. Toggle play/pause
// -------------------------------
function toggleSong() {
  if (!song) return;

  if (song.isPlaying()) {
    song.pause();
    playBtn.html('play');
  } else {
    song.play();
    playBtn.html('pause');
  }
}

