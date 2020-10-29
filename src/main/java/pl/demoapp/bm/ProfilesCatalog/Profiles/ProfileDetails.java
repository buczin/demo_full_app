package pl.demoapp.bm.ProfilesCatalog.Profiles;

import lombok.Data;
import pl.demoapp.bm.Audit.AuditDateBy;
import pl.demoapp.bm.ProfilesCatalog.Systems.SystemProfil;

import javax.persistence.*;

@Data
@Entity
public class ProfileDetails extends AuditDateBy {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "systemProfil_id", nullable = false)
  private SystemProfil systemProfil;
  private String number;
  private String dimCenterSide;
  private String dimTwoSide;
  private String dimTwoSideInner;
  private String dimTwoSideOuter;
  private String dimOuter;
  private String dimInner;
  private String dimOneSide;
  private String profileType;
  private String offerName;
  private boolean alu;
  private boolean actualMeasurement;
  private boolean hard;
  private String comments;
}
