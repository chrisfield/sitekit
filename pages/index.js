import Slider from '../components/slider';
import Slide from '../components/slide';
import createImageCard from '../components/create-image-card';

const dimensions = {
  height:'100vh - 10px', 
  width:'100vw - 10px'
};

const ImageCard = createImageCard({
  ...dimensions,
  textHeight: '3em'
}); 

export default () => {
  return (
    <div className="sliderWrap">
      <Slider {...dimensions}>
        <Slide>
          <ImageCard src="http://www.angelasidwell.com/images/ghost.jpg">
            <p>This is the first <em>image</em></p>
          </ImageCard>
        </Slide>
        <Slide>
          <ImageCard src="http://www.angelasidwell.com/images/fox.jpg" alt=""/>
        </Slide>
        <Slide>
          <ImageCard src="http://www.angelasidwell.com/images/fox-track.jpg" alt=""/>
        </Slide>
        <Slide>
          <ImageCard src="http://www.angelasidwell.com/images/crossing-point-detail.jpg" alt=""/>
        </Slide>
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