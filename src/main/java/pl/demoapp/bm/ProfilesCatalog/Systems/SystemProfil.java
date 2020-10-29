package pl.demoapp.bm.ProfilesCatalog.Systems;

import lombok.Data;
import pl.demoapp.bm.Audit.AuditDateBy;

import javax.persistence.*;

@Data
@Entity
public class SystemProfil extends AuditDateBy {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String name;
  private String comment;

  public SystemProfil(String name) {
    this.name = name;
  }

  public SystemProfil(Long id, String name) {
    this.id = id;
    this.name = name;
  }

  public SystemProfil() {

  }
}
