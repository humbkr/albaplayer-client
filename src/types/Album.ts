// eslint-disable-next-line import/no-cycle
import Artist from './Artist'
// eslint-disable-next-line import/no-cycle
import Track from './Track'

export default interface Album {
  id: string
  title: string
  year: string
  artistId?: string
  artist?: Artist
  tracks?: Array<Track>
}
