package pl.demoapp.bm.Production.PositionSide;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.demoapp.bm.Calculator.Calculator;
import pl.demoapp.bm.Contractors.Client;
import pl.demoapp.bm.Contractors.ClientRepository;
import pl.demoapp.bm.Exeptions.ResourceNotFoundException;
import pl.demoapp.bm.Offers.Helpers.OfferHelperRepository;
import pl.demoapp.bm.Production.OrderPosition.OrderPosition;
import pl.demoapp.bm.Production.OrderPosition.OrderPositonRepository;
import pl.demoapp.bm.Production.Orders.ProductionOrder;
import pl.demoapp.bm.Production.Orders.ProductionOrderRepository;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@Log4j2
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api")
public class PositionSideController extends Calculator {

  @Autowired
  PositionSideRepository repository;

  @Autowired
  OrderPositonRepository orderPositionRepository;

  @Autowired
  UsedFilmRepository usedFilmRepository;

  @Autowired
  OfferHelperRepository helpersRepository;

  @Autowired
  ProductionOrderRepository productionOrderRepository;

  @Autowired
  ClientRepository clientRepository;

  /**
   * Get all sides list.
   *
   * @return the list
   */
  @GetMapping("/production/orders/positions/sides")
  public ResponseEntity<List<PositionSide>> getAll() {
    return ResponseEntity.ok().body(repository.findAll());
  }


  /**
   * Get one side .
   *
   * @return the object
   */
  @GetMapping("/production/order/{id}/position/{idPosition}/side/{sideId}")
  public ResponseEntity<PositionSide> getOneBySideId(@PathVariable String id, @PathVariable Long idPosition, @PathVariable Long sideId) {
    return ResponseEntity.ok().body(
      repository.findById(sideId).orElseThrow(() -> new ResourceNotFoundException("Side", Long.toString(sideId), null))
    );
  }

  /**
   * Create side.
   *
   * @param newSide the Side
   * @return the response entity
   */
  @PostMapping("/production/order/{id}/position/{idPosition}/side")
  public ResponseEntity<PositionSide> newOrder(@PathVariable String id, @PathVariable Long idPosition, @RequestBody PositionSide newSide) {

    newSide.setStatusPositionSide(StatusPositionSide.NEW);

    return ResponseEntity
      .ok()
      .body(repository.save(newSide));
  }

  /**
   * Add / Update Used Film.
   *
   * @param usedPosition the Used film
   * @return the response entity
   */
  @PutMapping("/production/order/{id}/position/{idPosition}/usedfilm")
  public ResponseEntity<String> updateUsedFilm(@PathVariable String id, @PathVariable Long idPosition, @RequestBody PositionSide usedPosition) {
    log.info(usedPosition.getId());
    if (usedPosition.getId() != null) {
      log.info("Add/Update UsedFilm in order: " + id + " on position: " + idPosition);
      PositionSide positionSide = repository.findById(usedPosition.getId()).orElseThrow(() -> new ResourceNotFoundException("Side", Long.toString(idPosition), null));

      usedPosition.getUsedFilm().forEach(u -> {
        if (u.getId() != null) {
          log.info("Update usedFilm id: " + u.getId());
          UsedFilm film = usedFilmRepository.findById(u.getId()).orElseThrow(() -> new ResourceNotFoundException("UsedFilm", Long.toString(u.getId()), null));
          film.setLength(u.getLength());
          film.setWidth(u.getWidth());

          BigDecimal width = new BigDecimal(u.getWidth());
          BigDecimal length = new BigDecimal(u.getLength());
          BigDecimal widthM = width.divide(BigDecimal.valueOf(1000));
          BigDecimal sum = widthM.multiply(length).setScale(2, RoundingMode.HALF_UP);
          film.setSumM2(sum.doubleValue());
          usedFilmRepository.save(film);

        } else {
          log.info("Add new usedFilm");

          BigDecimal width = new BigDecimal(u.getWidth());
          BigDecimal length = new BigDecimal(u.getLength());
          BigDecimal widthM = width.divide(BigDecimal.valueOf(1000));
          BigDecimal sum = widthM.multiply(length).setScale(2, RoundingMode.HALF_UP);
          u.setSumM2(sum.doubleValue());

          UsedFilm film = usedFilmRepository.save(u);
          positionSide.getUsedFilm().add(film);
        }
      });


      List<UsedFilm> toRemove = new ArrayList();
      positionSide.getUsedFilm().forEach(us -> {
        UsedFilm test = usedPosition.getUsedFilm().stream().filter(uf -> uf.getId() == us.getId()).findFirst().orElse(null);
        if (test == null) {
          UsedFilm film = usedFilmRepository.findById(us.getId()).orElseThrow(() -> new ResourceNotFoundException("UsedFilm", Long.toString(us.getId()), null));
          log.info("Delete id: " + film);
          toRemove.add(film);
        }
      });
      toRemove.forEach(tmpfilm -> {
        positionSide.getUsedFilm().remove(tmpfilm);
      });


      repository.save(positionSide);

      return ResponseEntity
        .ok()
        .body("Used film updated");
    }

    return ResponseEntity
      .ok()
      .body("Done Nothing");
  }

  @PostMapping("/production/order/{idOrder}/position/{idPosition}/side/{idSide}/calculate")
  public ResponseEntity<PositionSide> calculatePosition(@PathVariable String idOrder, @PathVariable Long idPosition, @PathVariable Long idSide, @RequestBody HashMap<String, String> calculateData) {
    log.info("Calculate position: " + idPosition);
    PositionSide positionSide = repository.findById(idSide).orElseThrow(() -> new ResourceNotFoundException("Side", Long.toString(idPosition), null));
    ProductionOrder order = productionOrderRepository.findById(idOrder).orElseThrow(() -> new ResourceNotFoundException("Order", idOrder, null));
    Client client = clientRepository.findById(order.getClient().getId()).orElseThrow(() -> new ResourceNotFoundException("Client", "", null));
    log.info(calculateData);

    //set data
    positionSide.setCost(Double.parseDouble(calculateData.get("cost")));
    positionSide.setmIs(Double.parseDouble(calculateData.get("mIs")));
    positionSide.setExchangeRate(Double.parseDouble(calculateData.get("exchangeRate")));
    positionSide.setHard(Boolean.parseBoolean(calculateData.get("hard")));
    positionSide.setFilmEntrusted(Boolean.parseBoolean(calculateData.get("filmEntrusted")));
    positionSide.setChangeColor(Boolean.parseBoolean(calculateData.get("changeColor")));
    if (calculateData.get("bicolor") == "" || calculateData.get("bicolor") == null) {
      positionSide.setBicolor(0);
    } else {
      positionSide.setBicolor(Integer.parseInt(calculateData.get("bicolor")));
    }
    if (calculateData.get("costChangeColor") == "" || calculateData.get("costChangeColor") == null) {
      positionSide.setCostChangeColor(0);
    } else {
      positionSide.setCostChangeColor(Double.parseDouble(calculateData.get("costChangeColor")));
    }


    final PositionSide calcPositionSide = selectOrderCalculateMethod(positionSide, client);
    // CALCULATE

    return ResponseEntity
      .ok()
      .body(calcPositionSide);
  }


  @PutMapping("/production/order/{idOrder}/position/{idPosition}/side/{idSide}/calculate-save")
  public ResponseEntity<PositionSide> updatePositionDataAfterDone(@PathVariable String idOrder, @PathVariable Long idPosition, @PathVariable Long idSide, @RequestBody PositionSide updateSide) {
    log.info("Sava calculated data in order: " + idOrder + " on position: " + idPosition);

    PositionSide positionSide = repository.findById(idSide).orElseThrow(() -> new ResourceNotFoundException("Side", Long.toString(idPosition), null));

    positionSide.setCost(updateSide.getCost());
    positionSide.setmIs(updateSide.getmIs());
    positionSide.setExchangeRate(updateSide.getExchangeRate());
    positionSide.setHard(updateSide.isHard());
    positionSide.setFilmEntrusted(updateSide.isFilmEntrusted());
    positionSide.setChangeColor(updateSide.isChangeColor());
    positionSide.setBicolor(updateSide.getBicolor());
    positionSide.setCostChangeColor(updateSide.getCostChangeColor());

    positionSide.setPlnMb(updateSide.getPlnMb());
    positionSide.setTogetherPay(updateSide.getTogetherPay());
    positionSide.setCostSetup(updateSide.getCostSetup());
    positionSide.setCostSet(updateSide.getCostSet());

    return ResponseEntity
      .ok()
      .body(repository.save(positionSide));
  }

  @PutMapping("/production/order/{idOrder}/position/{idPosition}/comment")
  public ResponseEntity<OrderPosition> updatePositionComment(@PathVariable String idOrder, @PathVariable Long idPosition, @RequestBody String updateComment) {
    log.info("Sava calculated data in order: " + idOrder + " on position: " + idPosition);

    OrderPosition orderPosition = orderPositionRepository.findById(idPosition).orElseThrow(() -> new ResourceNotFoundException("Position", Long.toString(idPosition), null));
    orderPosition.setComment(updateComment);

    return ResponseEntity
      .ok()
      .body(orderPositionRepository.save(orderPosition));
  }
}
