package pl.demoapp.bm.Production.PositionSide;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class UsedFilm {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private int width;
  private double length;
  private double sumM2;

  @JsonBackReference
  @ManyToOne
  @JoinColumn(name = "position_side_id", nullable = false)
  PositionSide positionSide;
}
