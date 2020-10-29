package pl.demoapp.bm.Calculator;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import pl.demoapp.bm.Contractors.Client;
import pl.demoapp.bm.Offers.Helpers.OfferHelperRepository;
import pl.demoapp.bm.Offers.Offer.Offer;
import pl.demoapp.bm.Offers.OfferPositionSide.OfferPositionSide;
import pl.demoapp.bm.Production.PositionSide.PositionSide;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Set;

@Log4j2
public class Calculator {

  @Autowired
  OfferHelperRepository helpersRepository;

  protected PositionSide selectOrderCalculateMethod(PositionSide positionSide, Client client) {
    log.info(positionSide.getSide());
    String testSide = positionSide.getSide();
    if (testSide.equals("obu")) {
      log.info("Double order side calc");
      return calculateOrderDoubleSideSymetric(positionSide, client);
    } else {
      log.info("Single order side calc");
      return calculateOrderSingleSide(positionSide, client);
    }
  }

  private PositionSide calculateOrderSingleSide(PositionSide positionSide, Client client) {

    return positionSide;
  }

  private PositionSide calculateOrderDoubleSideSymetric(PositionSide positionSide, Client client) {

    return positionSide;
  }


  protected Set<OfferPositionSide> calculateOfferSide(Set<OfferPositionSide> positionSides, Client client, String offerNumber) {

    return positionSides;
  }

  protected Offer calculateOffer(Offer offer) {

    return offer;
  }
}
