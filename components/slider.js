import { PureComponent } from 'react';
import HorrizontalSwipeListener from './horrizontal-swipe-listener';

class Slider extends PureComponent {

  constructor(props) {
    super(props);
    this.state = Slider.slideTo(1);
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
    this.setSliderViewElement = this.setSliderViewElement.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }

  componentDidMount() {
    new HorrizontalSwipeListener(this.SliderViewElement, this.next, this.previous);
    this.startTimer();
  }

  startTimer() {
    clearInterval(this.timer);
    this.timer = setInterval(this.next, 3000);
  }

  previous() {
    this.startTimer();
    this.setState(state => {
      if (state.slideIndex === 0) {
        return Slider.slideTo(this.props.children.length);
      }
      return Slider.slideTo(state.slideIndex -1);
    });
  }

  next() {
    this.startTimer();
    this.setState(state => {
      if (state.slideIndex === this.props.children.length + 1) {
        return Slider.slideTo(1);
      }
      return Slider.slideTo(state.slideIndex + 1);
    });
  }

  static slideTo (slideIndex, isSmoothTransform = true) {
    return {slideIndex, isSmoothTransform};
  }

  handleTransitionEnd() {
    this.setState(state => {
      console.log(`state.slideIndex is ${state.slideIndex} (${this.props.children.length})`);
      switch (state.slideIndex) {
        case 0:
          return Slider.slideTo(this.props.children.length, false);
        case this.props.children.length + 1:
          return Slider.slideTo(1, false);
        default:
          return Slider.slideTo(state.slideIndex);
      }
    });
  }

  setSliderViewElement(ref) {
    this.SliderViewElement = ref;
  }

  render() {
    const height = this.props.height;
    const width = this.props.width;
    const slideIndex = this.state.slideIndex;
    const isSmoothTransform = this.state.isSmoothTransform;
    const slides = this.props.children.slice();
    const lastSlide = slides[slides.length - 1];
    slides.push(slides[0]);
    slides.unshift(lastSlide);
    return (
      <div className="slider">
        <div className="sliderView" ref={this.setSliderViewElement} onTransitionEnd={this.handleTransitionEnd}>
          {slides.map((slide, index) => (
            <div key={index} className="slide">
              {slide}
            </div>
          ))}
        </div>
        <a className="previous" onClick={this.previous}>&#10094;</a>
        <a className="next" onClick={this.next}>&#10095;</a>
        <style jsx>{`
          .slider {
            box-sizing: border-box;
            width: calc(${width});
            height: calc(${height});
            margin: auto;
            overflow: hidden;
            position: relative;
          }

          .sliderView {
            display: flex;
            width: 100%;
            align-items: center;
            transform: translate(-${slideIndex * 100}%, 0);
            transition: transform ${isSmoothTransform? '.25s': '0s'} ease-out;
          }

          .slide {
            box-sizing: border-box;
            flex: 0 0 calc(${width});
          }

          .previous, .next {
            background-color: rgba(0,0,0,0.3);
            cursor: pointer;
            position: absolute;
            top: 50%;
            width: auto;
            margin-top: -22px;
            padding: 16px;
            color: white;
            font-weight: bold;
            font-size: 18px;
            transition: 0.6s ease;
            border-radius: 0 3px 3px 0;
          }

          .next {
            right: 0;
            border-radius: 3px 0 0 3px;
          }

          .previous:hover, .next:hover {
            background-color: rgba(0,0,0,0.8);
          }

        `}
        </style>
      </div>
    );
  }
}

export default Slider;