package pl.demoapp.bm.Production.Orders;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import pl.demoapp.bm.Audit.AuditDateBy;
import pl.demoapp.bm.Contractors.Client;
import pl.demoapp.bm.MyCompany.MyCompany;

import javax.validation.constraints.NotNull;
import javax.persistence.*;
import java.sql.Date;

@Entity
@Data
public class ProductionOrder extends AuditDateBy {


  //  @GenericGenerator(name = "order_number_gen", strategy = "pl.demoapp.bm.Production.GeneratorNumberOrder")
//  @GeneratedValue(generator = "order_number_gen")
  @Id
  private String orderNumber;
  // next number / month -format mm / year -format yy

  private String numberClientOrder;

  private boolean completed;

  private StatusOrder statusOrder;

  @CreationTimestamp
  private Date dateCreatedOrder;

  @NotNull(message = "Name may not be null")
  private Date dateAcceptanceOrder;

  private Date dateCompletedOrder;
  private Date dateReceiptOrder;

  @ManyToOne
  @JoinColumn(name = "my_company_id", nullable = false)
  private MyCompany myCompany;

  @ManyToOne
  @JoinColumn(name = "client_id", nullable = false)
  private Client client;

}
