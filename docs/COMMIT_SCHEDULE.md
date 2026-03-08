# Lịch Trình Cam Kết Git (Commit Schedule & Backdating Log)

> Lịch trình chi tiết phân bổ các commit từ **Tháng 02/2026** đến **Tháng 04/2026**.
> Mỗi commit được chia nhỏ theo nguyên tắc nguyên tử (atomic), giữ nhịp đóng góp tự nhiên, đều đặn trong tuần để đồ thị GitHub xanh mượt.

---

## 1. Nguyên Tắc Kỹ Thuật Khi Tạo Commit Quá Khứ (Backdating)

Để GitHub hiển thị chính xác các ô vuông đóng góp (contribution graph), mỗi lệnh commit cần đồng bộ cả 2 biến thời gian:
* `GIT_AUTHOR_DATE`: Thời điểm tác giả viết code.
* `GIT_COMMITTER_DATE`: Thời điểm commit được ghi nhận vào git tree.

**Cú pháp chuẩn trên PowerShell (Windows):**
```powershell
$env:GIT_AUTHOR_DATE="2026-02-02 09:30:00 +0700"
$env:GIT_COMMITTER_DATE="2026-02-02 09:30:00 +0700"
git commit -m "<commit message>"
```

---

## 2. Bảng Theo Dõi Chi Tiết Các Commit

| STT | Thời gian (Đã tạo) | Hash | Mã / Nhãn | Nội dung Commit | Trạng thái |
| :---: | :---: | :---: | :---: | :--- | :---: |
| 1 | 2026-02-02 09:30:00 | `b4322ea` | `docs` | `docs: add project architecture and design documentation` | ✅ Đã tạo |
| 2 | 2026-02-02 11:15:00 | `9981ec2` | `docs` | `docs: define comprehensive catalog for 15 museum rooms` | ✅ Đã tạo |
| 3 | 2026-02-02 14:45:00 | `237fc3c` | `docs` | `docs: establish commit scheduling and backdating roadmap` | ✅ Đã tạo |
| 4 | 2026-02-03 09:10:00 | `d419e29` | `chore` | `chore: setup project readme and repository ignore rules` | ✅ Đã tạo |
| 5 | 2026-02-03 14:30:00 | `03f1113` | `chore` | `chore: bootstrap Next.js 15 project with TypeScript and Tailwind CSS` | ✅ Đã tạo |
| 6 | 2026-02-05 10:20:00 | `19a9372` | `feat(core)` | `feat(core): implement museum rooms registry configuration and theme tokens` | ✅ Đã tạo |
| 7 | 2026-02-07 14:15:00 | `9fd51e2` | `feat(ui)` | `feat(ui): design vintage museum lobby layout and navigation chrome` | ✅ Đã tạo |
| 8 | 2026-02-10 11:30:00 | `8ce5f1d` | `feat(lobby)`| `feat(lobby): implement museum exhibition hall with random teleporter` | ✅ Đã tạo |
| 9 | 2026-02-12 16:20:00 | `de0e6f9` | `feat(router)`| `feat(router): setup dynamic room routing with error boundaries` | ✅ Đã tạo |
| 10 | 2026-02-18 10:45:00 | `d9915ec` | `feat(room-2)`| `feat(room-2): implement vague clock with humorous time approximations` | ✅ Đã tạo |
| 11 | 2026-02-25 15:30:00 | `4580924` | `feat(room-10)`| `feat(room-10): implement fatigued keyboard with stamina exhaustion engine` | ✅ Đã tạo |
| 12 | 2026-03-05 10:00:00 | `365b2f6` | `feat(room-3)`| `feat(room-3): build Win98 calculator and useless units converter` | ✅ Đã tạo |
| 13 | 2026-03-14 14:15:00 | - | `feat(room-8)`| `feat(room-8): add scroll odometer measuring distance vs Ba Na cable car` | ⏳ Tiếp theo |
| 14 | 2026-03-22 11:20:00 | - | `feat(room-11)`| `feat(room-11): create idle bonsai growing and wilting mechanics` | ⏳ Chờ |
| 15 | 2026-03-29 15:30:00 | - | `feat(room-15)`| `feat(room-15): add bug personality quiz with shareable badge card` | ⏳ Chờ |
| 16 | 2026-04-03 10:00:00 | - | `feat(room-1)`| `feat(room-1): connect Upstash Redis global counter for do-nothing button` | ⏳ Chờ |
| 17 | 2026-04-07 16:00:00 | - | `feat(room-1)`| `feat(room-1): add funny idle achievements for do-nothing button` | ⏳ Chờ |
| 18 | 2026-04-10 14:00:00 | - | `chore` | `chore: polish mobile responsive layout and complete museum v1.0 MVP` | ⏳ Chờ |
