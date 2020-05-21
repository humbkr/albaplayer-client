import PlaylistItem from './PlaylistItem'
import Track from '../../../types/Track'

export interface PlaylistCareItem extends PlaylistItem {
  similarTracks: Track[]
  processed?: boolean
}
