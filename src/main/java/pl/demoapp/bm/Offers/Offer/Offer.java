package pl.demoapp.bm.Offers.Offer;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.hibernate.annotations.CreationTimestamp;
import pl.demoapp.bm.Audit.AuditDateBy;
import pl.demoapp.bm.Contractors.Client;
import pl.demoapp.bm.MyCompany.MyCompany;
import pl.demoapp.bm.Offers.Comments.OfferComments;
import pl.demoapp.bm.Offers.OfferMessages.OfferNotes;
import pl.demoapp.bm.Offers.OfferPosition.OfferPosition;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Offer extends AuditDateBy {

  @Id
  private String offerNumber;

  private OfferStatus offerStatus;
  @NotNull(message = "Name may not be null")
  private Date offerDate;
  private boolean completed;
  private double costNettoBuyFilm;
  @Column(columnDefinition = "TEXT")
  private String buyFilmComment;

  private double sumAllPositionsPln;
  private double sumSetUpCost;
  private double sumSetCost;
  private double sumCostChangeColor;
  private double sumAllNetto;
  @Column(columnDefinition = "TEXT")
  private String printTextHeader;
  @Column(columnDefinition = "TEXT")
  private String printTextTableFotter;

  @JsonManagedReference
  @OneToMany(cascade = {CascadeType.REMOVE, CascadeType.ALL}, mappedBy = "offer", orphanRemoval = true)
  private Set<OfferPosition> offerPosition = new HashSet<>();

  @CreationTimestamp
  private Date dateCreatedOrder;

  @ManyToOne
  @JoinColumn(name = "my_company_id", nullable = false)
  private MyCompany myCompany;

  @ManyToOne
  @JoinColumn(name = "client_id", nullable = false)
  private Client client;

  @JsonManagedReference
  @OneToMany(cascade = {CascadeType.REMOVE, CascadeType.ALL}, mappedBy = "offer", orphanRemoval = true)
  private Set<OfferNotes> offerNotes = new HashSet<>();

  @ManyToMany()
  private Set<OfferComments> offerComments = new HashSet<>();


  public String getOfferNumber() {
    return offerNumber;
  }

  public void setOfferNumber(String offerNumber) {
    this.offerNumber = offerNumber;
  }

  public OfferStatus getOfferStatus() {
    return offerStatus;
  }

  public void setOfferStatus(OfferStatus offerStatus) {
    this.offerStatus = offerStatus;
  }

  public String getPrintTextHeader() {
    return printTextHeader;
  }

  public double getCostNettoBuyFilm() {
    return costNettoBuyFilm;
  }

  public void setCostNettoBuyFilm(double costNettoBuyFilm) {
    this.costNettoBuyFilm = costNettoBuyFilm;
  }

  public String getBuyFilmComment() {
    return buyFilmComment;
  }

  public void setBuyFilmComment(String buyFilmComment) {
    this.buyFilmComment = buyFilmComment;
  }

  public void setPrintTextHeader(String printTextHeader) {
    this.printTextHeader = printTextHeader;
  }

  public String getPrintTextTableFotter() {
    return printTextTableFotter;
  }

  public double getSumCostChangeColor() {
    return sumCostChangeColor;
  }

  public void setSumCostChangeColor(double sumCostChangeColor) {
    this.sumCostChangeColor = sumCostChangeColor;
  }

  public void setPrintTextTableFotter(String printTextTableFotter) {
    this.printTextTableFotter = printTextTableFotter;
  }

  public Set<OfferComments> getOfferComments() {
    return offerComments;
  }

  public void setOfferComments(Set<OfferComments> offerComments) {
    this.offerComments = offerComments;
  }

  public Date getOfferDate() {
    return offerDate;
  }

  public Set<OfferNotes> getOfferNotes() {
    return offerNotes;
  }

  public void setOfferNotes(Set<OfferNotes> offerNotes) {
    this.offerNotes = offerNotes;
  }

  public void setOfferDate(Date offerDate) {
    this.offerDate = offerDate;
  }

  public boolean isCompleted() {
    return completed;
  }

  public void setCompleted(boolean completed) {
    this.completed = completed;
  }

  public double getSumAllPositionsPln() {
    return sumAllPositionsPln;
  }

  public void setSumAllPositionsPln(double sumAllPositionsPln) {
    this.sumAllPositionsPln = sumAllPositionsPln;
  }

  public double getSumSetUpCost() {
    return sumSetUpCost;
  }

  public void setSumSetUpCost(double sumSetUpCost) {
    this.sumSetUpCost = sumSetUpCost;
  }

  public double getSumSetCost() {
    return sumSetCost;
  }

  public void setSumSetCost(double sumSetCost) {
    this.sumSetCost = sumSetCost;
  }

  public double getSumAllNetto() {
    return sumAllNetto;
  }

  public void setSumAllNetto(double sumAllNetto) {
    this.sumAllNetto = sumAllNetto;
  }

  public Set<OfferPosition> getOfferPosition() {
    return offerPosition;
  }

  public void setOfferPosition(Set<OfferPosition> offerPosition) {
    this.offerPosition = offerPosition;
  }

  public Date getDateCreatedOrder() {
    return dateCreatedOrder;
  }

  public void setDateCreatedOrder(Date dateCreatedOrder) {
    this.dateCreatedOrder = dateCreatedOrder;
  }

  public MyCompany getMyCompany() {
    return myCompany;
  }

  public void setMyCompany(MyCompany myCompany) {
    this.myCompany = myCompany;
  }

  public Client getClient() {
    return client;
  }

  public void setClient(Client client) {
    this.client = client;
  }
}
