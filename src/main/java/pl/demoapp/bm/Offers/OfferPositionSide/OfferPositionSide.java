package pl.demoapp.bm.Offers.OfferPositionSide;

import com.fasterxml.jackson.annotation.JsonBackReference;
import pl.demoapp.bm.Offers.OfferPosition.OfferPosition;

import javax.persistence.*;

@Entity
public class OfferPositionSide {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String side;
  private String filmNumber;
  private int filmWidth;
  private boolean filmEntrusted;

  private double quantityMb;

  private double plnMb;
  private double togetherPay;
  private double costSetup;
  private double costSetupAdditional;
  private double costSet;
  private double costChangeColor;

  private boolean hard;
  private boolean changeColor;
  private int bicolor;
  private double exchangeRate;
  private double additional;
  private double cost;
  private double mIs;


  @JsonBackReference
  @ManyToOne
  @JoinColumn(name = "offer_position_id", nullable = false)
  OfferPosition offerPosition;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getSide() {
    return side;
  }

  public boolean isChangeColor() {
    return changeColor;
  }

  public void setChangeColor(boolean changeColor) {
    this.changeColor = changeColor;
  }

  public void setSide(String side) {
    this.side = side;
  }

  public String getFilmNumber() {
    return filmNumber;
  }

  public void setFilmNumber(String filmNumber) {
    this.filmNumber = filmNumber;
  }

  public int getFilmWidth() {
    return filmWidth;
  }

  public void setFilmWidth(int filmWidth) {
    this.filmWidth = filmWidth;
  }

  public boolean isFilmEntrusted() {
    return filmEntrusted;
  }

  public void setFilmEntrusted(boolean filmEntrusted) {
    this.filmEntrusted = filmEntrusted;
  }

  public double getCostChangeColor() {
    return costChangeColor;
  }

  public void setCostChangeColor(double costChangeColor) {
    this.costChangeColor = costChangeColor;
  }

  public double getCostSetupAdditional() {
    return costSetupAdditional;
  }

  public void setCostSetupAdditional(double costSetupAdditional) {
    this.costSetupAdditional = costSetupAdditional;
  }

  public double getQuantityMb() {
    return quantityMb;
  }

  public void setQuantityMb(double quantityMb) {
    this.quantityMb = quantityMb;
  }

  public double getPlnMb() {
    return plnMb;
  }

  public void setPlnMb(double plnMb) {
    this.plnMb = plnMb;
  }

  public double getTogetherPay() {
    return togetherPay;
  }

  public void setTogetherPay(double togetherPay) {
    this.togetherPay = togetherPay;
  }

  public double getCostSetup() {
    return costSetup;
  }

  public void setCostSetup(double costSetup) {
    this.costSetup = costSetup;
  }

  public double getCostSet() {
    return costSet;
  }

  public void setCostSet(double costSet) {
    this.costSet = costSet;
  }

  public boolean isHard() {
    return hard;
  }

  public void setHard(boolean hard) {
    this.hard = hard;
  }

  public int getBicolor() {
    return bicolor;
  }

  public void setBicolor(int bicolor) {
    this.bicolor = bicolor;
  }

  public double getExchangeRate() {
    return exchangeRate;
  }

  public void setExchangeRate(double exchangeRate) {
    this.exchangeRate = exchangeRate;
  }

  public double getAdditional() {
    return additional;
  }

  public void setAdditional(double additional) {
    this.additional = additional;
  }

  public double getCost() {
    return cost;
  }

  public void setCost(double cost) {
    this.cost = cost;
  }

  public double getmIs() {
    return mIs;
  }

  public void setmIs(double mIs) {
    this.mIs = mIs;
  }

  public OfferPosition getOfferPosition() {
    return offerPosition;
  }

  public void setOfferPosition(OfferPosition offerPosition) {
    this.offerPosition = offerPosition;
  }
}
