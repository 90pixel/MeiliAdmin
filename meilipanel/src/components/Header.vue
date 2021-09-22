<template>
  <div class="has-background-white">
    <div class="container is-widescreen">
      <b-navbar>
        <template #brand>
          <b-navbar-item tag="router-link" :to="{ path: '/' }">
            <img src="@/assets/meili.svg" alt="MeiliAdmin by 90Pixel" />
          </b-navbar-item>
          <b-navbar-item
            v-for="(lang, i) in languages"
            :key="i"
            @click="setLang(lang)"
          >
            {{ lang.toUpperCase() }}
          </b-navbar-item>
        </template>
      </b-navbar>
    </div>
  </div>
</template>


<script>
export default {
  name: "Header",
  data() {
    return {
      languages: [],
    };
  },
  methods: {
    setLang(lang) {
      localStorage.setItem("lang", lang);
      window.location.reload();
    },
  },
  mounted() {
    this.languages = Object.keys(this.$i18n.messages);
  },
};
</script>