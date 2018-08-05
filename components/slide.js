export default (props) => {
  return (
    <div className="slide">
      {props.children}
      <style jsx> {`
        .slide {
          height: calc(${props.height});
          width: calc(${props.width});
          display: flex;
          justify-content: center;
          align-items: center;
          box-sizing: content-box;
          line-height: 0;
        }
      `}
      </style>
    </div>
  )
};
