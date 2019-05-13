let lastSwiped = 0;

export class Touch {
  constructor(handler, touchEvent) {
    this.handler = handler;
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
    let distance = {};
    distance.x = this.x - this.startSpot.x;
    distance.y = this.y - this.startSpot.y;
    return distance;
  }
  getSwipe() {
    let fullSwipe = "";
    let duration = this.getDuration();
    let distance = this.getDistance();
    if (distance.y <= this.handler.gestures.swipe.north.distance && duration <= this.handler.gestures.swipe.north.duration) {
      fullSwipe += "north";
    }
    if (distance.y >= this.handler.gestures.swipe.south.distance && duration <= this.handler.gestures.swipe.south.duration) {
      fullSwipe += "south";
    }
    if (distance.x <= this.handler.gestures.swipe.west.distance && duration <= this.handler.gestures.swipe.west.duration) {
      fullSwipe += "west";
    }
    if (distance.x >= this.handler.gestures.swipe.east.distance && duration <= this.handler.gestures.swipe.east.duration) {
      fullSwipe += "east";
    }
    return fullSwipe;
  }
}
export class TouchHandler {
  constructor() {
    this.bound = false;
    this.currentTouches = [];
    this.gestures = {
      'tap': {
        'time': 75,
        'distance': 10
      },
      'swipe': {
        'north': {
          'distance': -30,
          'duration': 100
        },
        'south': {
          'distance': 30,
          'duration': 100
        },
        'west': {
          'distance': -40,
          'duration': 100
        },
        'east': {
          'distance': 40,
          'duration': 100
        }
      }
    };
    this.swipeActions = {
      'north': function () {
        console.green("UP");
        window.scrollBy({
          top: window.innerHeight,
          behavior: 'smooth'
        })
      },
      'south': function () {
        console.green("DOWN");
        window.scrollBy({
          top: -window.innerHeight,
          behavior: 'smooth'
        })
      },
      'west': function () {
        console.green("LEFT");
      },
      'east': function () {
        console.green("RIGHT");
      },
      'northwest': function () {
        console.green("UP-LEFT");
      },
      'northeast': function () {
        console.green("UP-RIGHT");
      },
      'southwest': function () {
        console.green("DOWN-LEFT");
      },
      'southeast': function () {
        console.green("DOWN-RIGHT");
      },
    };
  }
  touchStart(event) {
    for (var i = 0; i < event.changedTouches.length; i++) {
      var newTouch = event.changedTouches[i];
      this.currentTouches.push(new Touch(this, newTouch));
    }
  }
  touchMove(event) {
    var movingTouches = [];
    for (var i = 0; i < event.changedTouches.length; i++) {
      var movingTouch = event.changedTouches[i];
      var touchCopy = { 'identifier': movingTouch.identifier, 'pageX': movingTouch.pageX, 'pageY': movingTouch.pageY };
      movingTouches.push(touchCopy);
    }
    movingTouches.forEach(function (touchEvent) {
      var touchObject = new Touch(this, touchEvent);
      // take each touch that moved...
      this.currentTouches.forEach(function (existingTouch, j) {
        //...find it in the list...
        if (touchObject.identifier === existingTouch.identifier) {
          //...replace the old {x,y} with the new one
          this.currentTouches[j].x = touchObject.x;
          this.currentTouches[j].y = touchObject.y;
          // check if it has completed a swipe
          var swiped = this.currentTouches[j].getSwipe();
          if (swiped && (window.performance.now() - lastSwiped) > 500) {
            this.swipeActions[swiped]();
            lastSwiped = window.performance.now();
          }
        }
      },this);
    },this);
  }
  touchEnd(event) {
    Array.from(event.changedTouches).forEach(function (touch, i) {
      var duration = this.currentTouches[i].getDuration();
      var distance = this.currentTouches[i].getDistance();
      // if (duration <= this.gestures.tap.time
      //   && distance.x <= this.gestures.tap.distance && distance.y < this.gestures.tap.distance) {
      //   true;
      // }
      this.currentTouches.splice(i, 1);
    },this);
  }
  setInputs() {
    document.body.addEventListener('touchstart', this.touchStart.bind(this), true);
    document.body.addEventListener('touchmove', this.touchMove.bind(this), true);
    document.body.addEventListener('touchend', this.touchEnd.bind(this), true);
    this.bound = true;
  }
}