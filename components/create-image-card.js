const createImageCard = ({height, width, textHeight}) => {
  const imageCard = (props) => {
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
            max-height: calc(${height} - ${textHeight});
            max-width: calc(${width});
          }
          .children {
            box-sizing: border-box;
            height: ${textHeight};
            overflow: auto;
          }
        `}
        </style>      
      </div>
    );
  };
  return imageCard;
};

export default createImageCard;
