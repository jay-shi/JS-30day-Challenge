const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideoFromCam() {
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(media => {
            console.log(media);
            video.src = window.URL.createObjectURL(media);
            video.play();
        })
        .catch( err => {
            console.err(err);
        })
    return;
}

function paintCanvas() {
    const {width, height} = video;
    console.log(`${width} ${height}`);
    canvas.width = width;
    canvas.height = height;
    setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        let pixles = ctx.getImageData(0, 0, width, height);
        console.log(pixles);
        pixles = redEffect(pixles);
        ctx.putImageData(pixles, 0, 0);
    }, 10);
}

function snapSound() {
    snap.currentTime = 0;
    snap.play();

    const curFrame = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = curFrame;
    link.setAttribute('download', 'user');
    link.innerHTML = `<img src="${curFrame}" />`;
    strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
    for(let i =0; i< pixels.data.length; i+=4) {
        pixels.data[i] = pixels.data[i] + 100;
        pixels.data[i+1] = pixels.data[i+1] - 100;
        pixels.data[i+2] = pixels.data[i+2] * 0.5;
    }
    return pixels;
}

video.addEventListener('canplay', paintCanvas);

getVideoFromCam();