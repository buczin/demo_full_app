package pl.demoapp.bm.Offers.Helpers;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class OfferHelper {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  private double exchangeRateAlu;
  private double exchangeRatePcv;

  private double mainCost;
  private double entrustedCost;

  private double defaultClientSetUpCost;
  private double defaultSetCost;
  private double defaultCostChangeColor;

  private double default_helper_pcv_mEasyTo50;
  private double default_helper_pcv_mEasyTo150;
  private double default_helper_pcv_mEasyTo500;
  private double default_helper_pcv_mEasyAbove500;
  private double default_helper_pcv_mHardTo50;
  private double default_helper_pcv_mHardTo150;
  private double default_helper_pcv_mHardTo500;
  private double default_helper_pcv_mHardAbove500;

  private double default_helper_alu_mEasyTo50;
  private double default_helper_alu_mEasyTo150;
  private double default_helper_alu_mEasyTo500;
  private double default_helper_alu_mEasyAbove500;
  private double default_helper_alu_mHardTo50;
  private double default_helper_alu_mHardTo150;
  private double default_helper_alu_mHardTo500;
  private double default_helper_alu_mHardAbove500;

  @Column(columnDefinition = "TEXT")
  private String defaultPrintTextHeader;
  @Column(columnDefinition = "TEXT")
  private String defaultPrintTextTableFotter;
}
