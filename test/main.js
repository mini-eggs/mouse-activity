import mouse from "../";

mouse()
  .active(() => console.log("active"))
  .inactive(() => console.log("inactive"));
