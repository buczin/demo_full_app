package pl.demoapp.bm.Films.Producers;

import lombok.Data;
import pl.demoapp.bm.Audit.AuditDateBy;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@Entity
public class Producer extends AuditDateBy {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String producerName;

  public Producer() {
  }

  public Producer(String producerName) {
    this.producerName = producerName;
  }
}

