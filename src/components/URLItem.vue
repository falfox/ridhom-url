<template>
  <div class="px-4 py-3 border-t border-gray-200">
    <div class="text-sm flex items-center">
      <div class="w-3/4">
        <a
          :href="`https://u.ridhom.dev/${url.hashid}`"
          target="_blank"
          class="text-teal-900 font-normal"
        >
          https://u.ridhom.dev/{{ url.hashid }}
        </a>
        <input
          type="hidden"
          :data-url="url.hashid"
          :value="`https://u.ridhom.dev/${url.hashid}`"
        />
        <p class="text-gray-500 font-light truncate">
          {{ url.longURL }}
        </p>
      </div>
      <div class="w-1/4 flex justify-end">
        <button
          class="bg-green-200 text-green-800 w-12 h-12 rounded-full flex justify-center focus:outline-none focus:shadow-outline"
          @click="copyURL(url.hashid)"
        >
          <svg
            class="fill-current w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path fill="none" d="M0 0h24v24H0V0z" />
            <path :data-svg="url.hashid" opacity=".3" d="M8 7h11v14H8z" />
            <path
              d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("urls");

export default {
  props: ["url"],
  methods: {
    ...mapActions(["copyURL"])
  }
};
</script>
