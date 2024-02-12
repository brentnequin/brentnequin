type Post = {
  categories: Array<string>,
  content: string,
  description: string,
  link: string
  pubDate: string
  title: string
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      getPosts: async (userName: string) => await $fetch<{'items': Array<Post>}>(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${userName}`)
        .then(json => json['items'])
    }
  }
})