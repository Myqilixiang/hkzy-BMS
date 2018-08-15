<template>
  <div class="iframe-container">
    <iframe class="iframe"
            :src="iframeUrl"
            frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
  name: 'iframe-container',
  data() {
    return {}
  },
  props: {
    iframeUrl: {
      type: String
    }
  }
}
</script>

<style scoped>
.iframe-container {
  position: relative;
  left: -265px;
  top: -51px;
  width: calc(100vw + 265px);
  height: calc(100vh + 51px);
}
.iframe {
  height: 100%;
  width: 100%;
}
</style>
