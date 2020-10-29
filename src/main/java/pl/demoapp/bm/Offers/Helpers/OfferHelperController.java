package pl.demoapp.bm.Offers.Helpers;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@Log4j2
@RequestMapping("/api")
public class OfferHelperController {

  @Autowired
  OfferHelperRepository repository;

  /**
   * Get helpers.
   *
   * @return the list
   */
  @GetMapping("/helpers")
  public ResponseEntity<List<OfferHelper>> get() {
    return ResponseEntity.ok().body(repository.findAll());
  }


  /**
   * Update helpers exchange.
   *
   * @param update the offerhelper
   * @return the string
   */
  @PostMapping("/helpers/exchange")
  public ResponseEntity<OfferHelper> updateHelperExchangeAlu(@RequestBody OfferHelper update) {
    OfferHelper offerHelper = repository.getOne(1);
    log.info(offerHelper);
    log.info("OfferHelper - change exchange alu from: " + offerHelper.getExchangeRateAlu() + " to: " + update.getExchangeRateAlu());
    offerHelper.setExchangeRateAlu(update.getExchangeRateAlu());
    log.info("OfferHelper - change exchange pcv from: " + offerHelper.getExchangeRatePcv() + " to: " + update.getExchangeRatePcv());
    offerHelper.setExchangeRatePcv(update.getExchangeRatePcv());

    return ResponseEntity
      .ok()
      .body(repository.save(offerHelper));
  }


  /**
   * Update helpers SetCost.
   *
   * @param updateHelper the helpers
   * @return the response entity
   */
  @PostMapping("/helpers/setcost")
  public ResponseEntity<OfferHelper> updateHelperSetCost(@RequestBody OfferHelper updateHelper) {

    if (updateHelper.getId() != null) {
      Optional<OfferHelper> offerHelper = repository.findById(updateHelper.getId());
      log.info("OfferHelper - change set cost from: " + offerHelper.get().getDefaultSetCost() + " to: " + updateHelper.getDefaultSetCost());
      offerHelper.get().setDefaultSetCost(updateHelper.getDefaultSetCost());
      return ResponseEntity
        .ok()
        .body(repository.save(offerHelper.get()));
    } else {
      return ResponseEntity
        .ok()
        .body(repository.save(updateHelper));
    }
  }

  /**
   * Update helpers ClientSetUpCost.
   *
   * @param updateHelper the helpers
   * @return the response entity
   */
  @PostMapping("/helpers/clientsetupcost")
  public ResponseEntity<OfferHelper> updateClientSetUpCost(@RequestBody OfferHelper updateHelper) {

    if (updateHelper.getId() != null) {
      Optional<OfferHelper> offerHelper = repository.findById(updateHelper.getId());
      log.info("OfferHelper - change client setup cost from: " + offerHelper.get().getDefaultClientSetUpCost() + " to: " + updateHelper.getDefaultClientSetUpCost());
      offerHelper.get().setDefaultClientSetUpCost(updateHelper.getDefaultClientSetUpCost());
      return ResponseEntity
        .ok()
        .body(repository.save(offerHelper.get()));
    } else {
      return ResponseEntity
        .ok()
        .body(repository.save(updateHelper));
    }
  }

  /**
   * Update helpers Color Change.
   *
   * @param updateHelper the helpers
   * @return the response entity
   */
  @PostMapping("/helpers/color-change")
  public ResponseEntity<OfferHelper> updateClientColorChnage(@RequestBody OfferHelper updateHelper) {

    if (updateHelper.getId() != null) {
      Optional<OfferHelper> offerHelper = repository.findById(updateHelper.getId());
      log.info("OfferHelper - change color change from: " + offerHelper.get().getDefaultCostChangeColor() + " to: " + updateHelper.getDefaultCostChangeColor());
      offerHelper.get().setDefaultCostChangeColor(updateHelper.getDefaultCostChangeColor());
      return ResponseEntity
        .ok()
        .body(repository.save(offerHelper.get()));
    } else {
      return ResponseEntity
        .ok()
        .body(repository.save(updateHelper));
    }
  }

  /**
   * Update default print text.
   *
   * @param updateHelper the helpers
   * @return the response entity
   */
  @PostMapping("/helpers/default-print-text")
  public ResponseEntity<OfferHelper> updateDefaultPrintText(@RequestBody OfferHelper updateHelper) {

    if (updateHelper.getId() != null) {
      Optional<OfferHelper> offerHelper = repository.findById(updateHelper.getId());
      offerHelper.get().setDefaultPrintTextHeader(updateHelper.getDefaultPrintTextHeader());
      offerHelper.get().setDefaultPrintTextTableFotter(updateHelper.getDefaultPrintTextTableFotter());

      return ResponseEntity
        .ok()
        .body(repository.save(offerHelper.get()));
    } else {
      return ResponseEntity
        .ok()
        .body(repository.save(updateHelper));
    }
  }

  /**
   * Update helpers costs range.
   *
   * @param updateHelper the helpers
   * @return the response entity
   */
  @PutMapping("/helpers/costs-range")
  public ResponseEntity<OfferHelper> updateCostsRange(@RequestBody OfferHelper updateHelper) {
    log.info("OfferHelper - Change default costs range");
    OfferHelper offerHelper = repository.findById(updateHelper.getId()).get();

    offerHelper.setDefault_helper_pcv_mEasyTo50(updateHelper.getDefault_helper_pcv_mEasyTo50());
    offerHelper.setDefault_helper_pcv_mEasyTo150(updateHelper.getDefault_helper_pcv_mEasyTo150());
    offerHelper.setDefault_helper_pcv_mEasyTo500(updateHelper.getDefault_helper_pcv_mEasyTo500());
    offerHelper.setDefault_helper_pcv_mEasyAbove500(updateHelper.getDefault_helper_pcv_mEasyAbove500());
    offerHelper.setDefault_helper_pcv_mHardTo50(updateHelper.getDefault_helper_pcv_mHardTo50());
    offerHelper.setDefault_helper_pcv_mHardTo150(updateHelper.getDefault_helper_pcv_mHardTo150());
    offerHelper.setDefault_helper_pcv_mHardTo500(updateHelper.getDefault_helper_pcv_mHardTo500());
    offerHelper.setDefault_helper_pcv_mHardAbove500(updateHelper.getDefault_helper_pcv_mHardAbove500());

    offerHelper.setDefault_helper_alu_mEasyTo50(updateHelper.getDefault_helper_alu_mEasyTo50());
    offerHelper.setDefault_helper_alu_mEasyTo150(updateHelper.getDefault_helper_alu_mEasyTo150());
    offerHelper.setDefault_helper_alu_mEasyTo500(updateHelper.getDefault_helper_alu_mEasyTo500());
    offerHelper.setDefault_helper_alu_mEasyAbove500(updateHelper.getDefault_helper_alu_mEasyAbove500());
    offerHelper.setDefault_helper_alu_mHardTo50(updateHelper.getDefault_helper_alu_mHardTo50());
    offerHelper.setDefault_helper_alu_mHardTo150(updateHelper.getDefault_helper_alu_mHardTo150());
    offerHelper.setDefault_helper_alu_mHardTo500(updateHelper.getDefault_helper_alu_mHardTo500());
    offerHelper.setDefault_helper_alu_mHardAbove500(updateHelper.getDefault_helper_alu_mHardAbove500());

    return ResponseEntity
      .ok()
      .body(repository.save(offerHelper));
  }

}
