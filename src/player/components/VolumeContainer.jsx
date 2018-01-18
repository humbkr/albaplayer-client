import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import { Motion, spring } from 'react-motion';
import { VolumeHighBtn, VolumeLowBtn, VolumeMutedBtn } from './buttons/index';
import ProgressBarHandler from './ProgressBarHandler';
import VolumeBar from './VolumeBar';

const VolumeContainerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
  width: 40px;
  height: 40px;
  margin: 0 auto;
  //background-color: coral;
  
  > * {
    display: inline-block;
    vertical-align: middle;
  }
`;

const VolumeBarWrapper = styled.div`
  //background-color: beige;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 20;
  height: 40px;
  width: 80px;
  transform: translate3d(-80px, 0, 0);
`;

class VolumeContainer extends React.PureComponent {
  static propTypes = {
    volume: PropTypes.number.isRequired,
    setVolume: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      mouseOverBox: false,
      translate: props.volume,
      volume: props.volume,
      mutedVolume: 0
    };

    this.handlerWidth = 12;
    this.handlerHeight = 12;
    this.svgWidth = 72;
    this.svgHeight = 12;
    this.volumeThickness = 4;

    this.holding = false;
    this.onClick = this.onClick.bind(this);
    this.onClickMute = this.onClickMute.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseDragging = this.onMouseDragging.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this._onMouseUp = this._onMouseUp.bind(this);

    this.onDraggingFunctionRef = null;
  }

  componentWillReceiveProps(nextProps) {
    if (!this.holding) {
      this.setState({
        // Why the fuck 0.6 ?
        translate: (nextProps.volume) * 0.6,
        volume: Math.round(nextProps.volume)
      });
    }
  }

  onClick(e) {
    console.log(e.clientX);
    const newVolume = Math.round(((e.clientX - e.target.getBoundingClientRect().left) / 0.6)) / 100;
    if (newVolume < 1) {
      this.props.setVolume(newVolume);
    }
    console.log('new volume ' + newVolume);
  }

  onMouseDown(e) {
    this.holding = true;
    if (document.onmousemove) {
      this.onmousemoveSaver = document.onmousemove;
    }
    if (document.onmouseup) {
      this.onmouseupSaver = document.onmouseup;
    }
    this.onDraggingFunctionRef = this.onMouseDragging(e.clientX, this.state.translate);
    document.addEventListener('mousemove', this.onDraggingFunctionRef);
    document.addEventListener('mouseup', this._onMouseUp);
  }

  onMouseDragging(mouseDownX, startTranslate) {
    return (e) => {
      if (this.holding) {
        let newTranslate = (e.clientX - mouseDownX) + startTranslate;

        // Borders checks.
        if (newTranslate < 0) {
          newTranslate = 0;
        }
        if (newTranslate > this.svgWidth - this.handlerWidth) {
          newTranslate = this.svgWidth - this.handlerWidth;
        }

        this.setState({
          translate: newTranslate,
          volume: Math.round(newTranslate / 0.6)
        });
        this.props.setVolume(this.state.volume / 100);
      }
    };
  }

  onMouseOver() {
    this.setState({ mouseOverBox: true });
  }

  onMouseOut() {
    this.setState({ mouseOverBox: false });
  }

  onClickMute() {
    if (this.state.volume > 0) {
      // Save current volume level.
      this.setState({ mutedVolume: this.state.volume });
      // Mute player.
      this.props.setVolume(0);
    } else {
      // Set saved volume level back.
      this.props.setVolume(this.state.mutedVolume / 100);
    }
  }

  _onMouseUp() {
    this.holding = false;
    this.props.setVolume(this.state.volume / 100);
    document.removeEventListener('mousemove', this.onDraggingFunctionRef);
    document.removeEventListener('mouseup', this._onMouseUp);
  }

  render() {
    let VolumeBtn;
    if (this.state.volume > 0) {
      if (this.state.volume > 50) {
        VolumeBtn = VolumeHighBtn;
      } else {
        VolumeBtn = VolumeLowBtn;
      }
    } else {
      VolumeBtn = VolumeMutedBtn;
    }

    return (
      <VolumeContainerWrapper
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
      >
        <VolumeBtn
          onClick={this.onClickMute}
        />
        <Motion
          style={{
            w: spring((this.state.mouseOverBox || this.holding) ? 40 : 0),
            //opacity: spring(this.state.mouseOverBox ? 1 : 0)
            opacity: 1
          }}
        >
          {({ w, opacity }) =>
            <VolumeBarWrapper style={{
                width: `${w * 2}px`,
                transform: `translate3d(${w}px, 0, 0)`,
                opacity
              }}
            >
              <VolumeBar
                width={this.svgWidth}
                height={this.svgHeight}
                barThickness={this.volumeThickness}
                handlerWidth={this.handlerWidth * (w / 80)}
                translate={this.state.translate}
                onClick={this.onClick}
              >
                <ProgressBarHandler
                  width={this.handlerWidth}
                  height={this.handlerHeight}
                  visibility={true}
                  translate={`translate(${this.state.translate}, 0)`}
                  onMouseDown={this.onMouseDown}
                />
              </VolumeBar>
            </VolumeBarWrapper>
          }
        </Motion>
      </VolumeContainerWrapper>
    );
  }
}

export default VolumeContainer;
