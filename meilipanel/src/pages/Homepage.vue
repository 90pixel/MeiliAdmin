<template>
  <div class="hello has-background-white-ter">
    <HeaderVue />
    <div class="container mt-2">
      <b-button
        type="is-info my-4"
        expanded
        @click="isComponentModalActive = true"
        >{{ $t("add_server") }}</b-button
      >
      <ServerStatusVue />
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
          <p class="modal-card-title">{{ $t("add_server") }}</p>
          <button
            type="button"
            class="delete"
            @click="isComponentModalActive = false"
          />
        </header>
        <section class="modal-card-body">
          <b-message type="is-danger" v-for="(msg, i) in errorMsg" :key="i">
            {{ msg }}
          </b-message>
          <b-field :label="$t('serverName')">
            <b-input
              v-model="addServer.name"
              placeholder="ex: movies-search-server"
            ></b-input>
          </b-field>

          <b-field :label="$t('serverIP')">
            <b-input v-model="addServer.ip" placeholder="IP"></b-input>
          </b-field>

          <b-field :label="$t('serverPort')">
            <b-input v-model="addServer.port" placeholder="PORT"></b-input>
          </b-field>
          <b-field :label="$t('serverProtocol')">
            <b-select
              expanded
              :placeholder="$t('select_protocol')"
              v-model="addServer.protocol"
            >
              <option value="http">HTTP</option>
              <option value="https">HTTPS</option>
            </b-select>
          </b-field>

          <b-button expanded type="is-info my-4" @click="addServerFunc()"
            >Ekle</b-button
          >
        </section>
      </div>
    </b-modal>
    <FooterVue />
  </div>
</template>

<script>
import HeaderVue from "../components/Header.vue";
import FooterVue from "../components/Footer.vue";
import ServerStatusVue from "../components/ServerStatus.vue";
export default {
  components: {
    HeaderVue,
    ServerStatusVue,
    FooterVue,
  },
  name: "Homepage",
  methods: {
    addServerFunc() {
      this.errorMsg = [];
      if (this.addServer.name == "") {
        this.addServer.name = this.addServer.ip;
      }

      if (!this.ValidateIPaddress(this.addServer.ip)) {
        this.errorMsg.push(this.$t("no_ip"));
      }

      if (isNaN(this.addServer.port) || this.addServer.port < 1) {
        this.errorMsg.push(this.$t("no_port"));
      }

      if (
        this.addServer.protocol !== "http" &&
        this.addServer.protocol !== "https"
      ) {
        this.errorMsg.push(this.$t("no_protocol"));
      }

      if (this.errorMsg.length) return;
      this.$socket.emit(
        "add_server",
        this.addServer.name,
        this.addServer.ip,
        this.addServer.port,
        this.addServer.protocol
      );
      this.isComponentModalActive = false;
    },

    ValidateIPaddress(ipaddress) {
      if (
        /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
          ipaddress
        )
      ) {
        return true;
      }
      return false;
    },
  },
  data() {
    return {
      isComponentModalActive: false,
      errorMsg: [],
      addServer: {
        name: "",
        ip: "",
        port: "7700",
        protocol: "http",
      },
    };
  },
};
</script>

<style scoped>
.container {
  min-height: calc(100vh - 248px);
  padding-bottom: 20px;
}
</style>


<!-- Add "scoped" attribute to limit CSS to this component only -->

