import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

let lastSwiped = 0;
let postTouchCheckTime = 1000;
let lastMovedTouch = 0;

const debounce = function(fn) {
  // Setup a timer
  var timeout;

  // Return a function to run debounced
  return function() {
    // Setup the arguments
    var context = this;
    var args = arguments;

    // If there's a timer, cancel it
    if (timeout) {
      window.cancelAnimationFrame(timeout);
    }

    // Setup the new requestAnimationFrame()
    timeout = window.requestAnimationFrame(function() {
      fn.apply(context, args);
    });
  };
};

class Touch {
  constructor(gestures, touchEvent) {
    this.gestures = gestures;
    this.identifier = touchEvent.identifier;
    this.startTime = Date.now();
    this.x = Math.round(touchEvent.pageX);
    this.y = Math.round(touchEvent.pageY);
    this.startSpot = { x: this.x, y: this.y };
    this.endSpot = {};
  }
  getDuration() {
    return Date.now() - this.startTime;
  }
  getDistance() {
    let distance = {
      x: this.x - this.startSpot.x,
      y: this.y - this.startSpot.y
    };
    return distance;
  }
  getSwipe() {
    let duration = this.getDuration();
    let distance = this.getDistance();
    if (distance.y <= this.gestures.swipe.north.distance && duration <= this.gestures.swipe.north.duration) {
      return 'north';
    } else if (distance.y >= this.gestures.swipe.south.distance && duration <= this.gestures.swipe.south.duration) {
      return 'south';
    } else if (distance.x <= this.gestures.swipe.west.distance && duration <= this.gestures.swipe.west.duration) {
      return 'west';
    } else if (distance.x >= this.gestures.swipe.east.distance && duration <= this.gestures.swipe.east.duration) {
      return 'east';
    }
  }
}
export class TouchHandler {
  constructor() {
    console.big('TTTTOOOOUUUCCCHHHHHANNNDDDLEERR');
    this.bound = false;
    this.currentTouches = [];
    this.currentTouch = undefined;
    this.gestures = {
      tap: {
        time: 75,
        distance: 2
      },
      swipe: {
        north: {
          // 'distance': -30,
          distance: -20,
          // 'duration': 100
          duration: 100
        },
        south: {
          distance: 20,
          duration: 100
        },
        west: {
          distance: -40,
          duration: 100
        },
        east: {
          distance: 40,
          duration: 100
        }
      }
    };
    this.swipeActions = {};
  }
  getSwipe() {
    let duration = Date.now() - this.touchStartTime;
    let distance = {
      x: this.currentTouch.x - this.touchStartSpot.x,
      y: this.currentTouch.y - this.touchStartSpot.y
    };
    
    let swipe = '';
    if (distance.y <= this.gestures.swipe.north.distance && duration <= this.gestures.swipe.north.duration) {
      swipe += 'north';
    } else if (distance.y >= this.gestures.swipe.south.distance && duration <= this.gestures.swipe.south.duration) {
      swipe += 'south';
    } else if (distance.x <= this.gestures.swipe.west.distance && duration <= this.gestures.swipe.west.duration) {
      swipe += 'west';
    } else if (distance.x >= this.gestures.swipe.east.distance && duration <= this.gestures.swipe.east.duration) {
      swipe += 'east';
    }
    return swipe;
  }
  touchStart = event => {
    const newTouch = event.targetTouches[0];
    this.currentTouch = { x: Math.round(newTouch.pageX), y: Math.round(newTouch.pageY) };
    this.touchStartTime = Date.now();
    this.touchStartSpot = { x: this.currentTouch.x, y: this.currentTouch.y };
    const targetId = event.target.id;
    let sectionIndex;
    if (targetId.split('-')[0] === 'section') {
      sectionIndex = targetId.split('-')[1];
    } else {
      sectionIndex = 3;
    }
    this.touchStartSection = document.querySelector(`#section-${sectionIndex}`);
    this.touchStartScrollY = this.touchStartSection.scrollTop;
  };
  touchMove = event => {
    const movingTouch = event.targetTouches[0];
    const touchCopy = { pageX: Math.round(movingTouch.pageX), pageY: Math.round(movingTouch.pageY) };
    this.currentTouch.x = touchCopy.pageX;
    this.currentTouch.y = touchCopy.pageY;    
    const swiped = this.getSwipe();
    if (swiped) {
      const scrolled = this.touchStartSection && this.touchStartSection.scrollTop !== this.touchStartScrollY;
      if (!scrolled) {
        this.swipeActions[swiped](event);
      }
    }
  };

  touchEnd = () => {
    if (this.currentTouch) {
      this.currentTouch = undefined;
    }
  };
  setInputs(el) {
    el.addEventListener('touchstart', this.touchStart, { passive: true });
    el.addEventListener('touchmove', this.touchMove, { passive: true });
    el.addEventListener('touchend', this.touchEnd, { passive: true });
  }
}
