package pl.demoapp.bm.Production.PositionSide;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import pl.demoapp.bm.Audit.AuditDateBy;
import pl.demoapp.bm.Production.OrderPosition.OrderPosition;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class PositionSide extends AuditDateBy {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String side;
  private String filmNumber;
  private String filmWidth;
  private boolean filmEntrusted;

  @JsonManagedReference
  @OneToMany(cascade = {CascadeType.REMOVE, CascadeType.ALL}, mappedBy = "positionSide", orphanRemoval = true)
  private Set<ProfilDimension> profilDimensions = new HashSet<>();
  private double sumAllDimensions;

  private double plnMb;
  private double togetherPay; // plnmb * sumdim
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


  private String glue;
  private String employees;
  private StatusPositionSide statusPositionSide;

  @JsonBackReference
  @ManyToOne
  @JoinColumn(name = "order_position_id")
  private OrderPosition orderPosition;

  @JsonManagedReference
  @OneToMany(cascade = {CascadeType.REMOVE, CascadeType.ALL}, mappedBy = "positionSide", orphanRemoval = true)
  private Set<UsedFilm> usedFilm = new HashSet<>();

  @PrePersist
  @PreUpdate
  public void updateAssociation() {
    for (UsedFilm usedFilm : this.usedFilm) {
      usedFilm.setPositionSide(this);
    }
    for (ProfilDimension profilDimension : this.profilDimensions) {
      profilDimension.setPositionSide(this);
    }
  }


  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getSide() {
    return side;
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

  public String getFilmWidth() {
    return filmWidth;
  }

  public void setFilmWidth(String filmWidth) {
    this.filmWidth = filmWidth;
  }

  public boolean isFilmEntrusted() {
    return filmEntrusted;
  }

  public void setFilmEntrusted(boolean filmEntrusted) {
    this.filmEntrusted = filmEntrusted;
  }

  public Set<ProfilDimension> getProfilDimensions() {
    return profilDimensions;
  }

  public void setProfilDimensions(Set<ProfilDimension> profilDimensions) {
    this.profilDimensions = profilDimensions;
  }

  public double getSumAllDimensions() {
    return sumAllDimensions;
  }

  public void setSumAllDimensions(double sumAllDimensions) {
    this.sumAllDimensions = sumAllDimensions;
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

  public double getCostSetupAdditional() {
    return costSetupAdditional;
  }

  public void setCostSetupAdditional(double costSetupAdditional) {
    this.costSetupAdditional = costSetupAdditional;
  }

  public double getCostSet() {
    return costSet;
  }

  public void setCostSet(double costSet) {
    this.costSet = costSet;
  }

  public double getCostChangeColor() {
    return costChangeColor;
  }

  public void setCostChangeColor(double costChangeColor) {
    this.costChangeColor = costChangeColor;
  }

  public boolean isHard() {
    return hard;
  }

  public void setHard(boolean hard) {
    this.hard = hard;
  }

  public boolean isChangeColor() {
    return changeColor;
  }

  public void setChangeColor(boolean changeColor) {
    this.changeColor = changeColor;
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

  public String getGlue() {
    return glue;
  }

  public void setGlue(String glue) {
    this.glue = glue;
  }

  public String getEmployees() {
    return employees;
  }

  public void setEmployees(String employees) {
    this.employees = employees;
  }

  public StatusPositionSide getStatusPositionSide() {
    return statusPositionSide;
  }

  public void setStatusPositionSide(StatusPositionSide statusPositionSide) {
    this.statusPositionSide = statusPositionSide;
  }

  public OrderPosition getOrderPosition() {
    return orderPosition;
  }

  public void setOrderPosition(OrderPosition orderPosition) {
    this.orderPosition = orderPosition;
  }

  public Set<UsedFilm> getUsedFilm() {
    return usedFilm;
  }

  public void setUsedFilm(Set<UsedFilm> usedFilm) {
    this.usedFilm = usedFilm;
  }
}
