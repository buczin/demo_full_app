package pl.demoapp.bm.MyCompany;

import lombok.Data;
import pl.demoapp.bm.Audit.AuditDateBy;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Data
public class MyCompany extends AuditDateBy {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String name;
  private String shortName;
  private String nip;
  private String regon;

  private String town;
  private String street;
  private String houseNumber;
  private String flatNumber;
  private String postalCode;
  private String province;
  private String country;

  private String phonenumber;
  private String phonenumber2;
  private String email;
  private String fvemail;
  private String www;

  private String logoLink;
  private String shortId;
}
