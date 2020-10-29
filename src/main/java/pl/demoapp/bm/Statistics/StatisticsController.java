package pl.demoapp.bm.Statistics;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.demoapp.bm.Offers.Offer.OfferRepository;
import pl.demoapp.bm.Production.Orders.ProductionOrderRepository;

import java.time.LocalDate;
import java.util.Calendar;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@Log4j2
@RequestMapping("/api")
public class StatisticsController {

  @Autowired
  StatisticsRepository repository;

  @Autowired
  ProductionOrderRepository productionOrderRepository;

  @Autowired
  OfferRepository offerRepository;

  /**
   * Get stats.
   *
   * @return the stat
   */
  @GetMapping("/stats")
  public ResponseEntity<List<Statistics>> getAll() {
    return ResponseEntity.ok().body(repository.findAll());
  }

  @Async
  @Scheduled(cron = "0 0 20 * * MON-FRI", zone = "Europe/Warsaw")
  public void saveStats() {
    log.info("SAVE - STATS");
    Calendar calendar = Calendar.getInstance();
    Statistics statistics = new Statistics();
    statistics.setCountOffers(offerRepository.count());
    statistics.setCountOrders(productionOrderRepository.count());
    statistics.setTimeDate(calendar.toInstant());
    repository.save(statistics);
  }


}
