import { Component, OnInit } from "@angular/core";
import { SettingService } from "../setting.service";
import { Menu } from "../menu"

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  showDropDown: Boolean = true;
  menus: Menu[];
  constructor(private settingService:SettingService) {}

  ngOnInit() {
    this.getMenus();
  }

  menuClick(event) {
    this.showDropDown = false;
  }

  getMenus() {
    this.menus = this.settingService.getMenus();
  }

}
