import Track from '../../../types/Track'
import queueSlice, { queueInitialState, QueueStateType } from '../queue.redux'

const {
  queueSetCurrent,
  queueRemoveTrack,
  queueClear,
  queueReplace,
  queueAddTracks,
} = queueSlice.actions

describe('queue reducer', () => {
  it('should handle queue initial state', () => {
    // @ts-ignore
    expect(queueSlice.reducer(undefined, {})).toEqual(queueInitialState)
  })

  it('should handle queueAddTracks action', () => {
    const tracksToAdd: Track[] = [
      {
        id: '1',
        title: 'Track 1',
        number: 1,
        disc: '',
        duration: 123,
        cover: '',
      },
      {
        id: '2',
        title: 'Track 2',
        number: 2,
        disc: '',
        duration: 124,
        cover: '',
      },
    ]

    expect(
      queueSlice.reducer(queueInitialState, {
        type: queueAddTracks.type,
        payload: tracksToAdd,
      })
    ).toEqual({
      ...queueInitialState,
      items: tracksToAdd.map((item) => ({ track: item })),
    })
  })

  it('should handle queueRemoveTrack action', () => {
    const testState: QueueStateType = {
      ...queueInitialState,
      current: 1,
      items: [
        {
          track: {
            id: '1',
            title: 'Track 1',
            number: 1,
            disc: '',
            duration: 123,
            cover: '',
          },
        },
        {
          track: {
            id: '2',
            title: 'Track 2',
            number: 2,
            disc: '',
            duration: 124,
            cover: '',
          },
        },
      ],
    }

    expect(
      queueSlice.reducer(testState, {
        type: queueRemoveTrack.type,
        payload: 0,
      })
    ).toEqual({
      ...queueInitialState,
      current: 0,
      items: [
        {
          track: {
            id: '2',
            title: 'Track 2',
            number: 2,
            disc: '',
            duration: 124,
            cover: '',
          },
        },
      ],
    })
  })

  it('should handle queueClear action', () => {
    const testState: QueueStateType = {
      ...queueInitialState,
      current: 1,
      items: [
        {
          track: {
            id: '1',
            title: 'Track 1',
            number: 1,
            disc: '',
            duration: 123,
            cover: '',
          },
        },
      ],
    }

    expect(
      queueSlice.reducer(testState, {
        type: queueClear.type,
      })
    ).toEqual(queueInitialState)
  })

  it('should handle queueReplace action', () => {
    const testState: QueueStateType = {
      ...queueInitialState,
      current: 1,
      items: [
        {
          track: {
            id: '1',
            title: 'Track 1',
            number: 1,
            disc: '',
            duration: 123,
            cover: '',
          },
        },
      ],
    }

    const replacementItems = [
      {
        track: {
          id: '2',
          title: 'Track 2',
          number: 2,
          disc: '',
          duration: 124,
          cover: '',
        },
      },
    ]

    expect(
      queueSlice.reducer(testState, {
        type: queueReplace.type,
        payload: replacementItems,
      })
    ).toEqual({
      ...queueInitialState,
      current: 1,
      items: replacementItems,
    })
  })

  it('should handle queueSetCurrent action', () => {
    expect(
      queueSlice.reducer(queueInitialState, {
        type: queueSetCurrent.type,
        payload: 2,
      })
    ).toEqual({
      ...queueInitialState,
      current: 2,
    })
  })
})
