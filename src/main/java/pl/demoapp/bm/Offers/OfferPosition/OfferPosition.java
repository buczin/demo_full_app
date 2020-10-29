package pl.demoapp.bm.Offers.OfferPosition;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import pl.demoapp.bm.Audit.AuditDateBy;
import pl.demoapp.bm.Offers.Offer.Offer;
import pl.demoapp.bm.Offers.Offer.OfferStatus;
import pl.demoapp.bm.Offers.OfferPositionSide.OfferPositionSide;


import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class OfferPosition extends AuditDateBy {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private int positionNumber;
  private String profilType;
  private String profilNumber;

  @Column(columnDefinition = "boolean default false")
  private boolean accepted;

  private Long catalogIdHelper;
  private boolean alu;
  private boolean warranty;
  private OfferStatus offerStatus;

  @JsonBackReference
  @ManyToOne
  @JoinColumn(name = "offer_offer_number", nullable = false)
  Offer offer;

  @JsonManagedReference
  @OneToMany(cascade = {CascadeType.REMOVE, CascadeType.ALL}, mappedBy = "offerPosition", orphanRemoval = true)
  private Set<OfferPositionSide> offerPositionSides = new HashSet<>();

  @PrePersist
  @PreUpdate
  public void updateAssociation() {
    for (OfferPositionSide offerPositionSide : this.offerPositionSides) {
      offerPositionSide.setOfferPosition(this);
    }
  }


  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public int getPositionNumber() {
    return positionNumber;
  }

  public void setPositionNumber(int positionNumber) {
    this.positionNumber = positionNumber;
  }

  public String getProfilType() {
    return profilType;
  }

  public void setProfilType(String profilType) {
    this.profilType = profilType;
  }

  public String getProfilNumber() {
    return profilNumber;
  }

  public void setProfilNumber(String profilNumber) {
    this.profilNumber = profilNumber;
  }

  public boolean isAlu() {
    return alu;
  }

  public void setAlu(boolean alu) {
    this.alu = alu;
  }

  public boolean isWarranty() {
    return warranty;
  }

  public void setWarranty(boolean warranty) {
    this.warranty = warranty;
  }

  public boolean isAccepted() {
    return accepted;
  }

  public void setAccepted(boolean accepted) {
    this.accepted = accepted;
  }

  public Long getCatalogIdHelper() {
    return catalogIdHelper;
  }

  public void setCatalogIdHelper(Long catalogIdHelper) {
    this.catalogIdHelper = catalogIdHelper;
  }

  public OfferStatus getOfferStatus() {
    return offerStatus;
  }

  public void setOfferStatus(OfferStatus offerStatus) {
    this.offerStatus = offerStatus;
  }

  public Offer getOffer() {
    return offer;
  }

  public void setOffer(Offer offer) {
    this.offer = offer;
  }

  public Set<OfferPositionSide> getOfferPositionSides() {
    return offerPositionSides;
  }

  public void setOfferPositionSides(Set<OfferPositionSide> offerPositionSides) {
    this.offerPositionSides = offerPositionSides;
  }
}
