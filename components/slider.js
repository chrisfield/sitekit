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
    this.adjustHeight = this.adjustHeight.bind(this);
  }

  componentDidMount() {
    new HorrizontalSwipeListener(this.sliderViewElement, this.next, this.previous);
    this.startTimer();
    this.adjustHeight();
  }

  componentDidUpdate() {
    this.adjustHeight();
  }

  startTimer() {
    clearInterval(this.timer);
    this.timer = setInterval(this.next, 5000);
  }

  adjustHeight() {
    const style = window.getComputedStyle(this.currentSlide);
    this.sliderViewElement.style.maxHeight = `calc(${this.currentSlide.offsetHeight}px + ${style.marginTop} + ${style.marginBottom})`;
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
    this.sliderViewElement = ref;
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
        <div className={`sliderView ${isSmoothTransform? 'sliderView-smooth': ''}`} ref={this.setSliderViewElement} onTransitionEnd={this.handleTransitionEnd}>
          {slides.map((slide, index) => (
            <div key={index} ref={el => {if (index === slideIndex){this.currentSlide = el;}}}className="slide">
              {slide}
            </div>
          ))}
        </div>
        <a className="previous" onClick={this.previous}>&#10094;</a>
        <a className="next" onClick={this.next}>&#10095;</a>
        <div className="bullets">
          {this.props.children.map((_, index) => (
            <span key={index} className="bullet">
              {index + 1 === slideIndex? 'x': 'o'}
            </span>
          ))}
        </div>
        <style jsx>{`
          .slider {
            border: 5px solid: blue;
            box-sizing: border-box;
            width: calc(${width});
            margin: auto;
            overflow-x: hidden;
            position: relative;
          }

          .sliderView {
            display: flex;
            width: 100%;
            align-items: center;
            transform: translate(-${slideIndex * 100}%, 0);
          }

          .sliderView-smooth {
            transition: transform 1.25s ease-out, max-height 1.25s ease-out;
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

          .bullets {
            display: inline-block;
            height: 60px;
          }

        `}
        </style>
      </div>
    );
  }
}

export default Slider;