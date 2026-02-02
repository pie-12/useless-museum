# Kiến Trúc Hệ Thống - Bảo Tàng Đồ Vô Dụng (Useless Museum)

> Tài liệu chuẩn kiến trúc kỹ thuật dành cho dự án `useless-museum`. Tài liệu này đóng vai trò kim chỉ nam (Single Source of Truth) xuyên suốt quá trình phát triển để đảm bảo tính nhất quán và chống sai lệch thông tin (anti-hallucination).

---

## 1. Triết Lý Thiết Kế & Nguyên Tắc Cốt Lõi

1. **Vô dụng có chủ đích (Deliberately Useless)**: Mọi sản phẩm trong bảo tàng không nhằm giải quyết vấn đề thực tế, mà mang lại tiếng cười, sự bất ngờ và tò mò cho người dùng.
2. **Không rào cản (Zero-Friction)**: Người dùng mở link là tương tác được ngay lập tức trên mọi thiết bị (đặc biệt là Mobile). Tuyệt đối không bắt đăng ký, không login, không thu thập dữ liệu cá nhân.
3. **Cô lập tuyệt đối giữa các phòng (Fault-Isolation)**: Mỗi phòng là một module độc lập. Nếu một phòng gặp lỗi runtime (ví dụ lỗi API, crash render), chỉ phòng đó hiển thị biển báo "Đang tu sửa", toàn bộ sảnh chính và các phòng khác vẫn hoạt động bình thường.
4. **Đa dạng phong cách thị giác (Aesthetic Pluralism)**: Sảnh chính mang phong cách bảo tàng cổ điển mộc mạc (vé giấy, tem niêm phong, hoài niệm). Mỗi phòng con bên trong được tự do áp dụng bất kỳ phong cách thị giác nào (Win98, Retro Arcade, Cyberpunk Neon, Y2K, Gen Z meme...).
5. **Chi phí vận hành 0 VNĐ (Zero-Cost Infrastructure)**: Tận dụng hoàn toàn các giải pháp Serverless/BaaS có gói miễn phí vĩnh viễn (Vercel, Supabase, Upstash Redis).

---

## 2. Lựa Chọn Công Nghệ (Tech Stack)

* **Front-end Framework**: `Next.js 15` (App Router) với `TypeScript`
  * Lý do: Hỗ trợ dynamic routing `/rooms/[slug]`, SSG tối ưu tốc độ tải trang, `error.tsx` cô lập lỗi theo từng route, cộng đồng lớn và có giá trị cao trong CV tuyển dụng.
* **Styling**: `Tailwind CSS` + CSS Variables / Scoped Themes
  * Cho phép tùy biến theme theo từng phòng mà không bị xung đột CSS toàn cục.
* **Component Library**: `shadcn/ui` + `Lucide React`
  * Cung cấp các linh kiện cơ sở có tính tùy biến cao, không ép buộc một phong cách cố định.
* **Motion & Animation**: `Framer Motion` / `Canvas API`
  * Phục vụ các tương tác vật lý, cuộn chuột, hiệu ứng nảy và hoạt ảnh vui nhộn.
* **Backend & Dữ liệu chia sẻ (BaaS)**:
  * **Upstash Redis**: Lưu trữ bộ đếm toàn cầu tốc độ cao (Atomic `INCR`), phục vụ rate limiting chống spam.
  * **Supabase (PostgreSQL + Realtime)**: Lưu trữ bình chọn, quản lý kết nối realtime (Presence cho phòng hàng đợi, Broadcast cho phòng chat).
* **Hosting & CI/CD**: `Vercel` (Hobby Tier) liên kết tự động với GitHub Repository.

---

## 3. Kiến Trúc Điều Hướng & Đăng Ký Phòng (Museum Registry)

Mọi phòng trưng bày được đăng ký tập trung tại tệp cấu hình `src/config/rooms.config.ts`:

```typescript
export interface RoomMetadata {
  id: string;              // slug trên URL, ví dụ: 'vague-clock'
  title: string;           // Tên phòng: 'Đồng hồ mơ hồ'
  roomNumber: number;      // Số thứ tự phòng (1 - 15)
  tagline: string;         // Câu giới thiệu ngắn cộp mác châm biếm
  description: string;     // Mô tả chi tiết cách tương tác
  category: 'client-only' | 'shared-data' | 'realtime' | 'experimental';
  styleTheme: 'vintage' | 'win98' | 'y2k' | 'neon' | 'brutalist' | 'minimal';
  badge?: string;          // 'Mới mở', 'Đang đông', 'Hài hước'
  status: 'open' | 'maintenance' | 'draft';
}
```

* **Sảnh chính (`src/app/page.tsx`)**: Đọc từ danh sách metadata để render danh mục các phòng, hỗ trợ tìm kiếm, lọc theo thể loại và nút bấm trọng tâm: **"Dắt tôi đến một phòng ngẫu nhiên"**.
* **Định tuyến động (`src/app/rooms/[slug]/page.tsx`)**: Tự động ánh xạ `slug` để nạp component tương ứng từ thư mục `src/rooms/[slug]`.
* **Cơ chế phòng thủ lỗi (`src/app/rooms/[slug]/error.tsx`)**: Bắt mọi ngoại lệ cấp component và hiển thị thông báo thân thiện: *"Rất tiếc! Căn phòng này hiện đang được các kỹ sư bảo tàng quét dọn bụi bặm. Mời quý khách ghé phòng khác."*

---

## 4. Bảo Mật & Chống Phá Hoại (Anti-Abuse Strategy)

Vì bảo tàng theo tôn chỉ "Tự do văn hóa, không cần đăng nhập", các biện pháp phòng vệ kỹ thuật sau được áp dụng ở tầng client và edge:
1. **Batching & Debounce**: Phòng có tần suất tương tác cao (như Nút bấm, Còi xe) không gửi request liên tục lên server. Dữ liệu được đệm ở `localStorage` và gửi theo chu kỳ (ví dụ mỗi 3 - 5 giây gửi 1 lần).
2. **Fingerprinting & Cooldown**: Dùng token ẩn ngẫu nhiên lưu trong `sessionStorage` để giới hạn tốc độ (Rate limit: mỗi người chỉ gửi 1 tin/hành động trong X giây).
3. **Optimistic UI**: Client cập nhật số liệu ngay lập tức trên màn hình để tạo cảm giác phản hồi cực nhạy, việc đồng bộ với server diễn ra ngầm phía sau.
