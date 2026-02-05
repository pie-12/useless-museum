export type RoomCategory = 'client-only' | 'shared-data' | 'realtime' | 'special';

export type RoomStyleTheme = 
  | 'vintage'      // Sảnh bảo tàng, giấy cũ, hoài niệm
  | 'win98'        // Giao diện Windows 98 cổ điển
  | 'y2k'          // Rực rỡ, metallic, cyberspace
  | 'brutalist'    // Nút bấm thô ráp, tối giản, tương phản cao
  | 'terminal'     // Màn hình CRT xanh lá, hacker retro
  | 'zen';         // Tĩnh lặng, trà đạo, tranh thủy mặc

export interface RoomMetadata {
  id: string;              // URL slug (vd: vague-clock)
  roomNumber: number;      // Số thứ tự phòng (1-15)
  title: string;           // Tên phòng tiếng Việt
  subtitle: string;        // Phụ đề hài hước
  tagline: string;         // Câu slogan ngắn
  description: string;     // Hướng dẫn tương tác
  category: RoomCategory;
  styleTheme: RoomStyleTheme;
  status: 'open' | 'maintenance' | 'coming-soon';
  author: string;          // Nghệ nhân / Kỹ sư vô dụng
  tags: string[];
}
