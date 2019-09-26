<template>
  <div class="antialiased min-h-screen flex flex-col">
    <Header></Header>
    <main class="container mx-auto max-w-2xl flex-grow">
      <div class="rounded-lg bg-white shadow-lg mx-3 -mt-8">
        <div
          class="px-3 pt-3 pb-1 flex flex-col md:flex-row items-center justify-center"
        >
          <input
            :class="{
              'border-2': error,
              'border-red-700': error,
              'border-transparent': !error
            }"
            class="md:w-5/6 h-10 bg-gray-200 text-gray-700 w-full rounded px-2 focus:outline-none border-tra"
            v-model="url"
            type="text"
            name="url"
            placeholder="https://longurltobeshorten.com/long-long"
            :disabled="isLoading"
          />
          <button
            :class="{ 'bg-teal-800': !isLoading, 'bg-gray-600': isLoading }"
            class="md:w-1/6 uppercase text-white font-bold tracking-wide w-full rounded mt-4 md:mt-0 md:ml-3 py-1 md:py-2 shadow-md active:shadow-none focus:outline-none"
            @click="generateUrl"
            :disabled="isLoading"
          >
            Shorten
          </button>
        </div>
        <div class="pb-2">
          <div v-if="error" class="px-4 pt-1 text-xs text-red-700">
            {{ error }}
          </div>
        </div>
      </div>
      <div class="my-8 px-3 container mx-auto max-w-2xl">
        <h2 class="font-medium text-gray-800 pb-2 pt-2">My Links</h2>
        <div class="max-w-4xl rounded bg-white shadow">
          <div v-if="urls.length > 0">
            <URLItem v-for="url in urls" :key="url.hashid" :url="url"></URLItem>
          </div>
          <div v-else class="text-center py-8">
            <p class="text-lg font-medium text-gray-800">You have no links</p>
            <p class="text-sm font-light text-gray-600">
              Try to add new links using the form above
            </p>
          </div>
        </div>
      </div>
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import URLItem from "@/components/URLItem";

export default {
  name: "index",
  components: {
    Footer,
    Header,
    URLItem
  },
  computed: {
    url: {
      get() {
        return this.$store.state.form.url;
      },
      set(value) {
        this.$store.commit("changeUrl", value);
        this.$store.commit("setError", null);
      }
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
    urls() {
      return this.$store.state.urls.slice().reverse();
    },
    error() {
      return this.$store.state.form.error;
    }
  },
  methods: {
    ...mapActions(["generateUrl"])
  }
};
</script>
