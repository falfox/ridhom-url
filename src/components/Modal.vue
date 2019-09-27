<template>
  <transition name="modal">
    <div v-if="showModal">
      <div
        class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center z-40"
      >
        <div
          class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
          @click="$emit('close')"
        ></div>

        <div
          class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto"
        >
          <!-- Add margin if you want to see some of the overlay behind the modal-->
          <div class="modal-content py-4 text-left px-6">
            <!--Title-->
            <div class="flex justify-between items-center pb-3">
              <p class="text-center text-lg">
                Log in with one of the following
              </p>
              <div
                class="modal-close cursor-pointer z-50"
                @click="$emit('close')"
              >
                <svg
                  class="fill-current text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                >
                  <path
                    d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
                  ></path>
                </svg>
              </div>
            </div>

            <!--Body-->
            <div class="flex flex-col">
              <button
                class="py-2 mb-2 text-white rounded flex justify-center items-center bg-gray-700"
                @click="externalLogin('github')"
              >
                <svg
                  class="fill-current w-4 h-4"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                  />
                </svg>
                <span class="px-2">Login with Github</span>
              </button>
              <button
                class="py-2 mb-2 text-white rounded flex justify-center items-center bg-blue-500"
                @click="externalLogin('google')"
              >
                <svg
                  class="fill-current w-4 h-4"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
                  />
                </svg>
                <span class="px-2">Login with Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("auth");

export default {
  props: ["showModal"],
  methods: {
    ...mapActions(["externalLogin"])
  }
};
</script>

<style>
.modal-enter,
.modal-leave-active {
  opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease;
}
</style>
