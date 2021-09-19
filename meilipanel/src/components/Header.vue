<template>
  <div class="has-background-white">
    <div class="container is-widescreen">
      <b-navbar>
        <template #brand>
          <b-navbar-item tag="router-link" :to="{ path: '/' }">
            <img
              src="@/assets/meili.svg"
              alt="MeiliAdmin by 90Pixel"
            />
          </b-navbar-item>
        </template>
        
      </b-navbar>
    </div>
  </div>
</template>


<script>
export default {
  name: "Header",
};
</script>