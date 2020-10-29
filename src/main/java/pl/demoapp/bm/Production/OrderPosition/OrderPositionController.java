package pl.demoapp.bm.Production.OrderPosition;

import lombok.extern.log4j.Log4j2;
import org.hibernate.criterion.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pl.demoapp.bm.Exeptions.ResourceNotFoundException;
import pl.demoapp.bm.MyCompany.MyCompany;
import pl.demoapp.bm.Production.Orders.ProductionOrder;
import pl.demoapp.bm.Production.Orders.ProductionOrderRepository;
import pl.demoapp.bm.Production.PositionSide.*;

import java.sql.Date;
import java.util.*;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@Log4j2
@RequestMapping("/api")
public class OrderPositionController {

  @Autowired
  OrderPositonRepository repository;

  @Autowired
  ProductionOrderRepository repositoryOrder;

  @Autowired
  ProfilDimensionRepository repositoryDimension;

  @Autowired
  PositionSideRepository repositorySide;

  /**
   * Get all position list.
   *
   * @return the list
   */
  @GetMapping("/production/orders/positions")
  public ResponseEntity<List<OrderPosition>> getAll() {
    return ResponseEntity.ok().body(repository.findAll());
  }

  /**
   * Get all order position list.
   *
   * @return the list
   */
  @GetMapping("/production/order/{idOrder}/positions")
  public ResponseEntity<List<OrderPosition>> getAllByOrder(@PathVariable String idOrder) {
    List<OrderPosition> orderPositions = repository.findAllByProductionOrderOrderNumber(idOrder);

    orderPositions.forEach((x) -> {
      List<PositionSide> sortedPositions = x.getPostionSide().stream().sorted(Comparator.comparing(PositionSide::getSide).reversed()).collect(Collectors.toList());
      x.setPostionSide(sortedPositions);
    });

    return ResponseEntity.ok().body(orderPositions);
  }

  /**
   * Get one order position by id.
   *
   * @return the object
   */
  @GetMapping("/production/order/{idOrder}/position/{idPosition}")
  public ResponseEntity<OrderPosition> getOneById(@PathVariable String idOrder, @PathVariable Long idPosition) {
    return ResponseEntity.ok().body(
      repository
        .findById(idPosition)
        .orElseThrow(() -> new ResourceNotFoundException("Production Order", Long.toString(idPosition), null))
    );
  }

  /**
   * Create position in order.
   *
   * @param newPosition the order position
   * @return the response entity
   */
  @PostMapping("/production/order/{idOrder}/position")
  public ResponseEntity<OrderPosition> newOrderPosition(@RequestBody OrderPosition newPosition, @PathVariable String idOrder) {
    log.info("Save position: " + newPosition.toString());
    ProductionOrder order = repositoryOrder.findById(idOrder).orElseThrow(() -> new ResourceNotFoundException("Production Order", idOrder, null));
    newPosition.setPositionNumber(repository.findAllByProductionOrderOrderNumber(idOrder).size() + 1);
    newPosition.setProductionOrder(order);

    newPosition.getPostionSide().forEach(x -> x.getProfilDimensions().forEach(d -> d.setSumMb(d.getLength() * d.getQuantity())));
    newPosition.getPostionSide().forEach(x -> x.setSumAllDimensions(
      x.getProfilDimensions().stream()
        .map(d -> d.getSumMb())
        .collect(Collectors.summingDouble(Double::doubleValue)
        )));

    newPosition.getPostionSide().forEach(x -> x.setStatusPositionSide(StatusPositionSide.NEW));
    newPosition.setStatusOrderPosition(StatusOrderPosition.NEW);

    log.info(newPosition);

    return ResponseEntity
      .ok()
      .body(repository.save(newPosition));
  }

  /**
   * Reorder position order.
   *
   * @param newPositionOrder the map of posistion order in Order
   * @return the response entity
   */
  @PatchMapping("/production/order/position/reorder")
  public ResponseEntity<String> reOrderPosition(@RequestBody Map<Long, Integer> newPositionOrder) {
    log.info("reorder positions: " + newPositionOrder);

    newPositionOrder.forEach((id, nn) -> {
      repository.findById(id).ifPresent(or ->
        {
          log.info("Change on: " + id + " to position: " + nn + " from: " + or.getPositionNumber());
          or.setPositionNumber(nn);
          repository.save(or);
        }
      );
    });

    return ResponseEntity
      .ok()
      .body("DONE");
  }


  /**
   * Update part position on order.
   *
   * @param updatePosition the order position
   * @return the response entity
   */
  @PutMapping("/production/order/{idOrder}/position/{idPosition}")
  public ResponseEntity<String> updateOrderPosition(@RequestBody OrderPosition updatePosition, @PathVariable String idOrder, @PathVariable Long idPosition) {
    log.info("Update OrderPosition id: " + idPosition);
    OrderPosition orderPosition = repository.findById(idPosition).orElseThrow(() -> new ResourceNotFoundException("Order Position", Long.toString(idPosition), null));

    orderPosition.setProfilType(updatePosition.getProfilType());
    orderPosition.setProfilNumber(updatePosition.getProfilNumber());
    orderPosition.setComment(updatePosition.getComment());
    orderPosition.setAlu(updatePosition.isAlu());

    updatePosition.getPostionSide().stream().forEach(poz -> {
      log.info("Update poz: " + poz.getId());
      if (poz.getId() != null) {
        PositionSide tmp = repositorySide.findById(poz.getId()).orElseThrow(() -> new ResourceNotFoundException("Side", Long.toString(poz.getId()), null));
        tmp.setSide(poz.getSide());
        tmp.setFilmNumber(poz.getFilmNumber());
        tmp.setFilmWidth(poz.getFilmWidth());
        tmp.setFilmEntrusted(poz.isFilmEntrusted());
        tmp.setHard(poz.isHard());
        poz.getProfilDimensions().stream().forEach(dim -> {
          if (dim.getId() != null) {
            ProfilDimension profilDimension = repositoryDimension.findById(dim.getId()).orElseThrow(() -> new ResourceNotFoundException("Dim", Long.toString(dim.getId()), null));
            profilDimension.setQuantity(dim.getQuantity());
            profilDimension.setLength(dim.getLength());
            profilDimension.setSumMb(dim.getQuantity() * dim.getLength());
          } else {
            tmp.getProfilDimensions().add(dim);
          }
        });
      } else {
        log.info("ADD NEW SIDE");
        poz.setStatusPositionSide(StatusPositionSide.NEW);
        orderPosition.getPostionSide().add(poz);
      }
    });

    //DELETE DIM
    updatePosition.getPostionSide().forEach(side -> {
      PositionSide positionSide = repositorySide.findById(side.getId()).orElseThrow(() -> new ResourceNotFoundException("Side", Long.toString(idPosition), null));

      List<ProfilDimension> toRemove = new ArrayList();
      positionSide.getProfilDimensions().forEach(us -> {
        ProfilDimension test = side.getProfilDimensions().stream().filter(uf -> uf.getId() == us.getId()).findFirst().orElse(null);
        if (test == null) {
          ProfilDimension dim = repositoryDimension.findById(us.getId()).orElseThrow(() -> new ResourceNotFoundException("Dimension", Long.toString(us.getId()), null));
          log.info("Delete dim id: " + dim);
          toRemove.add(dim);
        }
      });
      toRemove.forEach(tmpdim -> {
        positionSide.getProfilDimensions().remove(tmpdim);
      });

      repositorySide.save(positionSide);
    });

    //DELETE SIDE
    List<PositionSide> toRemoveSides = new ArrayList();
    orderPosition.getPostionSide().forEach(si -> {
      PositionSide test = updatePosition.getPostionSide().stream().filter(ps -> ps.getId() == si.getId()).findFirst().orElse(null);
      if (test == null) {
        log.info("DELETE: " + si.getSide());
        toRemoveSides.add(si);
      }
    });
    toRemoveSides.forEach(tmp -> {
      log.info("Delete side: " + tmp);
      orderPosition.getPostionSide().remove(tmp);
    });

    orderPosition.getPostionSide().forEach(x -> x.getProfilDimensions().forEach(d -> d.setSumMb(d.getLength() * d.getQuantity())));
    orderPosition.getPostionSide().forEach(x -> x.setSumAllDimensions(
      x.getProfilDimensions().stream()
        .map(d -> d.getSumMb())
        .collect(Collectors.summingDouble(Double::doubleValue)
        )));

    repository.save(orderPosition);

    return ResponseEntity
      .ok()
      .body("Position Order updated.");
  }

  /**
   * Update done position information.
   *
   * @param updatePosition the order position inforamtion
   * @return the response entity
   */
  @PutMapping("/production/order/{idOrder}/position/{idPosition}/done")
  public ResponseEntity<String> updateOrderPositionDone(@RequestBody OrderPosition updatePosition, @PathVariable String idOrder, @PathVariable Long idPosition) {
    log.info("Update complete information in position: " + idPosition);
    OrderPosition orderPosition = repository.findById(idPosition).orElseThrow(() -> new ResourceNotFoundException("Order Position", Long.toString(idPosition), null));
    orderPosition.setCompleted(updatePosition.isCompleted());
    orderPosition.setDateCompletedPosition(updatePosition.getDateCompletedPosition());
    repository.save(orderPosition);

    return ResponseEntity
      .ok()
      .body("Position Order done info updated.");
  }

  /**
   * Warranty set.
   *
   * @param updateWarranty warranty
   * @return the response entity
   */
  @PatchMapping("/production/order/{idOrder}/position/{idPosition}/warranty")
  public ResponseEntity<String> warrantyOrderPosition(@RequestParam("value") boolean updateWarranty, @PathVariable String idOrder, @PathVariable Long idPosition) {
    log.info("Change warranty on position:" + idPosition);

    OrderPosition orderPosition = repository.findById(idPosition).orElseThrow(() -> new ResourceNotFoundException("Order Position", Long.toString(idPosition), null));
    orderPosition.setWarranty(updateWarranty);
    repository.save(orderPosition);

    return ResponseEntity
      .ok()
      .body("DONE");
  }

  /**
   * Accepted set.
   *
   * @param updateAccepted position accepted
   * @return the response entity
   */
  @PatchMapping("/production/order/{idOrder}/position/{idPosition}/accepted")
  public ResponseEntity<String> acceptOrderPosition(@RequestParam("value") boolean updateAccepted, @PathVariable String idOrder, @PathVariable Long idPosition) {
    log.info("Change accepted on position:" + idPosition);

    OrderPosition orderPosition = repository.findById(idPosition).orElseThrow(() -> new ResourceNotFoundException("Order Position", Long.toString(idPosition), null));
    orderPosition.setAccepted(updateAccepted);
    repository.save(orderPosition);

    return ResponseEntity
      .ok()
      .body("DONE");
  }

  /**
   * fvnumber set.
   *
   * @param fvnumber position fvnumber
   * @return the response entity
   */
  @PatchMapping("/production/order/{idOrder}/position/{idPosition}/fvnumber")
  public ResponseEntity<String> fvnumberOrderPosition(@RequestBody String fvnumber, @PathVariable String idOrder, @PathVariable Long idPosition) {
    log.info("Change fvnumber on position:" + idPosition);

    OrderPosition orderPosition = repository.findById(idPosition).orElseThrow(() -> new ResourceNotFoundException("Order Position", Long.toString(idPosition), null));
    orderPosition.setNumberFv(fvnumber);
    repository.save(orderPosition);

    return ResponseEntity
      .ok()
      .body("DONE");
  }

  /**
   * Delete OrderPosition.
   *
   * @param idPosition the OrderPosition id
   * @return the responseStatus ok
   * @throws ResourceNotFoundException the exception
   */
  @DeleteMapping("/production/order/{idOrder}/position/{idPosition}")
  public ResponseEntity<String> deleteMyCompany(@PathVariable String idOrder, @PathVariable Long idPosition) {
    log.info("OrderPosition - delete OrderPosition, ID: " + idPosition);

//    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//    if (auth != null && auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ADMIN"))) {
    OrderPosition orderPosition =
      repository
        .findById(idPosition)
        .orElseThrow(() -> new ResourceNotFoundException("OrderPosition", Long.toString(idPosition), null));
    repository.delete(orderPosition);
    return ResponseEntity.ok().body("Position with " + idPosition + " deleted!");
//    }
//    return ResponseEntity.status(403).body("Forbidden");
  }


}
