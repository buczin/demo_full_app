package pl.demoapp.bm.Offers.OfferMessages;

import com.fasterxml.jackson.annotation.JsonBackReference;
import pl.demoapp.bm.Audit.AuditDateBy;
import pl.demoapp.bm.Offers.Offer.Offer;

import javax.persistence.*;

@Entity
public class OfferNotes extends AuditDateBy {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(columnDefinition = "TEXT")
  private String message;

  @JsonBackReference
  @ManyToOne
  @JoinColumn(name = "offer_offer_number", nullable = false)
  Offer offer;


  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public Offer getOffer() {
    return offer;
  }

  public void setOffer(Offer offer) {
    this.offer = offer;
  }
}
