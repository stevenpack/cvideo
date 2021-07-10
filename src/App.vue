<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <img height="200px" src="https://us.123rf.com/450wm/artinspiring/artinspiring1701/artinspiring170100096/68841499-studio-blog-recording-on-chroma-key-background-vlog-video-recording-beautiful-girl-recording-herself.jpg?ver=6" />
    <HelloWorld msg="Welcome to cvideo.rocks"/>    
    <button  v-if="state=='init'" v-on:click="getStarted()" class="btn btn-primary"><i class="bi bi-record-circle"></i>&nbsp;Get started</button>
    <button v-if="state=='ready'" v-on:click="record()" class="btn btn-primary"><i class="bi bi-record-circle"></i>&nbsp;Record</button>
        <button v-if="state=='recording'" v-on:click="stopRecording()" class="btn btn-primary"><i class="bi bi-record-circle"></i>&nbsp;Stop</button>

    <div>
      <i>{{status}}</i>
      <div v-if="viewLink != null">Share you video CV link <a target="_blank" :href="viewLink">{{viewLink}}</a></div>
    </div>
    
    <div style="padding-top: 2rem">
      <video controls autoplay playsinline hidden></video>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import * as RecordRTC from 'recordrtc';
import axios from 'axios';
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {    
      state: "init",
      status: null,
      viewLink: null,
      recorder: null,
      camera: null,
    }    
  },
  methods: {
    transition(state) {
      console.log(`STATE: ${this.state} -> ${state}`)
      this.state = state;
    },
    async getStarted() {
      this.camera = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
      this.recorder = new RecordRTC.RecordRTCPromisesHandler(this.camera, {
          type: 'video'
      });
      this.showPlayer(this.camera);
      this.transition("ready");
    },
    async record() {
      try {
        this.transition("recording")
        this.recorder.camera = this.camera;
        this.setStatus("Recording...");
        this.recorder.startRecording();
        await this.sleep(5000);            
        await this.stopRecording();
      } catch (e) {
        console.error(e);
        this.setStatus("Record failed");
        this.transition("init");
      }
    },
    async stopRecording() {
      if (!this.recorder) {
        return;
      }
      await this.recorder.stopRecording();
      let videoContentType = this.recorder.blob.type;
      console.log(`videoContentType: ${videoContentType}`);
      let blob = await this.recorder.getBlob();    
      try {
          this.recorder.camera.stop();
          this.releasePlayer();
          //TODO: make uploading a new state
          this.setStatus("Getting upload link...");
          this.transition("upload");
          let {uploadUrl, uid} = await this.getUploadUrl();
          // let uploadUrl = "https://upload.videodelivery.net/9650019573c0418badc9f9b3915832ac";
          // let uid = "9650019573c0418badc9f9b3915832ac";
          console.log(uploadUrl);          
          const formData = new FormData();
          formData.append("file", blob);
          this.setStatus("Uploading...");
          await fetch(uploadUrl, {
            method: "POST",
            body: formData,
          });          
          this.setStatus("Done.");
          this.viewLink = `https://watch.videodelivery.net/${uid}`;
          console.log(this.viewLink);
          this.transition("init");
          
      } catch (e) {
          console.error(e);
          this.setStatus("Uploaded failed. " + e.message);
          this.transition("init");
      }  
    },
    async getUploadUrl() {
      let url = "https://cvideo.rocks/api/upload-url";
      console.log(`Getting ${url}`);
      let res = await axios.get(url);
      return res.data;
    },
    showPlayer(camera) {
      let video = document.querySelector('video');
      video.removeAttribute('hidden');
      video.muted = true;
      video.volume = 0;
      video.srcObject = camera;
    },
    releasePlayer() {
      this.recorder = null;        
      this.camera = null;
      let video = document.querySelector('video');
      video.src = video.srcObject = null;
      video.muted = false;
      video.volume = 1;
      video.setAttribute('hidden', 'true');
    },
    async sleep(ms) {
      const sleep = ms => new Promise(r => setTimeout(r, ms));
      await sleep(ms);
    },
    setStatus(status) {
      console.log(status)
      this.status = status;
    }

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
