package pl.demoapp.bm.Users;

import lombok.Data;
import pl.demoapp.bm.Audit.AuditDateBy;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
public class User extends AuditDateBy {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  private String name;
  private String username;
  private String password;
  private boolean active;
  private String role;

  private boolean catalogRead;
  private boolean catalogWrite;
  private boolean catalogDelete;
  private boolean systemRead;
  private boolean systemWrite;
  private boolean systemDelete;
  private boolean filmRead;
  private boolean filmWrite;
  private boolean filmDelete;
  private boolean producerRead;
  private boolean producerWrite;
  private boolean producerDelete;
  private boolean clientRead;
  private boolean clientWrite;
  private boolean clientDelete;
  private boolean offerRead;
  private boolean offerWrite;
  private boolean offerDelete;
  private boolean productionRead;
  private boolean productionWrite;
  private boolean productionDelete;
}
