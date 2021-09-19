<template>
  <div class="column is-one-quarter" v-if="indexData">
    <div class="card has-background-danger">
      <div class="card-content has-text-white">
        <h1 class="is-size-5 is-bold">{{ indexName }}</h1>

        <div class="content is-size-6">
          <span class="tag is-primary mt-2"
            >{{ $t("documents") }} : {{ indexData.numberOfDocuments }}</span
          >

          <br />
          <span class="tag is-primary mt-2"
            >{{ $t("is_indexing") }} :
            {{
              indexData.isIndexing ? $t("processing") : $t("processed")
            }}</span
          >
          <router-link
            :to="'/indexes/' + this.$route.params.server + '/' + indexName"
          >
            <b-button type="is-dark" class="float-right"
              ><b-icon icon="cog" size="is-small"> </b-icon
            ></b-button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import i18n from "/plugins/i18n";
export default {
  props: {
    indexName: null,
    indexData: null,
  },
  data: () => {
    return {
      languages: Object.values(i18n.messages),
    };
  },
  mounted() {},
};
</script>

<style scoped>
.server-header {
  border-radius: 5px;
  display: flex;
  align-items: center;
}

.server-header > span {
  margin-left: 10px;
  margin-top: 5px;
}

.float-right {
  float: right;
}
</style>