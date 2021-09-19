<template>
  <div class="hello has-background-white-ter">
    <HeaderVue />
    <div class="container mt-2">
      <ServerIndexesVue />
    </div>
    <FooterVue />
  </div>
</template>

<script>
import HeaderVue from "../components/Header.vue";
import FooterVue from "../components/Footer.vue";
import ServerIndexesVue from "../components/ServerIndexes.vue";
export default {
  components: {
    HeaderVue,
    ServerIndexesVue,
    FooterVue,
  },
  name: "Indexes",
};
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->

