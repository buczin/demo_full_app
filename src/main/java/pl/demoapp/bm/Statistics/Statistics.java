package pl.demoapp.bm.Statistics;

import lombok.Data;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.Instant;

@Data
@Entity
public class Statistics {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  private Long countOffers;
  private Long countOrders;
  private Instant timeDate;

}
