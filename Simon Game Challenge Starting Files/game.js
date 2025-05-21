// Danh sách các màu mà trò chơi sử dụng
const buttonColours = ["red", "blue", "green", "yellow"];

// Mảng lưu lại chuỗi màu do hệ thống tạo ra (mẫu cần người chơi làm theo)
let gamePattern = [];

// Mảng lưu lại chuỗi màu mà người chơi đã click
let userClickedPattern = [];

// Biến kiểm tra xem trò chơi đã bắt đầu hay chưa
let started = false;

// Biến lưu cấp độ hiện tại
let level = 0;

// Lắng nghe sự kiện nhấn phím bất kỳ để bắt đầu trò chơi
$(document).keypress(() => {
  if (!started) {
    updateLevelTitle(); // Cập nhật tiêu đề Level
    nextSequence(); // Tạo chuỗi màu đầu tiên
    started = true; // Đánh dấu là trò chơi đã bắt đầu
  }
});

// Lắng nghe sự kiện khi người dùng click vào một trong bốn nút màu
$(".btn").click(function () {
  const userChosenColour = $(this).attr("id"); // Lấy id (màu) của nút được click
  userClickedPattern.push(userChosenColour); // Thêm màu đó vào mảng của người chơi

  playSound(userChosenColour); // Phát âm thanh tương ứng với màu
  animatePress(userChosenColour); // Hiệu ứng nhấn nút

  // Kiểm tra xem người chơi đã chọn đúng chuỗi màu chưa
  checkAnswer(userClickedPattern.length - 1);
});

// Hàm kiểm tra câu trả lời của người chơi
function checkAnswer(currentIndex) {
  // So sánh màu ở vị trí hiện tại của người chơi với hệ thống
  if (gamePattern[currentIndex] === userClickedPattern[currentIndex]) {
    // Nếu người chơi đã nhập đủ chuỗi màu và đúng
    if (userClickedPattern.length === gamePattern.length) {
      // Đợi 1 giây rồi chuyển sang vòng tiếp theo
      setTimeout(nextSequence, 1000);
    }
  } else {
    // Nếu người chơi chọn sai
    handleGameOver();
  }
}

// Hàm tạo ra màu tiếp theo và cập nhật chuỗi hệ thống
function nextSequence() {
  userClickedPattern = []; // Xóa mảng người chơi để chuẩn bị cho vòng mới
  level++; // Tăng level
  updateLevelTitle(); // Hiển thị cấp độ mới

  // Tạo màu ngẫu nhiên từ mảng buttonColours
  const randomIndex = Math.floor(Math.random() * buttonColours.length);
  const randomChosenColour = buttonColours[randomIndex];
  gamePattern.push(randomChosenColour); // Thêm màu mới vào chuỗi hệ thống

  // Hiển thị hiệu ứng nút sáng và phát âm thanh
  animateButton(randomChosenColour);
  playSound(randomChosenColour);
}

// Cập nhật dòng tiêu đề để hiển thị cấp độ hiện tại
function updateLevelTitle() {
  $("#level-title").text("Level " + level);
}

// Thêm hiệu ứng nhấn nút khi người chơi click
function animatePress(color) {
  const button = $("#" + color);
  button.addClass("pressed");
  setTimeout(() => button.removeClass("pressed"), 100); // Gỡ hiệu ứng sau 100ms
}

// Hiển thị hiệu ứng nhấp nháy của nút màu khi được chọn bởi hệ thống
function animateButton(color) {
  const button = $("#" + color);
  button.fadeIn(100).fadeOut(100).fadeIn(100); // Nhấp nháy nút
}

// Phát âm thanh tương ứng với màu được truyền vào
function playSound(name) {
  const audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

// Xử lý khi người chơi thua trò chơi
function handleGameOver() {
  playSound("wrong"); // Phát âm thanh sai
  $("body").addClass("game-over"); // Thêm class hiệu ứng màu nền đỏ

  // Thông báo kết thúc trò chơi
  $("#level-title").text("Game Over, Press Any Key to Restart");

  // Gỡ hiệu ứng "game-over" sau 200ms
  setTimeout(() => $("body").removeClass("game-over"), 200);

  // Reset trò chơi để chơi lại từ đầu
  resetGame();
}

// Hàm reset trò chơi về trạng thái ban đầu
function resetGame() {
  level = 0;
  gamePattern = [];
  started = false;
}
