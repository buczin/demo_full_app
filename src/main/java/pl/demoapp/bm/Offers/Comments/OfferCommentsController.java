package pl.demoapp.bm.Offers.Comments;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.demoapp.bm.Exeptions.ResourceNotFoundException;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@Log4j2
@RequestMapping("/api")
public class OfferCommentsController {

  @Autowired
  OfferCommentsRepository repository;

  /**
   * Get all offer comments.
   *
   * @return the list
   */
  @GetMapping("/marketing/offer/comments")
  public ResponseEntity<List<OfferComments>> getAllByOrder() {

    return ResponseEntity.ok().body(
      repository.findAll().stream().sorted(Comparator.comparingInt(OfferComments::getNumber)).collect(Collectors.toList()));
  }

  /**
   * Create comment.
   *
   * @param newComments the offer position
   * @return the response entity
   */
  @PostMapping("/marketing/offer/comments")
  public ResponseEntity<OfferComments> newOfferNote(@RequestBody String newComments) {

    OfferComments newCommentsTmp = new OfferComments();
    newCommentsTmp.setComment(newComments);

    return ResponseEntity
      .ok()
      .body(repository.save(newCommentsTmp));
  }

  /**
   * Update comment.
   *
   * @param updateComment string
   * @return the response entity
   */
  @PutMapping("/marketing/offer/comments/{id}")
  public ResponseEntity<OfferComments> newOfferNote(@RequestBody String updateComment, @PathVariable int id) {
    OfferComments comments = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Comment", Long.toString(id), null));

    comments.setComment(updateComment);

    return ResponseEntity
      .ok()
      .body(repository.save(comments));
  }

  /**
   * Update positions.
   *
   * @param updatePosition string
   * @return the response entity
   */
  @PutMapping("/marketing/offer/comments/reposition")
  public ResponseEntity<List<OfferComments>> offerChangePos(@RequestBody List<OfferComments> updatePosition) {

    return ResponseEntity
      .ok()
      .body(repository.saveAll(updatePosition));
  }

  /**
   * Delete comment.
   *
   * @return the response entity
   */
  @DeleteMapping("/marketing/offer/comments/{id}")
  public ResponseEntity<String> deletefferNote(@PathVariable int id) {
    log.info("Offer Comments - DELETE comment id: " + id);
    OfferComments comment = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Comment", Long.toString(id), null));
    repository.delete(comment);
    return ResponseEntity
      .ok()
      .body("DELETE");
  }

}
