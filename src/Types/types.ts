type PinnedRepoNode = {
  name: string
  description: string
  url: string
  pushedAt: string
  owner: {
    login: string
  }
}
export type PinnedRepoEdge = {
  node: PinnedRepoNode
}