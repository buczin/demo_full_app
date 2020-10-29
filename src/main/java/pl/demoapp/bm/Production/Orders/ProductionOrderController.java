package pl.demoapp.bm.Production.Orders;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.demoapp.bm.Exeptions.ResourceNotFoundException;
import pl.demoapp.bm.MyCompany.MyCompany;
import pl.demoapp.bm.Production.OrderPosition.OrderPositonRepository;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@Log4j2
@RequestMapping("/api")
public class ProductionOrderController {

  @Autowired
  ProductionOrderRepository repository;

  @Autowired
  OrderPositonRepository orderPositonRepository;

  /**
   * Get all orders list.
   *
   * @return the list
   */
  @GetMapping("/production/orders")
  public ResponseEntity<List<ProductionOrder>> getAll() {
    //log.info("PRODUCTION ORDER - Get all");
    return ResponseEntity.ok().body(repository.findAll(Sort.by(Sort.Direction.ASC, "dateCreatedOrder")));

  }

  /**
   * Get orders by status.
   *
   * @return the list
   */
  @GetMapping("/production/ordersBy")
  public ResponseEntity<List<ProductionOrder>> getByStatus(@RequestParam("status") int sort) {
    //log.info("PRODUCTION ORDER - Get by status");
    return ResponseEntity.ok().body(repository.findAllByStatusOrder(StatusOrder.values()[sort]));

  }

  /**
   * Get one order by id.
   *
   * @return the object
   */
  @GetMapping("/production/order/{id}")
  public ResponseEntity<ProductionOrder> getOneById(@PathVariable String id) {
    log.info("PRODUCTION ORDER - Get by Id: " + id);
    return ResponseEntity.ok().body(
      repository
        .findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Production Order", id, null))
    );
  }

  /**
   * Create order.
   *
   * @param newOrder the ProductionOrder
   * @return the response entity
   */
  @PostMapping("/production/order")
  public ResponseEntity<ProductionOrder> newOrder(@RequestBody ProductionOrder newOrder) {
    log.info("PRODUCTION ORDER - Add new");

    if (!newOrder.getOrderNumber().isEmpty()) {
      if (repository.findById(newOrder.getOrderNumber()).isPresent()) {
        log.info("Order number exists");
        return ResponseEntity.badRequest().body(null);
      } else {
        log.info("Order saved with custom order number");
        newOrder.setStatusOrder(StatusOrder.NEW);
        return ResponseEntity
          .ok()
          .body(repository.save(newOrder));
      }
    } else {
      log.info("Order number empty");
      newOrder.setStatusOrder(StatusOrder.NEW);
      log.info(newOrder.getDateAcceptanceOrder());
      String nr = generate(newOrder.getDateAcceptanceOrder(), newOrder.getMyCompany());
      log.info("Generated order number: " + nr);
      newOrder.setOrderNumber(nr);

      return ResponseEntity
        .ok()
        .body(repository.save(newOrder));
    }
  }

  public String generate(Date dateAdd, MyCompany myCompany) {
    SimpleDateFormat formate = new SimpleDateFormat("MMyy");
    SimpleDateFormat formateMonth = new SimpleDateFormat("MM");
    int month = Integer.parseInt(formateMonth.format(dateAdd));
    Optional<ProductionOrder> productionOrder = repository.findByDateAcceptanceOrder(month, myCompany.getId());
    if (!productionOrder.isPresent()) {
      return "1" + formate.format(dateAdd) + "-Z-" + myCompany.getShortId();
    } else {
      String lastId = productionOrder.get().getOrderNumber().substring(0, productionOrder.get().getOrderNumber().length() - 9);
      return (Integer.parseInt(lastId) + 1) + formate.format(dateAdd) + "-Z-" + myCompany.getShortId();
    }
  }

  /**
   * Update order.
   *
   * @param updateOrder the order position
   * @return the response entity
   */
  @PutMapping("/production/order/{id}")
  public ResponseEntity<String> updateOrderPosition(@RequestBody ProductionOrder updateOrder, @PathVariable String id) {
    log.info("PRODUCTION ORDER - Update data");
    if (updateOrder.getOrderNumber() == null) {
      ProductionOrder productionOrder = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Production Order", id, null));
      productionOrder.setDateAcceptanceOrder(updateOrder.getDateAcceptanceOrder());
      productionOrder.setDateCompletedOrder(updateOrder.getDateCompletedOrder());
      productionOrder.setDateReceiptOrder(updateOrder.getDateReceiptOrder());
      productionOrder.setNumberClientOrder(updateOrder.getNumberClientOrder());
      productionOrder.setCompleted(updateOrder.isCompleted());
      productionOrder.setStatusOrder(updateOrder.getStatusOrder());
    } else {
      if (updateOrder.isCompleted()) {
        updateOrder.setStatusOrder(StatusOrder.DONE);
      }
      repository.save(updateOrder);
    }

    return ResponseEntity
      .ok()
      .body("Order updated.");
  }

  /**
   * Update order status.
   *
   * @param updateOrderStatus the order position
   * @return the response entity
   */
  @PutMapping("/production/order/{id}/status")
  public ResponseEntity<String> updateOrderPositionStatus(@RequestBody ProductionOrder updateOrderStatus, @PathVariable String id) {

    ProductionOrder productionOrder = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Production Order", id, null));
    log.info("PRODUCTION ORDER - change order status from: " + productionOrder.getStatusOrder() + " to: " + updateOrderStatus.getStatusOrder());
    productionOrder.setStatusOrder(updateOrderStatus.getStatusOrder());
    repository.save(productionOrder);

    return ResponseEntity
      .ok()
      .body("Order status changed");
  }

  /**
   * Delete ProductionOrder.
   *
   * @param idOrder the ProductionOrder id
   * @return the responseStatus ok
   * @throws ResourceNotFoundException the exception
   */
  @DeleteMapping("/production/order/{idOrder}")
  public ResponseEntity<String> deleteMyCompany(@PathVariable String idOrder) {
    log.info("ProductionOrder - delete ProductionOrder, ID: " + idOrder);

//    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//    if (auth != null && auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ADMIN"))) {
    ProductionOrder productionOrder =
      repository
        .findById(idOrder)
        .orElseThrow(() -> new ResourceNotFoundException("ProductionOrder", idOrder, null));

    if (productionOrder.getStatusOrder() == StatusOrder.NEW) {
      orderPositonRepository.findAllByProductionOrderOrderNumber(idOrder).stream().forEach(x -> {
        orderPositonRepository.delete(x);
      });
      repository.delete(productionOrder);
    } else {
      return ResponseEntity.ok().body("ProductionOrder with " + idOrder + "can't be deleted!");
    }
    return ResponseEntity.ok().body("ProductionOrder with " + idOrder + " deleted!");
//    }
//    return ResponseEntity.status(403).body("Forbidden");
  }

  /**
   * Count all Production Orders
   *
   * @return Number of orders
   */
  @GetMapping("/production/order/count")
  public ResponseEntity<Long> countProductionOrders() {
    // log.info("PRODUCTION ORDER - Get count");
    return ResponseEntity.ok().body(repository.count());
  }

  // ============== Get By status ==============

  /**
   * Get all new orders list.
   *
   * @return the list
   */
  @GetMapping("/production/orders/new")
  public ResponseEntity<List<ProductionOrder>> getAllNew() {
    // log.info("PRODUCTION ORDER - Get new all");
    return ResponseEntity.ok().body(repository.findAllByStatusOrder(StatusOrder.NEW));
  }

  /**
   * Get all inprogress orders list.
   *
   * @return the list
   */
  @GetMapping("/production/orders/inprogress")
  public ResponseEntity<List<ProductionOrder>> getAllInProgress() {
    //   log.info("PRODUCTION ORDER - Get inprogress all");
    return ResponseEntity.ok().body(repository.findAllByStatusOrder(StatusOrder.INPROGRESS));
  }

  /**
   * Get all done orders list.
   *
   * @return the list
   */
  @GetMapping("/production/orders/done")
  public ResponseEntity<List<ProductionOrder>> getAllDone() {
    //  log.info("PRODUCTION ORDER - Get done all");
    return ResponseEntity.ok().body(repository.findAllByStatusOrder(StatusOrder.DONE));
  }

  /**
   * Get all out orders list.
   *
   * @return the list
   */
  @GetMapping("/production/orders/out")
  public ResponseEntity<List<ProductionOrder>> getAllOut() {
    // log.info("PRODUCTION ORDER - Get out all");
    return ResponseEntity.ok().body(repository.findAllByStatusOrder(StatusOrder.ISSUEDALL));
  }

}


