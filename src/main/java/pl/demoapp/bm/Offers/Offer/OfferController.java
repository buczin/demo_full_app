package pl.demoapp.bm.Offers.Offer;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.demoapp.bm.Exeptions.ResourceNotFoundException;
import pl.demoapp.bm.MyCompany.MyCompany;
import pl.demoapp.bm.Offers.Comments.OfferComments;
import pl.demoapp.bm.Offers.Comments.OfferCommentsRepository;
import pl.demoapp.bm.Offers.Helpers.OfferHelperRepository;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@Log4j2
@RequestMapping("/api")
public class OfferController {

  @Autowired
  OfferRepository repository;

  @Autowired
  OfferHelperRepository helpersRepository;

  @Autowired
  OfferCommentsRepository offerCommentsRepository;

  /**
   * Get all offers list.
   *
   * @return the list
   */
  @GetMapping("/marketing/offers/all")
  public ResponseEntity<List<Offer>> getAll() {
    return ResponseEntity.ok().body(repository.findAll());
  }

  /**
   * Get one order by id.
   *
   * @return the object
   */
  @GetMapping("/marketing/offer/{id}")
  public ResponseEntity<Offer> getOneById(@PathVariable String id) {
    return ResponseEntity.ok().body(
      repository
        .findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Offer", id, null))
    );
  }

  /**
   * Get all offers by status.
   *
   * @return the list
   */
  @GetMapping("/marketing/offers/by")
  public ResponseEntity<List<Offer>> getAllByStatus(@RequestParam(name = "status") OfferStatus status) {
    return ResponseEntity.ok().body(repository.findAllByOfferStatus(status));
  }

  /**
   * Create offer.
   *
   * @param newOffer the Offer
   * @return the response entity
   */
  @PostMapping("/marketing/offer")
  public ResponseEntity<Offer> newOrder(@RequestBody Offer newOffer) {
    log.info("OFFER - Add new");
    // SET DEFAULT
    newOffer.setPrintTextHeader(helpersRepository.getOne(1).getDefaultPrintTextHeader());
    newOffer.setPrintTextTableFotter(helpersRepository.getOne(1).getDefaultPrintTextTableFotter());
    List<OfferComments> tmp = offerCommentsRepository.findAll().stream().sorted(Comparator.comparingInt(OfferComments::getNumber)).collect(Collectors.toList());
    newOffer.setOfferComments(new HashSet<>(tmp));

    if (!newOffer.getOfferNumber().isEmpty()) {
      if (repository.findById(newOffer.getOfferNumber()).isPresent()) {
        log.info("Offer number exists");
        return ResponseEntity.badRequest().body(null);
      } else {
        log.info("Offer saved with custom number");
        newOffer.setOfferStatus(OfferStatus.NEW);
        return ResponseEntity
          .ok()
          .body(repository.save(newOffer));
      }
    } else {
      log.info("Order number empty");
      newOffer.setOfferStatus(OfferStatus.NEW);
      log.info(newOffer.getOfferDate());
      String nr = generate(newOffer.getOfferDate(), newOffer.getMyCompany());
      log.info("Generated order number: " + nr);
      newOffer.setOfferNumber(nr);
      return ResponseEntity
        .ok()
        .body(repository.save(newOffer));
    }
  }

  public String generate(Date dateAdd, MyCompany myCompany) {
    SimpleDateFormat formate = new SimpleDateFormat("MMyy");
    SimpleDateFormat formateMonth = new SimpleDateFormat("MM");
    int month = Integer.parseInt(formateMonth.format(dateAdd));
    Optional<Offer> offer = repository.findByOfferDate(month, myCompany.getId());
    if (!offer.isPresent()) {
      return "1" + formate.format(dateAdd) + "-O-" + myCompany.getShortId();
    } else {
      String lastId = offer.get().getOfferNumber().substring(0, offer.get().getOfferNumber().length() - 9);
      return (Integer.parseInt(lastId) + 1) + formate.format(dateAdd) + "-O-" + myCompany.getShortId();
    }
  }

  /**
   * Update offer status.
   *
   * @param offerStatus the OfferStatus
   * @return the response entity
   */
  @PutMapping("/marketing/offer/{idOffer}/status")
  public ResponseEntity<String> updateOfferStatus(@RequestBody String offerStatus, @PathVariable String idOffer) {

    Offer offer = repository.findById(idOffer).orElseThrow(() -> new ResourceNotFoundException("Offer", idOffer, null));
    log.info("Offer - change status from: " + offer.getOfferStatus() + " to: " + offerStatus);
    offer.setOfferStatus(OfferStatus.valueOf(offerStatus));
    repository.save(offer);

    return ResponseEntity
      .ok()
      .body("Offer status changed");
  }


  /**
   * Delete Offer.
   *
   * @param idOffer the Offer id
   * @return the responseStatus ok
   * @throws ResourceNotFoundException the exception
   */
  @DeleteMapping("/marketing/offer/{idOffer}")
  public ResponseEntity<String> deleteOffer(@PathVariable String idOffer) {
    log.info("Offer - delete offer, ID: " + idOffer);

    Offer offer =
      repository
        .findById(idOffer)
        .orElseThrow(() -> new ResourceNotFoundException("Offer", idOffer, null));

    if (offer.getOfferStatus() == OfferStatus.NEW) {
      repository.delete(offer);
    } else {
      return ResponseEntity.ok().body("Offer with " + idOffer + "can't be deleted!");
    }
    return ResponseEntity.ok().body("Offer with " + idOffer + " deleted!");
  }


  /**
   * Count all Offers
   *
   * @return Number of offers
   */
  @GetMapping("/marketing/offers/count")
  public ResponseEntity<Long> countOffers() {
    return ResponseEntity.ok().body(repository.count());
  }


  /**
   * Update offer print text header.
   *
   * @param updatePrintText printText
   * @return the response entity
   */
  @PutMapping("/marketing/offer/{idOffer}/print-text-header")
  public ResponseEntity<String> updatePrintTextHeader(@RequestBody String updatePrintText, @PathVariable String idOffer) {

    Offer offer = repository.findById(idOffer).orElseThrow(() -> new ResourceNotFoundException("Offer", idOffer, null));
    offer.setPrintTextHeader(updatePrintText);
    repository.save(offer);

    return ResponseEntity
      .ok()
      .body(updatePrintText);
  }

  /**
   * Update offer print text table footer.
   *
   * @param updatePrintText printText
   * @return the response entity
   */
  @PutMapping("/marketing/offer/{idOffer}/print-text-table-footer")
  public ResponseEntity<String> updatePrintTextTableFooter(@RequestBody String updatePrintText, @PathVariable String idOffer) {

    Offer offer = repository.findById(idOffer).orElseThrow(() -> new ResourceNotFoundException("Offer", idOffer, null));
    offer.setPrintTextTableFotter(updatePrintText);
    repository.save(offer);

    return ResponseEntity
      .ok()
      .body(updatePrintText);
  }

  /**
   * Update offer comments.
   *
   * @param updateComments offer comments
   * @return the response entity
   */
  @PutMapping("/marketing/offer/{idOffer}/offer-comments")
  public ResponseEntity<List<OfferComments>> updateOfferComments(@RequestBody List<OfferComments> updateComments, @PathVariable String idOffer) {

    Offer offer = repository.findById(idOffer).orElseThrow(() -> new ResourceNotFoundException("Offer", idOffer, null));
    List<OfferComments> tmp = updateComments.stream().sorted(Comparator.comparingInt(OfferComments::getNumber)).collect(Collectors.toList());
    offer.setOfferComments(new HashSet<>(tmp));
    repository.save(offer);

    return ResponseEntity
      .ok()
      .body(updateComments);
  }

}

