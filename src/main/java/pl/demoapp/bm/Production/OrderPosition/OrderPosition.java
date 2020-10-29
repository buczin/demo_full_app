package pl.demoapp.bm.Production.OrderPosition;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import pl.demoapp.bm.Audit.AuditDateBy;
import pl.demoapp.bm.Production.Orders.ProductionOrder;
import pl.demoapp.bm.Production.PositionSide.PositionSide;

import javax.persistence.*;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class OrderPosition extends AuditDateBy {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private int positionNumber;
  private String profilType;
  private String profilNumber;
  @Column(columnDefinition = "boolean default false")
  private boolean accepted;
  private boolean warranty;
  private boolean alu;
  private String numberFv;
  private Date dateCompletedPosition;
  @Column(columnDefinition = "boolean default false")
  private boolean completed;
  private StatusOrderPosition statusOrderPosition;
  private Long catalogIdHelper;
  @Column(columnDefinition = "TEXT")
  private String comment;

  @ManyToOne
  @JoinColumn(name = "production_order_order_number", nullable = false)
  ProductionOrder productionOrder;

  @JsonManagedReference
  @OneToMany(cascade = {CascadeType.REMOVE, CascadeType.ALL}, mappedBy = "orderPosition", orphanRemoval = true)
  private List<PositionSide> postionSide = new ArrayList<>();

  @PrePersist
  @PreUpdate
  public void updatePositionSideAssociation() {
    for (PositionSide positionSide : this.postionSide) {
      positionSide.setOrderPosition(this);
    }
  }

}
