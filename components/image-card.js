export default (props) => {
  const height = props.height;
  const width = props.width;
  return (
    <div className="imageCard">
      <img src={props.src} alt=""/>
      <div className="children">{props.children}</div>
      <style jsx> {`
        .imageCard {
          text-align: center;
        }
        img {
          box-sizing: border-box;
          display: inline-block;
          object-fit: contain;
          max-height: calc(${height} - 3em);
          max-width: calc(${width});
        }
        .children {
          box-sizing: border-box;
          height: 3em;
          overflow: auto;
          line-height: initial;
        }
      `}
      </style>      
    </div>
  )
};
