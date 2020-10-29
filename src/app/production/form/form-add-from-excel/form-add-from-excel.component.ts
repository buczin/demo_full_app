import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import * as XLSX from "xlsx";

interface appTable {
  idApp: string;
  name: string;
  matchCol?: string;
}

@Component({
  selector: "app-form-add-from-excel",
  templateUrl: "./form-add-from-excel.component.html",
  styleUrls: ["./form-add-from-excel.component.scss"],
})
export class FormAddFromExcelComponent implements OnInit {
  items: MenuItem[];
  activeIndex: number = 0;
  columnsName: any;
  copyColumnsName: any;
  uploadedFiles: any[] = [];
  step3Table: any[] = null;
  dataAllRows: any;
  // STEP2
  columnsInOrder: appTable[] = [
    { idApp: "profilType", name: "Rodzaj kształ.", matchCol: "" },
    { idApp: "profilNumber", name: "Numer kształ.", matchCol: "" },
    { idApp: "side", name: "Strona okl.", matchCol: "" },
    { idApp: "filmNumber", name: "Numer okl.", matchCol: "" },
    { idApp: "quantity", name: "Sztuki", matchCol: "" },
    { idApp: "length", name: "Długość", matchCol: "" },
  ];

  draggedItem: any;

  constructor() {}

  ngOnInit() {
    this.items = [
      {
        label: "Wybór pliku",
        command: (event: any) => {
          this.activeIndex = 0;
        },
      },
      {
        label: "Dopasowanie kolumn",
        command: (event: any) => {
          this.activeIndex = 1;
        },
      },
      {
        label: "Przetwarzanie",
        command: (event: any) => {
          this.activeIndex = 2;
        },
      },
      {
        label: "Podgląd",
        command: (event: any) => {
          this.activeIndex = 3;
        },
      },
    ];
  }

  onFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    let sheetsName = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: "binary" });
      sheetsName = workBook.SheetNames;
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      const dataString = JSON.stringify(jsonData);
      this.step2(sheetsName, jsonData);
    };
    reader.readAsBinaryString(file);
  }

  //STEP2
  step2(sheetsName, tdata) {
    this.activeIndex = 1;
    this.dataAllRows = tdata[sheetsName[0]];
    this.columnsName = Object.keys(this.dataAllRows[0]);
    this.copyColumnsName = this.columnsName;
  }

  dragStart(item) {
    this.draggedItem = item;
  }

  drop(event) {
    let indexTableIn = this.findIndex(event.target.id);
    if (this.draggedItem) {
      this.columnsInOrder[indexTableIn].matchCol = this.draggedItem;
      this.findAndRemoveFromList(this.draggedItem);
      this.draggedItem = null;
    }
  }

  dragEnd() {
    this.draggedItem = null;
  }

  findIndex(name) {
    let index = -1;
    for (let i = 0; i < this.columnsInOrder.length; i++) {
      if (name === this.columnsInOrder[i].idApp) {
        index = i;
        break;
      }
    }
    return index;
  }

  findAndRemoveFromList(name) {
    for (let i = 0; i < this.copyColumnsName.length; i++) {
      if (name === this.copyColumnsName[i]) {
        this.copyColumnsName.splice(i, 1);
        break;
      }
    }
  }

  step3() {
    this.activeIndex = 2;
    this.step3Table = this.dataAllRows;
    console.log(this.step3Table);
  }
}
