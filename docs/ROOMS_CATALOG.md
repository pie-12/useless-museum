# Danh Mục Phòng Trưng Bày - Bảo Tàng Đồ Vô Dụng

Bảo tàng gồm 15 phòng trưng bày với các phong cách thị giác và độ phức tạp kỹ thuật đa dạng. Dưới đây là bảng đặc tả chi tiết của từng phòng:

---

## 1. Phòng 01: Nút Chả Làm Gì (The Do-Nothing Button)
* **Slug**: `do-nothing-button`
* **Vibe/Style**: Brutalism tối giản, một nút bấm khổng lồ ở giữa màn hình.
* **Cơ chế**: Bấm vào không có gì xảy ra trên màn hình thực tế, nhưng bộ đếm toàn cầu tăng lên. Mỗi mốc bấm (1, 10, 69, 100, 404, 1000...) sẽ mở khóa một thành tựu vô nghĩa (ví dụ: *"Kẻ rảnh rỗi cấp độ 3"*).
* **Kỹ thuật**: Client Optimistic UI + Upstash Redis Atomic `INCR` + LocalStorage lưu huy hiệu cá nhân.
* **Độ phức tạp**: Trung bình (cần xử lý chống spam batching).

---

## 2. Phòng 02: Đồng Hồ Mơ Hồ (The Vague Clock)
* **Slug**: `vague-clock`
* **Vibe/Style**: Vintage Paper / Đồng hồ treo tường cổ điển mộc mạc.
* **Cơ chế**: Không hiển thị số giờ chính xác. Chỉ hiển thị các câu ước lượng theo văn hóa Việt Nam:
  * 06:15 ➔ "Trời tờ mờ sáng, ngủ tiếp đi"
  * 11:45 ➔ "Gần trưa rồi, nghĩ xem trưa nay ăn gì"
  * 14:30 ➔ "Nửa buổi chiều rồi, thèm ly trà sữa ghê"
  * Càng về đêm muộn, đồng hồ càng lười nói, chỉ hiện dấu "..." hoặc ngủ gật.
* **Kỹ thuật**: 100% Client-side. Javascript Date calculation + Text mapper.
* **Độ phức tạp**: Dễ (Quick Win mở màn).

---

## 3. Phòng 03: Bộ Đổi Đơn Vị Vô Dụng (Useless Converter)
* **Slug**: `useless-converter`
* **Vibe/Style**: Win98 Calculator cổ điển (xám tro, nút nổi, viền vát 3D).
* **Cơ chế**: Chuyển đổi các đơn vị chuẩn (km, kg, giờ, tiền VND) sang các đơn vị trời ơi đất hỡi:
  * 5 km = 1.250.000 lần nhấn phím Space, hoặc 1.400 cốc trà đá vỉa hè xếp nối tiếp.
  * 1 giờ = 120 lần thở dài trước màn hình code.
  * 50.000 VNĐ = 2 tô hủ tiếu gõ hoặc 0.0000001% tiền mua nhà Sài Gòn.
* **Kỹ thuật**: 100% Client-side. Form input, công thức quy đổi vui nhộn.
* **Độ phức tạp**: Dễ.

---

## 4. Phòng 04: Máy Tạo Lý Do Nộp Trễ Deadline (Deadline Excuse Generator)
* **Slug**: `deadline-excuses`
* **Vibe/Style**: Bảng tin công sở / Sticky notes dán bừa bãi.
* **Cơ chế**: Nút "Xin một lý do" quay ngẫu nhiên các lý do nộp trễ deadline kinh điển hoặc oái oăm ("Mèo dẫm trúng nút rút điện ổ cứng", "Bug này do phong thủy"). Cho phép người xem bấm Upvote lý do tâm đắc nhất.
* **Kỹ thuật**: Supabase Database lưu danh sách lý do và số vote.
* **Độ phức tạp**: Trung bình.

---

## 5. Phòng 05: Cà Phê Nguội (Cold Coffee Curve)
* **Slug**: `cold-coffee`
* **Vibe/Style**: Cà phê phin mộc mạc, khói bốc nghi ngút.
* **Cơ chế**: Người dùng nhập giờ rót cà phê. Trang web tính toán đường cong suy giảm nhiệt độ theo định luật Newton về làm nguội, báo nhiệt độ thực tế hiện tại và đếm ngược thời gian "ly cà phê của bạn chính thức chuyển thành nước đắng vô vị".
* **Kỹ thuật**: Client-side Math + Canvas vẽ cốc cà phê giảm dần độ bốc khói.
* **Độ phức tạp**: Dễ.

---

## 6. Phòng 06: Chỗ Ngồi Duy Nhất (The Exclusive Seat)
* **Slug**: `the-only-seat`
* **Vibe/Style**: Rạp chiếu bóng bí ẩn / Một chiếc ghế đơn độc chiếu đèn spotlight.
* **Cơ chế**: Cả thế giới cùng lúc chỉ đúng 1 người được ngồi xem nội dung đặc biệt bên trong phòng (tối đa 60 giây). Những người khác khi vào sẽ thấy số thứ tự xếp hàng ("Bạn đang là người thứ 4 trong hàng đợi").
* **Kỹ thuật**: Supabase Realtime Presence & Broadcast + WebSocket Heartbeat để tránh rớt mạng bị kẹt ghế.
* **Độ phức tạp**: Khó (Cần kiểm soát concurrency & timeout).

---

## 7. Phòng 07: Thú Cưng Ăn Lỗi (Error Eater Pet)
* **Slug**: `error-eater`
* **Vibe/Style**: Tamagotchi / Pixel Pet thập niên 90.
* **Cơ chế**:
  * Trực tiếp trên Web: Sân tập thử nghiệm (Simulator) có các nút cố tình kích hoạt lỗi console (`ReferenceError`, `TypeError`, `SyntaxError`), chú pet pixel sẽ há mồm ăn lỗi và lớn lên hoặc béo phì.
  * Extension trình duyệt: Kèm link tải bộ cài Chrome Extension cài vào DevTools để nuôi pet bằng lỗi code thật hàng ngày.
* **Kỹ thuật**: Canvas Pixel Art / CSS Sprite + Window error event listener. Thư mục `extension/` chứa mã nguồn Manifest V3.
* **Độ phức tạp**: Trung bình (bản Web) - Khá (bản Extension).

---

## 8. Phòng 08: Đồng Hồ Cây Số Scroll (Scroll Mile)
* **Slug**: `scroll-mile`
* **Vibe/Style**: Bảng đồng hồ xe máy Honda Cub cũ kỹ.
* **Cơ chế**: Đo tổng quãng đường cuộn chuột của người dùng tính bằng milimet (dựa trên DPI màn hình). So sánh trực quan xem bạn đã cuộn chuột bằng độ cao Landmark 81, cáp treo Bà Nà, hay từ Hà Nội vào Phủ Lý.
* **Kỹ thuật**: Client-side Scroll Event + Calibrated Screen DPI.
* **Độ phức tạp**: Dễ.

---

## 9. Phòng 09: Nhạc Từ Git History (Git Symphony)
* **Slug**: `git-symphony`
* **Vibe/Style**: Bàn synthesizer điện tử / Hộp nhạc retro.
* **Cơ chế**: Người dùng nhập tên repo GitHub bất kỳ (hoặc nghe bản nhạc của chính repo `useless-museum`). Mỗi commit được chuyển đổi thành một nốt nhạc (Hash SHA ➔ Cao độ, Độ lớn diff ➔ Độ dài nốt). Nút Play sẽ chơi một bản giao hưởng commit kỳ quặc.
* **Kỹ thuật**: GitHub Public API + Tone.js (Web Audio API Synthesizer).
* **Độ phức tạp**: Khá (Cần xử lý audio web mượt mà).

---

## 10. Phòng 10: Bàn Phím Biết Mệt (Fatigued Keyboard)
* **Slug**: `tired-keyboard`
* **Vibe/Style**: Máy đánh chữ cơ cũ kỹ, thở hổn hển.
* **Cơ chế**: Một khung soạn thảo văn bản bình thường. Nhưng khi người dùng gõ phím quá nhanh, bàn phím sẽ bắt đầu "thở dốc": ký tự hiện ra trễ dần trễ mòn, phím nhảy lung tung, font chữ run rẩy rũ rượi. Chỉ khi bạn dừng tay nghỉ ngơi 3-5 giây, bàn phím mới "hồi sức".
* **Kỹ thuật**: Client-side Event Listeners + Fatigue stamina state loop.
* **Độ phức tạp**: Dễ (Ý tưởng độc đáo, code tinh gọn).

---

## 11. Phòng 11: Cây Lớn Khi Bạn Không Làm Gì (Idle Bonsai)
* **Slug**: `idle-bonsai`
* **Vibe/Style**: Tranh thủy mặc / Cây bonsai mộc mạc thanh tịnh.
* **Cơ chế**: Một hạt mầm nằm giữa màn hình. Miễn là bạn không chạm vào chuột, không gõ phím, không chuyển tab, cây sẽ từ từ đâm chồi, nở hoa rực rỡ kèm tiếng chim hót. Chỉ cần bạn nhúc nhích chuột 1 pixel, một cơn gió ùa tới cuốn bay lá và cây héo queo.
* **Kỹ thuật**: `requestIdleCallback` + Mouse/Keyboard event listeners + Canvas/SVG growth animation.
* **Độ phức tạp**: Trung bình.

---

## 12. Phòng 12: Ngôn Ngữ Quảng - Huế (Quang-Hue Lang Playground)
* **Slug**: `quang-hue-lang`
* **Vibe/Style**: Cố đô Huế trầm mặc, font chữ Thư pháp kết hợp Terminal hiện đại.
* **Cơ chế**: Một Web Playground cho phép viết mã bằng ngôn ngữ Quảng - Huế:
  * `răng` ➔ `if`
  * `rứa` ➔ `then` / `{}`
  * `chừ` ➔ `in ra / console.log`
  * `tê` ➔ `goto / return`
  * `mần` ➔ `function / loop`
  Chạy trực tiếp trên trình duyệt để in kết quả ra màn hình.
* **Kỹ thuật**: Transpiler nhẹ dịch sang JavaScript và chạy an toàn qua Web Worker.
* **Độ phức tạp**: Khá (Triển khai ở giai đoạn cuối).

---

## 13. Phòng 13: Còi Xe Simulator (Traffic Honk Impatience)
* **Slug**: `traffic-honk`
* **Vibe/Style**: Hoạt hình kẹt xe giờ tan tầm ngã tư Hàng Xanh / Ngã Tư Sở.
* **Cơ chế**: Mô phỏng kẹt xe đèn đỏ. Đèn đỏ còn 5 giây, người chơi bấm còi xe inh ỏi. Hệ thống tính điểm "Độ mất kiên nhẫn" (tần suất bấm, lực bấm/giữ) và xếp hạng bạn thuộc hệ "Người tu hành", "Công dân vội vã", hay "Hung thần bấm còi".
* **Kỹ thuật**: Web Audio API (âm thanh tiếng còi xe đa dạng) + Supabase Realtime Leaderboard.
* **Độ phức tạp**: Trung bình.

---

## 14. Phòng 14: Chat Một Chữ (One-Word Story)
* **Slug**: `one-word-chat`
* **Vibe/Style**: Cuốn sổ tay nhật ký cộng đồng chuyền tay nhau.
* **Cơ chế**: Tất cả người dùng cùng viết chung một câu chuyện kỳ quặc. Quy tắc: Mỗi lượt chỉ được nhập đúng 1 từ duy nhất, sau đó phải chờ người khác gửi từ tiếp theo mới được viết tiếp. Câu chuyện cuộn dài vô tận theo thời gian thực.
* **Kỹ thuật**: Supabase Realtime Broadcast & Database persistence. Cooldown IP/Session.
* **Độ phức tạp**: Khá.

---

## 15. Phòng 15: Trắc Nghiệm "Bạn Là Loại Bug Nào?" (Bug Personality Quiz)
* **Slug**: `bug-quiz`
* **Vibe/Style**: Tạp chí công nghệ Y2K / Thẻ căn cước kỳ dị.
* **Cơ chế**: 5 câu hỏi tình huống éo le. Kết quả phân loại bạn thành các chủng loại bug:
  * *Null Pointer Exception*: Hay biến mất bí ẩn khi người khác cần.
  * *Heisenbug*: Lúc kiểm tra thì bình thường, quay đi chỗ khác là hỏng.
  * *Race Condition*: Làm gì cũng cuống cuồng tranh giành lượt.
  Có nút tải ảnh thẻ căn cước bug sắc nét để share lên Facebook/Threads/Instagram.
* **Kỹ thuật**: Multi-step quiz state + HTML5 Canvas export image (HTML-to-Image / Canvas API).
* **Độ phức tạp**: Dễ - Trung bình.
