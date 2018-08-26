const ImageCard = (props) => {
  return (
    <div className="imageCard">
      <img src={props.src} alt={props.alt}/>
      <div className="children">{props.children}</div>
      <style jsx> {`
        .imageCard {
          text-align: center;
        }
        img {
          box-sizing: border-box;
          display: inline-block;
          object-fit: contain;
          max-height: 100%;
          max-width: 100%;
        }
        .children {
          box-sizing: border-box;
          height: ${props.textHeight};
          overflow: auto;
        }
      `}
      </style>      
    </div>
  );
};

ImageCard.defaultProps = {
  textHeight: '0px'
};
  
export default ImageCard;