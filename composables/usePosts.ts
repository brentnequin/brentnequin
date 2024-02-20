const medium_url = 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@brentnequin'

export const usePosts = () => {

  const posts = ref([] as Array<Post>)

  const getPosts = async () => await $fetch<{'items': Array<Post>}>(medium_url)
    .then(json => { posts.value = json['items'] })

  
  return { posts, getPosts }
}