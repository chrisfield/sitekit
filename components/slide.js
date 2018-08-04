export default (props) => {
  return (
    <div className="slide">
      {
        React.cloneElement(props.children, {
          height: `${props.height}`,
          width: `${props.width}`                  
        })
      }
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
