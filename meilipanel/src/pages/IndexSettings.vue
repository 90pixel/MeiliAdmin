<template>
  <div class="hello has-background-white-ter">
    <HeaderVue />
    <div class="container mt-2">
      <h2 class="is-size-6 tag is-primary">{{$t("index_settings")}}</h2>
      <h2 class="is-size-6 ml-2 tag is-dark">{{ this.$route.params.index }}</h2>
      <div class="columns mt-2" v-if="indexSettings.displayedAttributes">
        <div class="column is-one-quarter">
          <article class="message is-info">
            <div class="message-header">
              <p>{{$t("displayed_attributes")}}</p>
            </div>
            <div class="message-body">
              <div
                class="tag is-dark m-1"
                v-for="(attribute, i) in indexSettings.displayedAttributes"
                :key="i"
              >
                {{ attribute == "*" ? $t("all") : attribute }}
              </div>
              <div
                class="tag is-info plus"
                @click="
                  editDisplayAttr = true;
                  tagField = indexSettings.displayedAttributes;
                "
              >
                +
              </div>
            </div>
            <div class="message-footer">
              <b-button type="is-danger" @click="resetDisplayAttr()" expanded
                >{{$t("reset")}}</b-button
              >
            </div>
          </article>
        </div>
        <div class="column is-one-quarter">
          <article class="message is-info">
            <div class="message-header">
              <p>{{$t("searchable_attributes")}}</p>
            </div>
            <div class="message-body">
              <div
                class="tag is-dark m-1"
                v-for="(attribute, i) in indexSettings.searchableAttributes"
                :key="i"
              >
                {{ attribute == "*" ? $t("all") : attribute }}
              </div>
              <div
                class="tag is-info plus"
                @click="
                  editSearchAttr = true;
                  tagField = indexSettings.searchableAttributes;
                "
              >
                +
              </div>
            </div>
            <div class="message-footer">
              <b-button type="is-danger" expanded @click="resetSearchAttr()"
                >{{$t("reset")}}</b-button
              >
            </div>
          </article>
        </div>
        <div class="column is-one-quarter">
          <article class="message is-info">
            <div class="message-header">
              <p>{{$t("filterable_attributes")}}</p>
            </div>
            <div class="message-body">
              <div
                class="tag is-dark m-1"
                v-for="(attribute, i) in indexSettings.filterableAttributes"
                :key="i"
              >
                {{ attribute == "*" ? $t("all") : attribute }}
              </div>
              <div class="tag is-info plus" @click="editFilterAttr = true; tagField = indexSettings.filterableAttributes">
                +
              </div>
            </div>
            <div class="message-footer">
              <b-button type="is-danger" expanded @click="resetFilterAttr()"
                >{{$t("reset")}}</b-button
              >
            </div>
          </article>
        </div>
        <div class="column is-one-quarter">
          <article class="message is-info">
            <div class="message-header">
              <p>{{$t("ranking_rules")}}</p>
            </div>
            <div class="message-body">
              <div
                class="tag is-dark m-1"
                v-for="(attribute, i) in indexSettings.rankingRules"
                :key="i"
              >
                {{ attribute == "*" ? $t("all") : attribute }}
              </div>
              <div
                class="tag is-info plus"
                @click="
                  editRankingAttr = true;
                  tagField = [...indexSettings.rankingRules];
                "
              >
                +
              </div>
            </div>
            <div class="message-footer">
              <b-button type="is-danger" expanded @click="resetRankingAttr()"
                >{{$t("reset")}}</b-button
              >
            </div>
          </article>
        </div>
        <div class="column is-one-quarter">
          <article class="message is-info">
            <div class="message-header">
              <p>{{$t("stop_words")}}</p>
            </div>
            <div class="message-body">
              <div
                class="tag is-dark m-1"
                v-for="(word, i) in indexSettings.stopWords"
                :key="i"
              >
                {{ word == "*" ? $t("all") : word }}
              </div>
              <div
                class="tag is-info plus"
                @click="
                  editStopWordsAttr = true;
                  tagField = [...indexSettings.stopWords];
                "
              >
                +
              </div>
            </div>
            <div class="message-footer">
              <b-button type="is-danger" expanded @click="resetStopWordsAttr()"
                >{{$t("reset")}}</b-button
              >
            </div>
          </article>
        </div>
        <div class="column is-one-quarter">
          <article class="message is-info">
            <div class="message-header">
              <p>{{$t("synonyms")}}</p>
            </div>
            <div class="message-body">
              <div
                class="tag is-dark p-relative m-1 pr-40"
                v-for="(syn, i) in Object.keys(indexSettings.synonyms)"
                :key="i"
              >
                {{ syn }} ({{ indexSettings.synonyms[syn].length }})
                <div class="tag is-danger float-right" @click="deleteSyn(syn)">
                  Sil
                </div>
              </div>
              <div
                class="tag is-info ml-2 plus"
                @click="
                  newSyn = true;
                  tagField = [];
                  synName = '';
                "
              >
                +
              </div>
            </div>
            <div class="message-footer">
              <b-button type="is-danger" expanded @click="resetSynonyms()"
                >{{$t("reset")}}</b-button
              >
            </div>
          </article>
        </div>
        <div class="column is-one-quarter">
          <article class="message is-info">
            <div class="message-header">
              <p>{{$t("distinct")}}</p>
            </div>
            <div class="message-body">
              <div
                class="tag is-dark m-1 cp"
                @click="
                  editDistinctAttr = true;
                  inputField = indexSettings.distinctAttribute;
                "
              >
                {{
                  indexSettings.distinctAttribute == null
                    ? $t("empty")
                    : indexSettings.distinctAttribute
                }}
              </div>
            </div>
            <div class="message-footer">
              <b-button type="is-danger" expanded @click="resetDistinct()"
                >{{$t("reset")}}</b-button
              >
            </div>
          </article>
        </div>
      </div>
    </div>
    <FooterVue />
    <b-modal
      v-model="editDisplayAttr"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-modal
    >
      <div class="modal-card" style="width: 450px">
        <header class="modal-card-head">
          <p class="modal-card-title">{{$t("displayed_attributes")}}</p>
          <button
            type="button"
            class="delete"
            @click="editDisplayAttr = false"
          />
        </header>
        <section class="modal-card-body">
          <b-field :label="$t('fields')">
            <v-select taggable multiple v-model="tagField" />
          </b-field>

          <b-button expanded type="is-info my-4" @click="updateDisplayAttr()"
            >{{$t("save")}}</b-button
          >
        </section>
      </div>
    </b-modal>
    <b-modal
      v-model="editSearchAttr"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-modal
    >
      <div class="modal-card" style="width: 450px">
        <header class="modal-card-head">
          <p class="modal-card-title">{{$t("searchable_attributes")}}</p>
          <button
            type="button"
            class="delete"
            @click="editSearchAttr = false"
          />
        </header>
        <section class="modal-card-body">
          <b-field :label="$t('fields')">
            <v-select taggable multiple v-model="tagField" />
          </b-field>

          <b-button expanded type="is-info my-4" @click="updateSearchAttr()"
            >{{$t("save")}}</b-button
          >
        </section>
      </div>
    </b-modal>
    <b-modal
      v-model="editFilterAttr"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-modal
    >
      <div class="modal-card" style="width: 450px">
        <header class="modal-card-head">
          <p class="modal-card-title">{{$t("filterable_attributes")}}</p>
          <button
            type="button"
            class="delete"
            @click="editFilterAttr = false"
          />
        </header>
        <section class="modal-card-body">
          <b-field :label="$t('fields')">
            <v-select taggable multiple v-model="tagField" />
          </b-field>

          <b-button expanded type="is-info my-4" @click="updateFilterAttr()"
            >{{$t("save")}}</b-button
          >
        </section>
      </div>
    </b-modal>
    <b-modal
      v-model="editRankingAttr"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-modal
    >
      <div class="modal-card" style="width: 450px">
        <header class="modal-card-head">
          <p class="modal-card-title">{{$t("ranking_rules")}}</p>
          <button
            type="button"
            class="delete"
            @click="editRankingAttr = false"
          />
        </header>
        <section class="modal-card-body">
          <v-select
            taggable
            multiple
            v-model="tagField"
            :options="
              [
                'words',
                'typo',
                'proximity',
                'attribute',
                'sort',
                'exactness',
              ].filter((T) => !tagField.find((F) => F == T))
            "
          />

          <b-button expanded type="is-info my-4" @click="updateRankingAttr()"
            >{{$t("save")}}</b-button
          >
        </section>
      </div>
    </b-modal>
    <b-modal
      v-model="editStopWordsAttr"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-modal
    >
      <div class="modal-card" style="width: 450px">
        <header class="modal-card-head">
          <p class="modal-card-title">{{$t("stop_words")}}</p>
          <button
            type="button"
            class="delete"
            @click="editStopWordsAttr = false"
          />
        </header>
        <section class="modal-card-body">
          <v-select taggable multiple v-model="tagField" />

          <b-button expanded type="is-info my-4" @click="updateStopWordsAttr()"
            >{{$t("save")}}</b-button
          >
        </section>
      </div>
    </b-modal>
    <b-modal
      v-model="newSyn"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-modal
    >
      <div class="modal-card" style="width: 450px">
        <header class="modal-card-head">
          <p class="modal-card-title">{{$t("synonoyms")}}</p>
          <button type="button" class="delete" @click="newSyn = false" />
        </header>
        <section class="modal-card-body">
          <b-field :label="$t('synonym_name')">
            <b-input v-model="synName" placeholder="Logan"></b-input>
          </b-field>

          <b-field :label="$t('synonyms')">
            <v-select taggable multiple v-model="tagField" />
          </b-field>

          <b-button expanded type="is-info my-4" @click="addSynonom()"
            >{{$t("save")}}</b-button
          >
        </section>
      </div>
    </b-modal>
    <b-modal
      v-model="editDistinctAttr"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-modal
    >
      <div class="modal-card" style="width: 450px">
        <header class="modal-card-head">
          <p class="modal-card-title">{{$t("distinct")}}</p>
          <button
            type="button"
            class="delete"
            @click="editDistinctAttr = false"
          />
        </header>
        <section class="modal-card-body">
          <b-field :label="$t('distinct')">
            <b-input v-model="inputField" placeholder="ex: movie_id"></b-input>
          </b-field>

          <b-button expanded type="is-info my-4" @click="updateDistinct()"
            >{{$t("save")}}</b-button
          >
        </section>
      </div>
    </b-modal>
  </div>
</template>

<script>
import HeaderVue from "../components/Header.vue";
import FooterVue from "../components/Footer.vue";

export default {
  components: {
    HeaderVue,
    FooterVue,
  },
  name: "IndexSettings",
  data() {
    return {
      editDisplayAttr: false,
      editSearchAttr: false,
      editFilterAttr: false,
      editRankingAttr: false,
      editStopWordsAttr: false,
      editDistinctAttr: false,
      newSyn: false,
      synName: "",
      indexSettings: {},
      inputField: "",
      tagField: [],
    };
  },
  methods: {
    resetSynonyms() {
      this.$socket.emit(
        "resetSynonyms",
        this.$route.params.server,
        this.$route.params.index
      );
    },
    resetDistinct() {
      this.$socket.emit(
        "resetDistinct",
        this.$route.params.server,
        this.$route.params.index
      );
    },
    resetDisplayAttr() {
      this.$socket.emit(
        "resetDisplayAttr",
        this.$route.params.server,
        this.$route.params.index
      );
    },
    resetSearchAttr() {
      this.$socket.emit(
        "resetSearchAttr",
        this.$route.params.server,
        this.$route.params.index
      );
    },
    resetRankingAttr() {
      this.$socket.emit(
        "resetRankingAttr",
        this.$route.params.server,
        this.$route.params.index
      );
    },
    resetStopWordsAttr() {
      this.$socket.emit(
        "resetStopWordsAttr",
        this.$route.params.server,
        this.$route.params.index
      );
    },
    resetFilterAttr() {
      this.$socket.emit(
        "resetFilterAttr",
        this.$route.params.server,
        this.$route.params.index
      );
    },
    addSynonom() {
      this.indexSettings.synonyms[this.synName] = this.tagField;

      this.$socket.emit(
        "updateSynonyms",
        this.$route.params.server,
        this.$route.params.index,
        this.indexSettings.synonyms
      );
      this.newSyn = false;
      this.tagField = [];
      this.inputField = "";
    },
    updateDistinct() {
      this.indexSettings.distinctAttribute = this.inputField;

      this.$socket.emit(
        "updateDistinct",
        this.$route.params.server,
        this.$route.params.index,
        this.indexSettings.distinctAttribute
      );
      this.inputField = "";
      this.editDistinctAttr = false;
    },
    deleteSyn(deletedSyn) {
      this.indexSettings.synonyms[this.synName] = this.tagField;
      const filteredObj = Object.keys(this.indexSettings.synonyms).filter(
        (F) => F !== deletedSyn
      );
      const dummyObj = {};
      for (let i = 0; i < filteredObj.length; i++) {
        dummyObj[filteredObj[i]] = this.indexSettings.synonyms[filteredObj[i]];
      }
      this.indexSettings.synonyms = dummyObj;
      this.$socket.emit(
        "updateSynonyms",
        this.$route.params.server,
        this.$route.params.index,
        this.indexSettings.synonyms
      );
      console.log(this.indexSettings.synonyms);
      this.newSyn = false;
      this.tagField = [];
      this.inputField = "";
    },
    updateStopWordsAttr() {
      this.$socket.emit(
        "updateStopWordsAttr",
        this.$route.params.server,
        this.$route.params.index,
        this.tagField
      );
      this.editStopWordsAttr = false;
      this.tagField = [];
    },
    updateRankingAttr() {
      this.$socket.emit(
        "updateRankingAttr",
        this.$route.params.server,
        this.$route.params.index,
        this.tagField
      );
      this.editRankingAttr = false;
      this.tagField = [];
    },
    updateFilterAttr() {
      const attr = this.tagField;

      this.$socket.emit(
        "updateFilterAttr",
        this.$route.params.server,
        this.$route.params.index,
        attr
      );
      this.inputField = "";
      this.editFilterAttr = false;
    },
    updateDisplayAttr() {
      let attr = this.tagField;
      const isAllContains = attr.find((T) => T == "*");
      if (isAllContains && attr.length > 1)
        attr = attr.filter((A) => A !== "*");
      this.$socket.emit(
        "updateDisplayAttr",
        this.$route.params.server,
        this.$route.params.index,
        attr
      );
      this.inputField = "";
      this.editDisplayAttr = false;
    },
    updateSearchAttr() {
      let attr = this.tagField;
      const isAllContains = attr.find((T) => T == "*");
      if (isAllContains && attr.length > 1)
        attr = attr.filter((A) => A !== "*");
      this.$socket.emit(
        "updateSearchAttr",
        this.$route.params.server,
        this.$route.params.index,
        attr
      );
      this.inputField = "";
      this.editSearchAttr = false;
    },
    startInterval() {
      setInterval(() => {
        this.$socket.emit(
          "index_settings",
          this.$route.params.server,
          this.$route.params.index
        );
      }, 1000);
    },
  },
  mounted() {
    this.startInterval();
    this.sockets.subscribe("index_settings", (data) => {
      this.indexSettings = data;
    });
  },
};
</script>

<style scoped>
.columns {
  flex-wrap: wrap;
}

.plus {
  cursor: pointer;
}

.p-relative {
  position: relative;
}

.float-right {
  right: 0;
  position: absolute;
  cursor: pointer;
}

.pr-40 {
  padding-right: 40px !important;
}

.cp {
  cursor: pointer;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->

