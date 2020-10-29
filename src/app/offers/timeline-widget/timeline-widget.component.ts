import { Component, Input, OnInit } from "@angular/core";
import { InfoPopupComponent } from "src/app/info-popup/info-popup.component";
import { OffersService } from "../offers.service";

@Component({
  selector: "app-timeline-widget",
  templateUrl: "./timeline-widget.component.html",
  styleUrls: ["./timeline-widget.component.scss"],
})
export class TimelineWidgetComponent implements OnInit {
  @Input() offerNumber: string;
  newNote = "";
  @Input() offerNotes: any;
  public now: Date = new Date();

  constructor(
    private offerService: OffersService,
    private infoPopup: InfoPopupComponent
  ) {
    setInterval(() => {
      this.now = new Date();
    }, 1);
  }

  ngOnInit(): void {}

  getNotes() {
    this.offerService.getOfferNotes(this.offerNumber).subscribe({
      next: (res) => {
        this.offerNotes = res;
        this.offerNotes.sort((a, b) => {
          if (a.createdDate > b.createdDate) {
            return 1;
          }
          if (a.createdDate < b.createdDate) {
            return -1;
          }
          return 0;
        });
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }

  addNewNote(offerNumber, newNote) {
    this.offerService.addNewOfferNote(offerNumber, newNote).subscribe({
      next: (res) => {
        this.infoPopup.showSuccessAdd("notatkę");
        this.newNote = "";
        this.getNotes();
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }

  deleteNote(offerNumber, id) {
    this.offerService.deleteOfferNote(offerNumber, id).subscribe({
      next: (res) => {
        this.infoPopup.showSuccessDelete("notatkę");
        this.getNotes();
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }
}
