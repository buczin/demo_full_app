import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from "@angular/core";
import { InfoPopupComponent } from "src/app/info-popup/info-popup.component";
import { Offer, OffersService } from "../offers.service";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";

@Component({
  selector: "app-print-offer-settings",
  templateUrl: "./print-offer-settings.component.html",
  styleUrls: ["./print-offer-settings.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class PrintOfferSettingsComponent implements OnInit {
  @Input() offer: Offer;
  @Output() refresh: EventEmitter<any> = new EventEmitter();

  printTextHeader = "";
  printTextTableFotter = "";
  newCommentForm = "";
  editTableFooter = false;
  editHeader = false;
  loading = false;
  commentId = null;

  allComments: any[];
  selectedProducts: any[];
  draggedProduct: any;

  selectedComments = [];

  constructor(
    private offerService: OffersService,
    private infoPopup: InfoPopupComponent
  ) {}

  ngOnInit(): void {
    this.printTextHeader = this.offer.printTextHeader;
    this.printTextTableFotter = this.offer.printTextTableFotter;
    this.offer.offerComments.forEach((element) => {
      this.selectedComments.push(element.id);
    });
    this.getAllComments();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.allComments, event.previousIndex, event.currentIndex);
    this.allComments.forEach((x, index) => {
      x.number = index + 1;
    });
    this.offerService.updatePositionComments(this.allComments).subscribe({
      next: (res) => {
        this.infoPopup.showSuccessUpdate("");
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updatePrintHeader() {
    this.loading = true;
    this.offerService
      .updatePrintHeaderInOffer(this.offer.offerNumber, this.printTextHeader)
      .subscribe({
        next: (res) => {
          this.printTextHeader = res;
          this.editHeader = false;
          this.infoPopup.showSuccessUpdate("nagłownek oferty");
          this.loading = false;
        },
        error: (err) => {
          console.log(err);
          this.loading = false;
          this.infoPopup.showErrorUpdate("nagłownek oferty");
        },
        complete: () => {
          this.refresh.emit(true);
        },
      });
  }

  updatePrintTableFooter() {
    this.loading = true;
    this.offerService
      .updatePrintTableFooterInOffer(
        this.offer.offerNumber,
        this.printTextTableFotter
      )
      .subscribe({
        next: (res) => {
          this.printTextTableFotter = res;
          this.editTableFooter = false;
          this.infoPopup.showSuccessUpdate("opis tabeli");
          this.loading = false;
        },
        error: (err) => {
          console.log(err);
          this.loading = false;
          this.infoPopup.showErrorUpdate("opis tabeli");
        },
        complete: () => {
          this.refresh.emit(true);
        },
      });
  }

  // COMMENTS

  getAllComments() {
    this.offerService.getAllComments().subscribe({
      next: (res) => {
        this.allComments = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  newComment() {
    this.offerService.newComment(this.newCommentForm).subscribe({
      next: (res) => {
        this.getAllComments();
        this.newCommentForm = "";
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  editComment(data) {
    this.newCommentForm = data.comment;
    this.commentId = data.id;
  }

  exitUpdateComment() {
    this.newCommentForm = "";
    this.commentId = null;
  }

  updateComment() {
    this.offerService
      .updateComment(this.commentId, this.newCommentForm)
      .subscribe({
        next: (res) => {
          this.getAllComments();
          this.newCommentForm = "";
          this.commentId = null;
          this.refresh.emit(true);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  deleteComment(id) {
    console.log(id);
    this.offerService.deleteComment(id).subscribe({
      next: (res) => {
        this.getAllComments();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateCommentInOffer() {
    console.log("test");
    let send = [];
    this.selectedComments.forEach((x) => {
      this.allComments.forEach((e) => {
        if (e.id == x) {
          send.push(e);
        }
      });
    });
    this.offerService
      .updateCommentsListInOffer(this.offer.offerNumber, send)
      .subscribe({
        next: (res) => {
          this.refresh.emit(true);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
