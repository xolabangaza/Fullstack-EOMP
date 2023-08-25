<template>
  <div class="spinner-container" v-if="loading">
    <div class="spinner">
      <div class="spinner-inner"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loading: Boolean,
  },
};
</script>

<style scoped>
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.spinner {
  position: relative;
  width: 40px;
  height: 40px;
  animation: rotate 1.5s linear infinite;
}

.spinner-inner {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 4px solid transparent;
  border-top-color: #3498db;
  border-radius: 50%;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
