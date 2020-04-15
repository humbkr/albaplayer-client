// eslint-disable-next-line import/no-cycle
import Artist from './Artist'
// eslint-disable-next-line import/no-cycle
import Album from './Album'

export default interface Track {
  id: string
  title: string
  number: number
  disc: string
  // In seconds.
  duration: number
  // Cover url.
  cover: string
  artistId?: string
  albumId?: string
  artist?: Artist
  album?: Album
  src?: string
}
