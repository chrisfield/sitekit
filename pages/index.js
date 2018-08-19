import Slider from '../components/slider';
import withFixedProps from '../components/with-fixed-props';
import ImageCard from '../components/image-card';


const dimensions = {
  width:'100vw - 10px'
};

const ImageCardSlide = withFixedProps({
  width:'100vw - 10px',
  height:'100vh - 10px'
})(ImageCard);

export default () => {
  return (
    <div>
      <Slider {...dimensions}>
        <ImageCardSlide src="http://www.angelasidwell.com/images/ghost.jpg"/>
        <ImageCardSlide src="http://www.angelasidwell.com/images/fox.jpg" alt=""/>
        <ImageCardSlide src="http://www.angelasidwell.com/images/fox-track.jpg" alt=""/>
        <ImageCardSlide src="http://www.angelasidwell.com/images/crossing-point-detail.jpg" alt=""/>
      </Slider>
    </div>
  )
}