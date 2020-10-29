package pl.demoapp.bm.Films;

import lombok.Data;
import pl.demoapp.bm.Audit.AuditDateBy;
import pl.demoapp.bm.Films.Producers.Producer;

import javax.persistence.*;

@Data
@Entity
public class Film extends AuditDateBy {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String number;
  private String name;
  private int surchargePercentage;
  private String ralNumber;
  private String imgLink;
  private FilmEnum status;

  @Column(columnDefinition = "TEXT")
  private String othersNumber;
  private int maxWidth; //mm

  @ManyToOne
  @JoinColumn(name = "producer_id", nullable = false)
  private Producer producer;

  public Film(String number, String name, Producer producer, FilmEnum filmEnum) {
    this.number = number;
    this.name = name;
    this.producer = producer;
    this.status = filmEnum;
  }

  public Film() {

  }
}
