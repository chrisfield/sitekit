export default class HorrizontalSwipeListener {
  constructor(element, leftCallback = noop, rightCallback = noop) {
    this.leftCallback = leftCallback;
    this.rightCallback = rightCallback;
    this.swipeStart = this.swipeStart.bind(this);
    this.swipeEnd = this.swipeEnd.bind(this);
    addMultipleListeners(element, 'mousedown touchstart', this.swipeStart);
    addMultipleListeners(element, 'mousemove touchmove', swipeMove);
    addMultipleListeners(element, 'mouseup touchend', this.swipeEnd);
  }

  swipeStart(e) {
    e = e ? e : window.event;
    e = ('changedTouches' in e)? e.changedTouches[0] : e;
    this.touchStartCoords = {x: e.pageX, y: e.pageY};
    this.startTime = new Date().getTime();
  }
  
  swipeEnd(e) {
    e = e? e: window.event;
    e = ('changedTouches' in e)? e.changedTouches[0]: e;
    const elapsedTime = new Date().getTime() - this.startTime;
    if (elapsedTime <= maxAllowedTime){
      const touchEndCoords = {'x':e.pageX - this.touchStartCoords.x, 'y':e.pageY - this.touchStartCoords.y};
      if (Math.abs(touchEndCoords.x) >= minDistanceXAxis && Math.abs(touchEndCoords.y) <= maxDistanceYAxis){
        const callback = (touchEndCoords.x < 0)? this.leftCallback : this.rightCallback;
        callback(e);
      }
    }
  }
}

const minDistanceXAxis = 30;
const maxDistanceYAxis = 30;
const maxAllowedTime = 1000;

const swipeMove = e => {
  e = e ? e : window.event;
  e.preventDefault();
};

const addMultipleListeners = (el, s, fn) => {
  var evts = s.split(' ');
  for (var i=0, iLen=evts.length; i<iLen; i++) {
    el.addEventListener(evts[i], fn, false);
  }
};

const noop = () => {};
