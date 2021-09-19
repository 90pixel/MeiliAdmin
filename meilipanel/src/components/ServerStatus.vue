<template>
  <div>
    <article class="message is-danger" v-if="!serverList.length">
      <div class="message-header">
        <p class="centered">{{ $t("empty_page") }}</p>
      </div>
      <div class="message-body">
        <h1 class="is-size-5 centered">{{ $t("please_add_server") }}</h1>
      </div>
    </article>
    <ServerVue
      v-for="(server, i) in serverList"
      :key="i"
      :serverData="serverList[i]"
    />
  </div>
</template>
<script>
import ServerVue from "./Server.vue";
export default {
  components: {
    ServerVue,
  },
  name: "Header",
  sockets: {
    connect: function () {
      console.log("MeiliSocket connected");
    },
  },
  methods: {
    startInterval() {
      setInterval(() => {
        this.$socket.emit("health");
      }, 1000);
    },
  },
  mounted() {
    this.startInterval();
    this.sockets.subscribe("health", (data) => {
      const findServer = this.serverList.find(
        (S) =>
          S.ip == data.ip && S.port == data.port && S.protocol == data.protocol
      );
      if (findServer) {
        findServer.status = data.status;
        findServer.data = data.data;
        return;
      }
      this.serverList.push(data);
    });
  },
  data: () => {
    return {
      serverList: [],
    };
  },
};
</script>

<style scoped>
.centered {
  text-align: center;
  width: 100%;
}
</style>
