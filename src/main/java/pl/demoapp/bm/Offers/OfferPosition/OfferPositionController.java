package pl.demoapp.bm.Offers.OfferPosition;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.demoapp.bm.Calculator.Calculator;
import pl.demoapp.bm.Contractors.Client;
import pl.demoapp.bm.Contractors.ClientRepository;
import pl.demoapp.bm.Exeptions.ResourceNotFoundException;
import pl.demoapp.bm.Offers.Helpers.OfferHelperRepository;
import pl.demoapp.bm.Offers.Offer.Offer;
import pl.demoapp.bm.Offers.Offer.OfferRepository;
import pl.demoapp.bm.Offers.OfferPositionSide.OfferPositionSide;
import pl.demoapp.bm.Offers.OfferPositionSide.OfferPositionSideRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@Log4j2
@RequestMapping("/api")
public class OfferPositionController extends Calculator {

  @Autowired
  OfferPositionRepository repository;

  @Autowired
  OfferPositionSideRepository sideRepository;

  @Autowired
  OfferRepository offerRepository;

  @Autowired
  OfferHelperRepository helpersRepository;

  @Autowired
  ClientRepository clientRepository;

  /**
   * Get all offer positions.
   *
   * @return the list
   */
  @GetMapping("/marketing/offers/{id}/positions")
  public ResponseEntity<List<OfferPosition>> getAllByOrder(@PathVariable String id) {

    return ResponseEntity.ok().body(
      repository
        .findAllByOffer(id)
        .orElseThrow(() -> new ResourceNotFoundException("Offer", id, null))
    );
  }

  /**
   * Create position in offer.
   *
   * @param newOfferPosition the offer position
   * @return the response entity
   */
  @PostMapping("/marketing/offer/{id}/position")
  public ResponseEntity<OfferPosition> newOrderPosition(@RequestBody OfferPosition newOfferPosition, @PathVariable String id) {
    log.info("Save position: " + newOfferPosition);
    Offer offer = offerRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Offer", id, null));
    Client client = clientRepository.findById(offer.getClient().getId()).orElseThrow(() -> new ResourceNotFoundException("Client", id, null));
    newOfferPosition.setPositionNumber(repository.findAllByOfferOfferNumber(id).size() + 1);
    newOfferPosition.setOffer(offer);

    newOfferPosition.setOfferPositionSides(calculateOfferSide(newOfferPosition.getOfferPositionSides(), client, "nowa"));

    final OfferPosition result = repository.save(newOfferPosition);
    offerRepository.save(calculateOffer(offer));

    return ResponseEntity
      .ok()
      .body(result);
  }

  /**
   * Update position in offer.
   *
   * @param updateOfferPosition the offer position
   * @return the response entity
   */
  @PutMapping("/marketing/offer/{idOffer}/position/{id}")
  public ResponseEntity<OfferPosition> updateOrderPosition(@RequestBody OfferPosition updateOfferPosition, @PathVariable String idOffer, @PathVariable Long id) {
    //UPDATE
    log.info("Update position: " + updateOfferPosition.getId());
    Offer offer = offerRepository.findById(idOffer).orElseThrow(() -> new ResourceNotFoundException("Offer", idOffer, null));
    Client client = clientRepository.findById(offer.getClient().getId()).orElseThrow(() -> new ResourceNotFoundException("Client", "", null));
    OfferPosition offerPosition = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Offer", "", null));

    offerPosition.setProfilNumber(updateOfferPosition.getProfilNumber());
    offerPosition.setProfilType(updateOfferPosition.getProfilType());
    offerPosition.setWarranty(updateOfferPosition.isWarranty());
    offerPosition.setAlu(updateOfferPosition.isAlu());
    offerPosition.setCatalogIdHelper(updateOfferPosition.getCatalogIdHelper());

    updateOfferPosition.getOfferPositionSides().stream().forEach(side -> {
      if (side.getId() != null) {
        OfferPositionSide offerPositionSide = sideRepository.findById(side.getId()).orElseThrow(() -> new ResourceNotFoundException("Offer", "", null));
        offerPositionSide.setSide(side.getSide());
        offerPositionSide.setFilmWidth(side.getFilmWidth());
        offerPositionSide.setFilmNumber(side.getFilmNumber());
        offerPositionSide.setQuantityMb(side.getQuantityMb());
        offerPositionSide.setAdditional(side.getAdditional());
        offerPositionSide.setCost(side.getCost());
        offerPositionSide.setCostChangeColor(side.getCostChangeColor());
        offerPositionSide.setChangeColor(side.isChangeColor());
        offerPositionSide.setmIs(side.getmIs());
        offerPositionSide.setCostSetupAdditional(side.getCostSetupAdditional());
        offerPositionSide.setBicolor(side.getBicolor());
        offerPositionSide.setExchangeRate(side.getExchangeRate());
        offerPositionSide.setHard(side.isHard());
        offerPositionSide.setFilmEntrusted(side.isFilmEntrusted());
      } else {
        log.info("ADD NEW SIDE");
        offerPosition.getOfferPositionSides().add(side);
      }
    });

    // DELETE
    List<OfferPositionSide> toRemoveSides = new ArrayList();
    offerPosition.getOfferPositionSides().stream().forEach(side -> {
      OfferPositionSide test = updateOfferPosition.getOfferPositionSides().stream().filter(x -> x.getId() == side.getId()).findFirst().orElse(null);
      if (test == null) {
        toRemoveSides.add(side);
      }
    });
    toRemoveSides.forEach(tmp -> {
      log.info("Delete side: " + tmp.getId());
      offerPosition.getOfferPositionSides().remove(tmp);
    });


    // CALC
    offerPosition.setOfferPositionSides(calculateOfferSide(offerPosition.getOfferPositionSides(), client, offer.getOfferNumber()));

    final OfferPosition result = repository.save(offerPosition);
    offerRepository.save(calculateOffer(offer));

    return ResponseEntity
      .ok()
      .body(result);
  }


  /**
   * Delete offer position.
   *
   * @param id the offer position id
   * @return the responseStatus ok
   * @throws ResourceNotFoundException the exception
   */
  @DeleteMapping("/marketing/offer/{idOffer}/position/{id}")
  public ResponseEntity<String> deleteClient(@PathVariable String idOffer, @PathVariable Long id) {
    log.info("delete offer position: " + id);
    OfferPosition offerPosition = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Offer position", Long.toString(id), null));
    repository.delete(offerPosition);

    Offer offer = offerRepository.findById(idOffer).orElseThrow(() -> new ResourceNotFoundException("Offer", idOffer, null));

    AtomicInteger index = new AtomicInteger(1);

    repository.findAllByOfferOfferNumber(idOffer).stream().sorted((a, b) -> {
      if (a.getPositionNumber() > b.getPositionNumber()) {
        return 1;
      }
      if (a.getPositionNumber() < b.getPositionNumber()) {
        return -1;
      }
      return 0;
    }).collect(Collectors.toList()).forEach(x -> {
      OfferPosition offerPosition1 = repository.findById(x.getId()).get();
      offerPosition1.setPositionNumber(index.getAndIncrement());
      repository.save(offerPosition1);
    });

    offerRepository.save(calculateOffer(offer));

    return ResponseEntity.ok().body("Offer position with " + id + " deleted!");
  }

  /**
   * Update offer cost of buying film.
   *
   * @param updateCost offer comments
   * @return the response entity
   */
  @PutMapping("/marketing/offer/{idOffer}/cost-buy-film")
  public ResponseEntity<Offer> updateOfferComments(@RequestBody Offer updateCost, @PathVariable String idOffer) {
    Offer offer = offerRepository.findById(idOffer).orElseThrow(() -> new ResourceNotFoundException("Offer", idOffer, null));
    offer.setCostNettoBuyFilm(updateCost.getCostNettoBuyFilm());
    offer.setBuyFilmComment(updateCost.getBuyFilmComment());
    Offer result = offerRepository.save(calculateOffer(offer));
    return ResponseEntity
      .ok()
      .body(result);
  }

}
