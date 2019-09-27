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
        <Modal :showModal="showModal" @close="showModal = false"> </Modal>
        <div class="flex justify-between items-center">
          <h2 class="font-medium text-gray-800 pb-2 pt-2">My Links</h2>
          <div v-if="!loading" class="relative">
            <div :class="[isOpen ? 'block' : 'hidden']">
              <button
                @click="isOpen = false"
                type="button"
                class="z-30 block fixed inset-0 w-full h-full cursor-default"
              ></button>
              <div class="absolute z-40 right-0" :style="{ top: '14px' }">
                <div class="mt-3 bg-white border rounded-lg w-48 py-2 shadow">
                  <a
                    href="javascript:void(0)"
                    @click="logout"
                    class="block hover:text-white text-gray-800 mt-0 px-4 py-2 hover:bg-green-600"
                    >Sign out</a
                  >
                </div>
              </div>
            </div>
            <button
              v-if="loggedIn"
              @click="toggleDropdown"
              class="flex items-center focus:outline-none"
            >
              <img
                class="w-6 h-6 rounded-full"
                :src="currentUser.user_metadata.avatar_url"
                alt=""
              />
              <span class="px-2 text-sm text-green-800 flex items-center"
                >{{ currentUser.user_metadata.full_name }}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                  <path d="M7 10l5 5 5-5z" />
                  <path d="M0 0h24v24H0z" fill="none" />
                </svg>
              </span>
            </button>
            <button
              v-else
              id="show-modal"
              @click="showModal = true"
              class="text-sm text-blue-500 focus:outline-none"
            >
              Login to Save Links
            </button>
          </div>
        </div>
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
import { mapGetters, mapState, mapActions } from "vuex";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import URLItem from "@/components/URLItem";
import Modal from "@/components/Modal";

export default {
  name: "index",
  components: {
    Footer,
    Header,
    URLItem,
    Modal
  },
  data() {
    return {
      showModal: false,
      isOpen: false
    };
  },
  computed: {
    url: {
      get() {
        return this.$store.state.url;
      },
      set(value) {
        this.$store.commit("form/changeUrl", value);
        this.$store.commit("form/setError", null);
      }
    },
    ...mapState("form", ["isLoading", "error"]),
    ...mapState("auth", ["currentUser", "loading"]),
    ...mapGetters("urls", ["urls"]),
    ...mapGetters("auth", ["loggedIn"])
  },
  methods: {
    ...mapActions("form", ["generateUrl"]),
    ...mapActions("auth", ["logout"]),
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>
