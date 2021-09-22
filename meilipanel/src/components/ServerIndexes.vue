<template>
  <div>
    <b-button type="is-info my-4" @click="isComponentModalActive = true">{{
      $t("create_new_index")
    }}</b-button>
    <div class="columns" v-if="Object.keys(serverIndexList).length">
      <IndexVue
        v-for="(index, i) in Object.keys(serverIndexList)"
        :key="i"
        :indexName="index"
        :indexData="Object.values(serverIndexList)[i]"
      />
    </div>
    <div v-if="!Object.keys(serverIndexList).length">
      <article class="message is-danger">
        <div class="message-header">
          <p>{{ $t("error") }}</p>
        </div>
        <div class="message-body">
          <strong>{{ $t("no_index_list_or_offline") }}</strong>
        </div>
      </article>
    </div>
    <b-modal
      v-model="isComponentModalActive"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-label="Example Modal"
      aria-modal
    >
      <div class="modal-card" style="width: 450px">
        <header class="modal-card-head">
          <p class="modal-card-title">İndex Oluştur</p>
          <button
            type="button"
            class="delete"
            @click="isComponentModalActive = false"
          />
        </header>
        <section class="modal-card-body">
          <b-message type="is-danger" v-if="errorMsg.length">
            {{ errorMsg }}
          </b-message>

          <b-field label="İndex Adı">
            <b-input
              v-model="createIndex.name"
              placeholder="ex: movies"
            ></b-input>
          </b-field>
          <b-field class="file">
            <b-upload v-model="createIndex.file" expanded>
              <a class="button is-primary is-fullwidth">
                <span>{{ createIndex.file.name || "Tıkla ve Dosya Seç" }}</span>
              </a>
            </b-upload>
          </b-field>

          <b-button expanded type="is-info my-4" @click="uploadIndex()"
            >Yükle</b-button
          >
        </section>
      </div>
    </b-modal>
  </div>
</template>
<script>
import IndexVue from "./Index.vue";
export default {
  components: {
    IndexVue,
  },
  name: "ServerIndexes",
  sockets: {
    connect: function () {
      console.log("MeiliSocket connected");
    },
  },
  methods: {
    uploadIndex() {
      if (!this.createIndex.file.name.endsWith(".json")) {
        this.errorMsg = this.$t("only_json");
        return;
      }
      const uploadedFile = this.createIndex.file;
      const indexName = this.createIndex.name;
      var reader = new FileReader();
      reader.readAsText(uploadedFile, "UTF-8");
      reader.onload = function (evt) {
        const rawJSON = evt.target.result;

        var requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: rawJSON,
        };
        const indexAddUrl = `${this.serverInfo.protocol}://${this.serverInfo.ip}:${this.serverInfo.port}/indexes/${indexName}/documents`;
        fetch(
          indexAddUrl,
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));
      };
      this.isComponentModalActive = false;
    },
    startInterval() {
      setInterval(() => {
        this.$socket.emit("server_indexes", this.$route.params.server);
      }, 1000);
    },
  },
  mounted() {
    this.startInterval();
    this.sockets.subscribe("server_indexes", (data) => {
      this.serverIndexList = data.indices;
      this.serverInfo = data.server;
    });
  },
  data: () => {
    return {
      serverInfo: { ip: "127.0.0.1", port: 7700, protocol: "http" },
      errorMsg: "",
      createIndex: {
        name: "",
        file: {
          name: "",
        },
      },
      isComponentModalActive: false,
      serverIndexList: [],
    };
  },
};
</script>
<style scoped>
.columns {
  flex-wrap: wrap;
}
</style>
