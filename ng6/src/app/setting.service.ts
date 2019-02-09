import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class SettingService {
  constructor() {}

  getMenus() {
    return [
      { id: "0", title: "홈a", path: "home", type: "home-dashboard", children: [] },
      { id: "1", title: "앵귤러", path: "angular", type: "list", children: [] },
      { id: "2", title: "react", path: "react", type: "page", children: [] },
      {
        id: "3",
        title: "공지사항",
        path: "public",
        type: "list",
        children: [
          { id: "3-1", title: "새소식", path: "news", type: "list" },
          { id: "3-2", title: "보관소", path: "archive", type: "page" }
        ]
      },
      {
        id: "4",
        title: "자료실",
        path: "public",
        children: [
          { id: "4-1", title: "K-POP", path: "k-pop", type: "list" },
          { id: "4-2", title: "US-POP", path: "us-pop", type: "page" },
          { id: "4-3", title: "뽕짝", path: "pong-zzak", type: "list" }
        ]
      },
      {
        id: "5",
        title: "설정",
        path: "setting",
        type: "setting",
        isStatic: true,
        children: []
      }
    ];
  }
}
