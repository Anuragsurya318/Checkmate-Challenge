export default class Referee {
  isValidMove(px, py, x, y, type) {
    // Unique log statement to identify the method call
    console.log("isValidMove method called with parameters:", px, py, x, y, type);
    console.log("Referee is checking the move...");
    console.log("Previous position: ", px, py);
    console.log("New position: ", x, y);
    console.log("Piece type: ", type);
    return true;
  }
}
