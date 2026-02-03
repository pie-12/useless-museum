# 🏛️ Bảo Tàng Đồ Vô Dụng (Useless Museum)

> *"Làm xong chẳng giúp ích gì cho cuộc sống, nhưng ai thấy cũng muốn bấm thử."*  
> Một dự án pet project tôn vinh sự vô nghĩa có chủ đích, lấy cảm hứng từ *The Useless Web* với phong cách và văn hóa Việt Nam.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js_15-black?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 🎟️ Giới Thiệu

Chào mừng bạn đến với **Bảo Tàng Đồ Vô Dụng**. Tại đây, chúng tôi bảo tồn và trưng bày những sáng kiến phần mềm kỳ quặc nhất mà bạn từng thấy trên Internet. Không có tính năng quản lý công việc, không có AI thay đổi nhân loại, chỉ có sự thư giãn và những nụ cười bất ngờ.

### ✨ Các Phòng Trưng Bày Độc Đáo (15 Phòng)

1. 🔘 **Nút chả làm gì**: Bấm không có gì xảy ra, chỉ có bộ đếm toàn cầu và bảng thành tựu rảnh rỗi.
2. 🕰️ **Đồng hồ mơ hồ**: Chỉ nói kiểu "Gần trưa rồi", càng về chiều càng lười nói.
3. 📏 **Bộ đổi đơn vị vô dụng**: 5 km = bao nhiêu lần bấm Enter, bao nhiêu ly trà đá vỉa hè.
4. 📝 **Máy tạo lý do nộp trễ deadline**: Quay lý do và cho cộng đồng bình chọn lý do hợp lý nhất.
5. ☕ **Cà phê nguội**: Nhập lúc pha, tính đường cong nhiệt độ và báo thời điểm ly cà phê hết ngon.
6. 💺 **Chỗ ngồi duy nhất**: Cả thế giới mỗi lúc chỉ đúng 1 người được vào xem, người sau xếp hàng chờ.
7. 👾 **Thú cưng ăn lỗi**: Trực tiếp trên web & Extension trình duyệt, thú cưng lớn lên nhờ ăn `console.error`.
8. 📜 **Đồng hồ cây số scroll**: Đo quãng đường bạn đã cuộn chuột rồi so sánh với cáp treo Bà Nà, đỉnh Fansipan.
9. 🎵 **Nhạc từ Git History**: Mỗi commit của bạn biến thành một nốt nhạc trong bản giao hưởng kỳ quặc.
10. ⌨️ **Bàn phím biết mệt**: Gõ phím càng hăng thì chữ hiện càng chậm và run rẩy, nghỉ tay mới hồi phục.
11. 🪴 **Cây lớn khi bạn không làm gì**: Động chuột hay gõ phím là cây héo rũ ngay lập tức.
12. 📜 **Ngôn ngữ Quảng - Huế**: Web playground lập trình bằng phương ngữ: `răng = if`, `rứa = then`, `chừ = print`, `tê = goto`.
13. 🚗 **Còi xe simulator**: Đo "độ mất kiên nhẫn" khi kẹt xe đèn đỏ kèm bảng xếp hạng hung thần.
14. 💬 **Chat một chữ**: Mỗi người mỗi lượt gửi đúng một từ, cùng nhau viết nên thiên tiểu thuyết quái dị.
15. 🐛 **Trắc nghiệm "Bạn là loại bug nào?"**: Null Pointer, Race Condition... kèm ảnh căn cước bug để sống ảo.

---

## 🛠️ Công Nghệ Sử Dụng

* **Core**: Next.js 15 (App Router), TypeScript, React 19.
* **UI & Styling**: Tailwind CSS, Lucide Icons, Framer Motion.
* **BaaS / Realtime**: Upstash Redis (Global Counters & Rate Limiting), Supabase (PostgreSQL & Realtime Presence).
* **Architecture**: Micro-exhibit Pattern với Error Boundaries độc lập cho từng phòng.

---

## 🚀 Cài Đặt & Chạy Cục Bộ

```bash
# 1. Clone repository
git clone https://github.com/pie-12/useless-museum.git
cd useless-museum

# 2. Cài đặt dependencies
npm install

# 3. Khởi chạy dev server
npm run dev

# 4. Mở trình duyệt tại http://localhost:3000
```

---

## 📄 Tài Liệu Dự Án

* 📐 [Kiến trúc hệ thống](docs/ARCHITECTURE.md)
* 🗺️ [Đặc tả 15 phòng trưng bày](docs/ROOMS_CATALOG.md)
* 📅 [Lịch trình phát triển & commit](docs/COMMIT_SCHEDULE.md)

---

## 📜 Giấy Phép

Phát hành dưới giấy phép MIT - Hãy thoải mái fork và đóng góp thêm các phòng vô dụng mới!
