<template>
  <div class="antialiased min-h-screen flex flex-col">
    <header class="text-center bg-teal-800">
      <div class="containern mx-auto">
        <h1 class="text-white font-bold text-2xl py-24">
          <a href="/">
            ridhom URL
          </a>
        </h1>
        <span class="text-teal-200 font-medium text-xl p-10 inline-block"
          >Turn long url to relatively short one</span
        >
      </div>
    </header>
    <main class="max-w-lg mx-auto w-auto flex-grow">
      <div class="rounded-lg bg-white shadow-lg mx-3 -mt-48 mb-10">
        <div class="px-3 pt-3 pb-1">
          <img
            v-if="error"
            src="../assets/sad.webp"
            alt="cute cats"
            class="w-full"
          />
          <img
            v-else
            src="../assets/cute.webp"
            alt="cute cats"
            class="w-full"
          />
          <div v-if="error" class="py-8 text-gray-700 font-medium text-center">
            {{ error }}
          </div>
          <span v-else class="text-center pb-10">
            <p class="text-lg pt-10 pb-2 text-gray-700 font-medium">
              Redirecting you to
            </p>
            <span
              v-if="longURL"
              class="bg-gray-300 py-1 px-2 mx-4 mb-8 rounded truncate block"
            >
              {{ longURL }}
            </span>
            <span
              v-else
              class="bg-gray-300 py-1 px-2 mx-4 mb-8 rounded truncate block"
            >
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
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("preflight");
import Footer from "@/components/Footer";

export default {
  name: "app",
  components: {
    Footer
  },
  computed: {
    ...mapState(["longURL", "error"])
  },
  mounted() {
    this.$store.dispatch("preflight/redirectToLongURL", this.$route);
  }
};
</script>
