import PlaylistItem from './PlaylistItem'

export default interface Playlist {
  id: string
  title: string
  date: string
  items: PlaylistItem[]
}
