export default class AudioPost {
    constructor(container) {
        this.container = container;
        this.chunks = [];
        this.false = false;
    }

    recordAudio(latitude, longitude, audioRecord) {
        console.log(audioRecord);
        const audioStop = document.querySelector(".audio-ok");
        const audioRemove = document.querySelector(".audio-cancel");
        const audioControl = document.querySelector(".audio-control");

        audioRecord.addEventListener("click", async () => {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });

            const recorder = new MediaRecorder(stream);

            recorder.addEventListener("start", () => {
                console.log("start");
                this.start();
                audioRecord.classList.add("hidden");
                audioControl.classList.remove("hidden");
            });

            recorder.addEventListener("dataavailable", (event) => {
                console.log(event.data);
                this.chunks.push(event.data);

            });

            recorder.addEventListener("stop", () => {
                if(this.false === false){
                    this.createAudioPost(latitude, longitude)
                    const blob = new Blob(this.chunks);

                    const audioPlayer = document.querySelector(".audio");
                    audioPlayer.src = URL.createObjectURL(blob);
                }
                audioRecord.classList.remove("hidden");
                audioControl.classList.add("hidden");
                this.stop()
            });

            recorder.start();

            audioStop.addEventListener("click", () => {
                recorder.stop();
                stream.getTracks().forEach((track) => track.stop());
                this.false = false;
            });
            audioRemove.addEventListener("click", () => {//отменяем запись
                this.chunks = [];
                recorder.stop();
                stream.getTracks().forEach((track) => track.stop());
                this.false = true;
                //stream.getTracks().forEach((track) => track.stop());
                //stream.removeTrack(stream.getTracks());
                audioRecord.classList.remove("hidden");
                audioControl.classList.add("hidden");
            });
        });
    }
    timer(){ // функция таймера (подсчёт количества секунд)
        const count = document.querySelector('.counter')
        count.innerHTML = parseInt(count.innerHTML)+1;
    }

    start() { // функция запуска таймера
        window.TimerId = window.setInterval(this.timer, 1000);
    }

    stop() { // функция остановки таймера
        window.clearInterval(window.TimerId);
        const count = document.querySelector('.counter')
        count.innerHTML = 0;
    }
    createAudioPost(latitude, longitude) {

        const postAudio = `
                    <div class="itemPost border border-radius p-4 mx-3">
                        <div class="itemsPost-content mb-2">
                          <audio class="audio" controls></audio>
                        </div>
                        <div class="itemsPost-footer">
                            <div class="item-footer itemsPost-footer-date">${new Date().toLocaleString()}</div>
                            <div class="item-footer itemsPost-footer-coord">[${latitude}, ${longitude}]</div>
                        </div>                  
                    </div>
                    `;
        this.container.insertAdjacentHTML("afterBegin", postAudio);
    }
}