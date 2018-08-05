import Slider from '../components/slider';
import withFixedProps from '../components/with-fixed-props';
import ImageCard from '../components/image-card';


const dimensions = {
  height:'100vh - 10px', 
  width:'100vw - 10px'
};

const ImageCardSlide = withFixedProps({
  ...dimensions,
  textHeight: '3em'
})(ImageCard);

export default () => {
  return (
    <div className="sliderWrap">
      <Slider {...dimensions}>
        <ImageCardSlide src="http://www.angelasidwell.com/images/ghost.jpg">
          <p>This is the first <em>image</em></p>
        </ImageCardSlide>
        <ImageCardSlide src="http://www.angelasidwell.com/images/fox.jpg" alt=""/>
        <ImageCardSlide src="http://www.angelasidwell.com/images/fox-track.jpg" alt=""/>
        <ImageCardSlide src="http://www.angelasidwell.com/images/crossing-point-detail.jpg" alt=""/>
      </Slider>
      <style jsx> {`
        .sliderWrap {
          display: flex;
          align-items: center;
          box-sizing: border-box;;
          height: 100vh;
        }
        p {
          margin: 5px 0 0 0;
        }
      `}
      </style>
    </div>
  )
}