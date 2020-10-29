package pl.demoapp.bm.Films.Producers;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pl.demoapp.bm.Contractors.Client;
import pl.demoapp.bm.Exeptions.ResourceNotFoundException;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api")
public class ProducerController {

  @Autowired
  ProducerRepository repository;

  /**
   * Get all producer list.
   *
   * @return the list
   */
  @GetMapping("/film/producers")
  public ResponseEntity<List<Producer>> getAllProducers() {
    return ResponseEntity
      .ok()
      .body(repository.findAll());
  }

  /**
   * Gets producer by id.
   *
   * @param id the producer id
   * @return the producer by id
   * @throws ResourceNotFoundException the resource not found exception
   */
  @GetMapping("/film/producer/{id}")
  public ResponseEntity<Producer> getOneProducer(@PathVariable Long id) {

    Producer producer =
      repository
        .findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Producer", Long.toString(id), null));
    return ResponseEntity
      .ok()
      .body(producer);
  }

  /**
   * Create Producer.
   *
   * @param newProducer the producer
   * @return the response entity
   */
  @PostMapping("/film/producer")
  public ResponseEntity<Producer> newProducer(@RequestBody Producer newProducer) {

    return ResponseEntity
      .ok()
      .body(repository.save(newProducer));
  }

  /**
   * Update producer response entity.
   *
   * @param id          the producer id
   * @param newProducer the producer details
   * @return the response entity
   * @throws ResourceNotFoundException the resource not found exception
   */
  @PutMapping("/film/producer/{id}")
  public ResponseEntity<Producer> update(@RequestBody Producer newProducer, @PathVariable Long id) {

    Producer producer =
      repository
        .findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Producer", Long.toString(id), null));

    producer.setProducerName(newProducer.getProducerName());
    return ResponseEntity.ok(repository.save(producer));
  }

  /**
   * Delete producer.
   *
   * @param id the producer id
   * @return the responseStatus ok
   * @throws ResourceNotFoundException the exception
   */
  @DeleteMapping("/film/producer/{id}")
  public ResponseEntity<String> deleteProducer(@PathVariable Long id) {
//    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//    if (auth != null && auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ADMIN"))) {
    Producer producer =
      repository
        .findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Producer", Long.toString(id), null));
    repository.delete(producer);
    return ResponseEntity.ok().body("Producer with " + id + " deleted!");
  }
//    return ResponseEntity.status(403).body("Forbidden");
//  }

  /**
   * Check if producer exists by name.
   *
   * @param name the producer name
   * @return true or false
   */
  @GetMapping("/film/producer")
  public ResponseEntity<Boolean> checkIfProducerExists(@RequestParam("name") String name) {
    boolean test = repository.existsByProducerName(name);
    System.out.println("Producer exists: " + test);
    return ResponseEntity.ok().body(test);
  }

  /**
   * Count all producers.
   *
   * @return Number of producers
   */
  @GetMapping("/film/producer/count")
  public ResponseEntity<Long> countProducers() {
    return ResponseEntity.ok().body(repository.count());
  }

}
