<template>
  <div v-if="serverData">
    <div class="p-4 has-background-black my-2 server-header">
      <h1 class="is-size-3 is-bold has-text-white">
        {{ serverData.serverName }}
      </h1>
      <span
        :class="{
          tag: true,
          'is-success': serverData.status,
          'is-danger': !serverData.status,
        }"
        >{{ serverData.status ? $t("online") : $t("offline") }}</span
      >
      <span class="tag is-primary">{{ serverData.protocol }}</span>
      <span class="tag is-info">{{
        serverData.ip + ":" + serverData.port
      }}</span>
    </div>
    <div class="columns">
      <div class="column">
        <router-link :to="'/indexes/' + serverData.serverId">
          <div class="card has-background-danger">
            <div class="card-content has-text-white">
              <h1 class="is-size-3 is-bold">{{ $t("indices") }}</h1>
              <div class="content is-size-4">
                {{
                  serverData.data.indexCount ? serverData.data.indexCount : 0
                }}
              </div>
            </div>
          </div>
        </router-link>
      </div>
      <div class="column">
        <div class="card has-background-danger">
          <div class="card-content has-text-white">
            <h1 class="is-size-3 is-bold">{{ $t("documents") }}</h1>
            <div class="content is-size-4">
              {{
                serverData.data.totalDocuments
                  ? serverData.data.totalDocuments
                  : 0
              }}
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card has-background-danger">
          <div class="card-content has-text-white">
            <h1 class="is-size-3 is-bold">{{ $t("size") }}</h1>
            <div class="content is-size-4">
              {{
                serverData.data.size
                  ? readableSize(serverData.data.size)
                  : readableSize(0)
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import i18n from "/plugins/i18n";
import * as prettyBytes from "pretty-bytes";
export default {
  props: {
    serverData: null,
  },
  data: () => {
    return {
      languages: Object.values(i18n.messages),
    };
  },
  methods: {
    readableSize(bytes) {
      return prettyBytes(bytes);
    },
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
</style>