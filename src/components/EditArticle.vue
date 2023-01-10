<template>
  <div id="container">
    <RtEditor/>
  </div>
</template>

<script>
import RtEditor from "@/components/RtEditor";

export default {
  name: "EditArticle",
  components: {
    RtEditor
  }
}
</script>

<style scoped>

#container {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.tinymce-editor {
  width: 1000px;
}

</style>