<script setup lang="ts">
const { ready, loggedIn, user, clear, error } = useUserSession()
const route = useRoute()
const logoutError = ref('')
const signOutPending = ref(false)

const authErrorMessage = computed(() => {
  if (route.query.error === 'not-authorized') {
    return 'This GitHub account is not authorized to access the admin dashboard.'
  }

  if (route.query.error === 'oauth-failed') {
    return 'GitHub sign-in failed. Please try again.'
  }

  return ''
})

async function signOut() {
  signOutPending.value = true
  logoutError.value = ''

  await clear()
  if (error.value) {
    logoutError.value = 'Could not sign out. Please try again.'
  }

  signOutPending.value = false
}
</script>

<template>
  <div class="site-shell flex min-h-screen flex-col">
    <header class="border-b border-black/10">
      <nav class="site-container flex flex-wrap items-center justify-between gap-4 py-4">
        <NuxtLink to="/admin" class="text-xl font-semibold text-black">
          Admin
        </NuxtLink>

        <div v-if="loggedIn" class="flex items-center gap-5">
          <NuxtLink to="/admin/movies" class="site-nav-link">Movies</NuxtLink>
          <span class="text-sm text-black/60">{{ user?.githubLogin }}</span>
          <button
            type="button"
            class="site-button-secondary"
            :disabled="signOutPending"
            @click="signOut"
          >
            {{ signOutPending ? 'Signing out...' : 'Sign out' }}
          </button>
        </div>
      </nav>
    </header>

    <main class="site-container flex-1 py-12">
      <p v-if="logoutError" class="mb-5 text-sm text-red-700" role="alert">
        {{ logoutError }}
      </p>

      <div v-if="!ready" class="site-card p-8 text-black/65" role="status">
        Checking admin access...
      </div>

      <section v-else-if="!loggedIn" class="site-card mx-auto max-w-xl p-8 sm:p-10">
        <p class="site-eyebrow">Private area</p>
        <h1 class="mt-3 text-3xl font-semibold text-black">Admin dashboard</h1>
        <p class="mt-4 leading-7 text-black/65">
          Sign in with the authorized GitHub account to manage this site.
        </p>
        <p v-if="authErrorMessage" class="mt-4 text-sm text-red-700" role="alert">
          {{ authErrorMessage }}
        </p>
        <a href="/auth/github" class="site-button mt-6">Sign in with GitHub</a>
      </section>

      <div v-show="ready && loggedIn">
        <slot />
      </div>
    </main>
  </div>
</template>
