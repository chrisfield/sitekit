import { PureComponent } from 'react';
import Swipe from 'react-easy-swipe';
import imagesLoaded from 'imagesloaded';

class Slider extends PureComponent {

  constructor(props) {
    super(props);
    this.state = Slider.slideTo(1);
    this.handleClick = this.handleClick.bind(this);
    this.handleSwipeLeft = this.handleSwipeLeft.bind(this);
    this.handleSwipeRight = this.handleSwipeRight.bind(this);
    this.handleSwipeUpOrDown = this.handleSwipeUpOrDown.bind(this);
    this.handleSwipeMove = this.handleSwipeMove.bind(this);
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
    this.setSliderViewElement = this.setSliderViewElement.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.adjustHeight = this.adjustHeight.bind(this);
  }

  componentDidMount() {
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
    if (!this.imagesLoaded) {
      imagesLoaded(this.sliderViewElement, () => {this.imagesLoaded = true; this.adjustHeight();});
    } else {
      const style = window.getComputedStyle(this.currentSlide);
      this.sliderViewElement.style.maxHeight = `calc(${this.currentSlide.offsetHeight}px + ${style.marginTop} + ${style.marginBottom})`;
    }
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

  static slideTo (slideIndex, isSmoothTransform = true, dragOffset = 0) {
    return {slideIndex, isSmoothTransform, dragOffset};
  }

  handleTransitionEnd() {
    this.setState(state => {
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

  handleSwipeStart(event) {
    console.log('Start swiping...', event);
  }

  handleSwipeMove(position, event) {
    console.log('move', position);
    if (event.type === "touchmove") {
      if (Math.abs(position.y) > Math.abs(position.x)) {
        return false;
      }
    }
    this.setState(Slider.slideTo(this.state.slideIndex, true, position.x));
    return event.type !== 'touchmove';
  }

  handleSwipeEnd(event) {
    console.log('End swiping...', event);
  } 

  handleSwipeRight() {
    console.log('swipe right');
    this.preventClick = true;
    this.previous();
  } 

  handleSwipeLeft() {
    this.preventClick = true;
    this.next();
  } 

  handleSwipeUpOrDown() {
    this.preventClick = true;
  }

  handleClick(event) {
    if (this.preventClick) {
      this.preventClick = false;
      event.preventDefault();
      event.stopPropagation();
    }
  }


  render() {
    const height = this.props.height;
    const width = this.props.width;
    const { slideIndex, isSmoothTransform, dragOffset } = this.state;
    const slides = this.props.children.slice();
    const lastSlide = slides[slides.length - 1];
    slides.push(slides[0]);
    slides.unshift(lastSlide);
    return (
      <div className="slider">
        <Swipe
          allowMouseEvents={true}
          onSwipeRight={this.handleSwipeRight}
          onSwipeLeft={this.handleSwipeLeft}
          onSwipeUp={this.handleSwipeUpOrDown}
          onSwipeDown={this.handleSwipeUpOrDown}
          onSwipeStart={this.handleSwipeStart}
          onSwipeMove={this.handleSwipeMove}
          onSwipeEnd={this.handleSwipeEnd}
        >
          <div 
            className={`sliderView ${isSmoothTransform? 'sliderView-smooth': ''}`}
            ref={this.setSliderViewElement}
            onClickCapture={this.handleClick}
            onTransitionEnd={this.handleTransitionEnd}
          >
            {
              slides.map((slide, index) => (
                <div key={index} ref={el => {if (index === slideIndex){this.currentSlide = el;}}}className="slide">
                  {slide}
                </div>
              ))
            }
          </div>
        </Swipe>
        {this.state.slideIndex + ''}
        <span className="previous" onClick={this.previous}>&#10094;</span>
        <span className="next" onClick={this.next}>&#10095;</span>
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
            overflow: hidden;
            position: relative;
          }

          .sliderView {
            display: flex;
            width: 100%;
            align-items: center;
            transform: translate(calc(-${slideIndex * 100}% + ${dragOffset}px), 0);
          }

          .sliderView-smooth {
            transition: transform 1.25s ease-out, max-height 1.25s ease-out;
          }

          .slide {
            box-sizing: border-box;
            flex: 0 0 100%;
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