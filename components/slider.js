import { PureComponent } from 'react';

class Slider extends PureComponent {
  render() {
    const height = this.props.height;
    const width = this.props.width;
    return (
      <div className="slider">
        <div className="sliderView">
          {this.props.children.map((child, index) => (
            React.cloneElement(child, {
              key: index,
              height: `${height}`,
              width: `${width}`                  
            })
          ))}
        </div>
        <a>-</a>
        <a>+</a>
        <style jsx>{`
          .slider {
            box-sizing: border-box;
            width: calc(${width});
            height: calc(${height});
            margin: auto;
            overflow: hidden;
          }
        `}
        </style>
      </div>
    );
  }
}

export default Slider;