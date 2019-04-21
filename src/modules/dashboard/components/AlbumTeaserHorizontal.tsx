import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs'
import { contextMenu } from 'react-contexify'
import coverPlaceholder from '../../../common/assets/images/cover_placeholder.png'
import ActionButtonIcon from '../../../common/components/ActionButtonIcon'
import Album from '../../../types/Album'
import { constants as APIConstants } from '../../../api'
import { playAlbum } from '../../player/redux'

const AlbumTeaserHorizontal: React.FC<{
  album: Album
  selected: boolean
  setSelected: (albumId: string) => void
}> = ({ album, selected, setSelected }) => {
  const dispatch = useDispatch()

  const [mouseHover, setMouseHover] = useState(false)

  const handleMoreActionsPress = (
    e: React.MouseEvent,
    displayAllActions: boolean = false
  ) => {
    e.preventDefault()
    setSelected(album.id)
    contextMenu.show({
      id: 'recent-album-more-actions-context-menu',
      event: e,
      props: {
        album,
        displayAllActions,
      },
    })
  }

  return (
    <Wrapper
      onMouseOver={() => setMouseHover(true)}
      onMouseOut={() => setMouseHover(false)}
      onFocus={() => setMouseHover(true)}
      onBlur={() => setMouseHover(false)}
      onContextMenu={(e) => handleMoreActionsPress(e, true)}
      visible={mouseHover || selected}
    >
      <CoverWrapper>
        <ActionOverlay visible={mouseHover || selected}>
          <ActionButton
            icon="play_arrow"
            size={40}
            onClick={() => dispatch(playAlbum(album.id))}
          />
        </ActionOverlay>
        <Cover
          src={
            album.cover
              ? APIConstants.BACKEND_BASE_URL + album.cover
              : coverPlaceholder
          }
        />
      </CoverWrapper>
      <Info>
        <Left>
          <MainInfo>
            <Title>{album.title}</Title>
            <Artist>{album.artist?.name}</Artist>
          </MainInfo>
          <DateAdded>
            Added on: {dayjs.unix(album.dateAdded).format('DD/MM/YYYY')}
          </DateAdded>
        </Left>
        <SecondaryActions visible={mouseHover || selected}>
          <ActionButton
            icon="more_horiz"
            size={25}
            onClick={handleMoreActionsPress}
          />
        </SecondaryActions>
      </Info>
    </Wrapper>
  )
}

export default AlbumTeaserHorizontal

const Wrapper = styled.div<{ visible: boolean }>`
  display: flex;
  width: 100%;
  margin-right: 20px;
  transition: background-color linear 0.15s;
  background-color: ${(props) => (props.visible ? props.theme.sidebar.background : 'transparent')};
`
const CoverWrapper = styled.div`
  flex-shrink: 0;
  position: relative;
  width: 80px;
  height: 80px;
`
const ActionOverlay = styled.div<{ visible: boolean }>`
  position: absolute;
  background-color: ${(props) => (props.visible ? 'rgba(25,25,34,.3)' : 'transparent')};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color linear 0.15s;
`
const Cover = styled.img`
  display: block;
  width: 80px;
  height: 80px;
`
const ActionButton = styled(ActionButtonIcon)`
  color: #fff;

  :hover {
    color: ${(props) => props.theme.buttons.colorHover};
  }
`
const Info = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
  width: 100%;
`
const Left = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`
const MainInfo = styled.div``
const Title = styled.h2`
  font-size: 1.1em;
  line-height: 1em;
`
const Artist = styled.div`
  margin-top: 5px;
  font-size: 0.9em;
`
const DateAdded = styled.div`
  font-size: 0.7em;
  color: ${(props) => props.theme.textSecondaryColor};
`
const SecondaryActions = styled.div<{ visible: boolean }>`
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity linear 0.15s;
  display: flex;
  align-items: center;
`
