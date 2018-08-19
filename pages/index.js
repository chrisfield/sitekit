import Slider from '../components/slider';
import withFixedProps from '../components/with-fixed-props';
import ImageCard from '../components/image-card';


const dimensions = {
  width:'100vw - 10px'
};

const ImageCardSlide = withFixedProps({
  width:'100vw - 10px',
  height:'90vh - 10px', 
  textHeight: '3em'
})(ImageCard);

const SmallImageCardSlide = withFixedProps({
  width:'100vw - 10px',
  height:'50vh - 10px', 
  textHeight: '3em'
})(ImageCard);

export default () => {
  return (
    <div>
      <Slider {...dimensions}>
        <ImageCardSlide src="http://www.angelasidwell.com/images/ghost.jpg">
          <p>This is the first <em>image</em></p>
        </ImageCardSlide>
        <SmallImageCardSlide src="http://www.angelasidwell.com/images/fox.jpg" alt=""/>
        <ImageCardSlide src="http://www.angelasidwell.com/images/fox-track.jpg" alt=""/>
        <ImageCardSlide src="http://www.angelasidwell.com/images/crossing-point-detail.jpg" alt=""/>
      </Slider>
      <style jsx> {`
        p {
          margin: 5px 0 0 0;
        }
      `}
      </style>
    </div>
  )
}