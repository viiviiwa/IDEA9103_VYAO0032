// =====================================
// 1. Animation Parameters
// =====================================

function assignAnimationParams() {
  for (let seg of bgSegments) {
    seg.rate = random(0.01, 0.03);   // rate
    seg.amp = random(0.2, 0.5);      // amplitude/how big the change is
    seg.phase = random(TWO_PI);      // where the shape starts in its cycle
  }
  for (let seg of bullSegments) {
    seg.rate = random(0.02, 0.06);  
    seg.amp = random(0.3, 0.7);      
    seg.phase = random(TWO_PI);
  }
}
// =====================================
// 2. Background Pattern
// =====================================

function drawBgPattern() {
  noStroke(); // no outline around shapes
  let size = min(width, height); // keep square aspect ratio
  let startX = (width - size) / 2; // center horizontally
  let startY = (height - size) / 2; // center vertically

  for (let seg of bgSegments) {
    let cellSize = size / gridSize;
    let x = startX + (seg.col + 0.5) * cellSize;
    let y = startY + (seg.row + 0.5) * cellSize;

    let pulse = sin(frameCount * seg.rate + seg.phase) * seg.amp;

    // base size plus the pulse
    let w = cellSize * (shapeSize + pulse);
    let h = cellSize * (shapeSize + pulse);

    fill(seg.color);

    if (seg.shape === 0) {
      ellipse(x, y, w, h); // draw circle
    } else {
      rectMode(CENTER);
      rect(x, y, w, h); // draw square
    }
  }
}

// =====================================
// 3. ANIMATION
// =====================================

function drawBullPattern() {
  noStroke();

  let scale = min(width / bullImg.width, height / bullImg.height) * 0.8;
  let patternWidth = bullImg.width * scale;
  let patternHeight = bullImg.height * scale;
  let startX = (width - patternWidth) / 2;
  let startY = (height - patternHeight) / 2;

  let spectrum = fft ? fft.analyze() : 
  [];

  for (let i = 0; i < bullSegments.length; i++) {
    let seg = bullSegments[i];

    // Calculate the position of each segment
    let cellW = patternWidth / gridSize;
    let cellH = patternHeight / gridSize;
    let x = startX + (seg.col + 0.5) * cellW;
    let y = startY + (seg.row + 0.5) * cellH;

    // Idle pulsation
    let idlePulse = sin(frameCount * seg.rate + seg.phase) * seg.amp;

    //mapping frequencies
    let rowNorm = seg.row / (gridSize - 1); // 0 top → 1 bottom
    let freqIndex = floor(spectrum.length * abs(rowNorm - 0.68));
    freqIndex = constrain(freqIndex, 0, spectrum.length - 1);

    // Audio pulse
    let audioPulse = spectrum.length ? (spectrum[freqIndex] / 255) * 1.3 : 0;

    // Final size with idle + audio
    let w = cellW * (shapeSize + idlePulse + audioPulse);
    let h = cellH * (shapeSize + idlePulse + audioPulse);

    fill(seg.color);

    if (seg.shape === 0) ellipse(x, y, w, h);
    else {
      rectMode(CENTER);
      rect(x, y, w, h);
    }
  }
}

// =====================================
// 4. DRAW EVERYTHING TOGETHER
// =====================================

function drawAll() {
  background(backColor); // clear canvas
  drawBgPattern();       // draw animated background
  drawBullPattern();     // draw animated bull foreground
}