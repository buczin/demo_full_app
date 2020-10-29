package pl.demoapp.bm.Offers.Comments;

import lombok.Data;
import pl.demoapp.bm.Audit.AuditDateBy;

import javax.persistence.*;

@Entity
@Data
public class OfferComments extends AuditDateBy {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  private int number;

  @Column(columnDefinition = "TEXT")
  private String comment;

}
