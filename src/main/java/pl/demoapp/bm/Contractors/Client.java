package pl.demoapp.bm.Contractors;

import lombok.Data;
import pl.demoapp.bm.Audit.AuditDateBy;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Data
public class Client extends AuditDateBy {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private int symfoniaId;
  private String shortName;
  private String name;
  private String nip;
  private String pesel;
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
  private String www;

  private double helper_additional;
  private double helper_cost;
  private double helper_setUpCost;
  private double helper_costChangeColor;

  private double helper_pcv_mEasyTo50;
  private double helper_pcv_mEasyTo150;
  private double helper_pcv_mEasyTo500;
  private double helper_pcv_mEasyAbove500;
  private double helper_pcv_mHardTo50;
  private double helper_pcv_mHardTo150;
  private double helper_pcv_mHardTo500;
  private double helper_pcv_mHardAbove500;

  private double helper_alu_mEasyTo50;
  private double helper_alu_mEasyTo150;
  private double helper_alu_mEasyTo500;
  private double helper_alu_mEasyAbove500;
  private double helper_alu_mHardTo50;
  private double helper_alu_mHardTo150;
  private double helper_alu_mHardTo500;
  private double helper_alu_mHardAbove500;
}
