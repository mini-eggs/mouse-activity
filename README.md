# Mouse Activity

## Install

```bash
npm i -s mouse-activity
```

## Usage

```javascript
import mouse from "mouse-activity"

mouse()
  .active(() => console.log("active"))
  .inactive(() => console.log("inactive"))
  // .destroy(); // would stop the two func above from being called+listening to mouse movements
```
