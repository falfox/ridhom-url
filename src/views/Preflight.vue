<template>
  <div class="antialiased min-h-screen flex flex-col">
    <header class="text-center bg-teal-800">
      <div class="containern mx-auto">
        <a href="/">
          <h1 class="text-white font-bold text-2xl py-24">ridhom URL</h1>
        </a>
        <span class="text-teal-200 font-medium text-xl p-10 inline-block"
          >Turn long url to relatively short one</span
        >
      </div>
    </header>
    <main class="container mx-auto w-auto flex-grow">
      <div class="rounded-lg bg-white shadow-lg mx-3 -mt-48 mb-10">
        <div class="px-3 pt-3 pb-1 flex flex-col items-center justify-center">
          <img src="../assets/cute.webp" alt="cute cats" />
          <div v-if="urlError" class="text-lg py-8 text-gray-700 font-medium">
            {{ urlError }}
          </div>
          <span v-else class="text-center pb-10">
            <p class="text-lg pt-10 pb-2 text-gray-700 font-medium">
              Redirecting you to
            </p>
            <span v-if="longURL" class="bg-gray-300 px-2 py-1 my-2 rounded">
              {{ longURL }}
            </span>
            <span v-else class="bg-gray-300 px-2 py-1 my-2 rounded">
              <span v-for="n in 6" :key="n">&middot; </span>
            </span>
          </span>
        </div>
      </div>
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Footer from "@/components/Footer";

export default {
  name: "app",
  components: {
    Footer
  },
  computed: {
    ...mapState(["longURL", "urlError"])
  },
  mounted() {
    this.$store.dispatch("redirectToLongURL", this.$route);
  }
};
</script>
