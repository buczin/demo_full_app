package pl.demoapp.bm.Offers.OfferMessages;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.demoapp.bm.Exeptions.ResourceNotFoundException;
import pl.demoapp.bm.Offers.Offer.Offer;
import pl.demoapp.bm.Offers.Offer.OfferRepository;
import pl.demoapp.bm.Offers.OfferPosition.OfferPosition;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@Log4j2
@RequestMapping("/api")
public class OfferNotesController {

  @Autowired
  OfferNotesRepository repository;

  @Autowired
  OfferRepository offerRepository;

  /**
   * Get all offer notes.
   *
   * @return the list
   */
  @GetMapping("/marketing/offer/{idOrder}/notes")
  public ResponseEntity<List<OfferNotes>> getAllByOrder(@PathVariable String idOrder) {

    return ResponseEntity.ok().body(
      repository
        .findAllByOfferOfferNumber(idOrder));
  }

  /**
   * Create note in offer.
   *
   * @param newNote the offer position
   * @return the response entity
   */
  @PostMapping("/marketing/offer/{idOrder}/notes")
  public ResponseEntity<OfferNotes> newOfferNote(@RequestBody String newNote, @PathVariable String idOrder) {
    Offer offer = offerRepository.findById(idOrder).orElseThrow(() -> new ResourceNotFoundException("OfferNotes", idOrder, null));

    OfferNotes newOfferNotes = new OfferNotes();
    newOfferNotes.setOffer(offer);
    newOfferNotes.setMessage(newNote);

    return ResponseEntity
      .ok()
      .body(repository.save(newOfferNotes));
  }

  /**
   * Update note in offer.
   *
   * @param updateNote string
   * @return the response entity
   */
  @PutMapping("/marketing/offer/{idOrder}/notes/{id}")
  public ResponseEntity<OfferNotes> newOfferNote(@RequestBody String updateNote, @PathVariable String idOrder, @PathVariable Long id) {
    OfferNotes offerNotes = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("OfferNotes", Long.toString(id), null));
    offerNotes.setMessage(updateNote);

    return ResponseEntity
      .ok()
      .body(repository.save(offerNotes));
  }

  /**
   * Delete note in offer.
   *
   * @return the response entity
   */
  @DeleteMapping("/marketing/offer/{idOrder}/notes/{id}")
  public ResponseEntity<String> deletefferNote(@PathVariable String idOrder, @PathVariable Long id) {
    log.info("OFFERNOTES - DELETE note id: " + id);
    OfferNotes offerNotes = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("OfferNotes", Long.toString(id), null));
    repository.delete(offerNotes);
    return ResponseEntity
      .ok()
      .body("DELETE");
  }

}
