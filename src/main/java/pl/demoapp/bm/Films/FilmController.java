package pl.demoapp.bm.Films;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pl.demoapp.bm.Exeptions.ResourceNotFoundException;
import pl.demoapp.bm.Films.Producers.ProducerRepository;

import javax.annotation.security.RolesAllowed;
import javax.persistence.EntityManager;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@Log4j2
@RequestMapping("/api")
public class FilmController {

  @Autowired
  private FilmRepository repository;

  @Autowired
  private ProducerRepository producerRepository;

  /**
   * Get all films list.
   *
   * @return the list
   */
  @GetMapping("/films")
  public ResponseEntity<List<Film>> getAllFilms() {
    return ResponseEntity
      .ok()
      .body(repository.findAll());
  }

  /**
   * Gets films by id.
   *
   * @param id the film id
   * @return the films by id
   * @throws ResourceNotFoundException the resource not found exception
   */
  @GetMapping("/film/{id}")
  public ResponseEntity<Film> getOneFilm(@PathVariable Long id) {
    Film film =
      repository
        .findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Film", Long.toString(id), null));
    return ResponseEntity
      .ok()
      .body(film);
  }

  /**
   * Create film.
   *
   * @param newFilm the film
   * @return the response entity
   */
  @PostMapping("/film")
  public ResponseEntity<Film> newFilm(@RequestBody Film newFilm) {
    log.info("FILM - Add new film: " + newFilm);
    return ResponseEntity
      .ok()
      .body(repository.save(newFilm));
  }

  /**
   * Create films.
   *
   * @param newFilm the film[]
   * @return the response entity
   */
  @PostMapping("/films")
  public ResponseEntity newFilms(@RequestBody List<Film> newFilm) {
    repository.saveAll(newFilm);
    log.info("FILM - Add list of new film: " + newFilm);
    return ResponseEntity
      .ok().body("List ADDED");
  }

  /**
   * Update film response entity.
   *
   * @param id      the film id
   * @param newFoil the film details
   * @return the response entity
   * @throws ResourceNotFoundException the resource not found exception
   */
  @PutMapping("/film/{id}")
  public ResponseEntity<Film> update(@RequestBody Film newFoil, @PathVariable Long id) {
    log.info("FILM - Update film Id: " + id + " data: " + newFoil);
    Film film =
      repository
        .findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Film", Long.toString(id), null));

    film.setImgLink(newFoil.getImgLink());
    film.setName(newFoil.getName());
    film.setNumber(newFoil.getNumber());
    film.setSurchargePercentage(newFoil.getSurchargePercentage());
    film.setProducer(newFoil.getProducer());
    film.setRalNumber(newFoil.getRalNumber());
    film.setStatus(newFoil.getStatus());
    film.setOthersNumber(newFoil.getOthersNumber());
    film.setMaxWidth(newFoil.getMaxWidth());

    final Film updatedFilm = repository.save(film);
    return ResponseEntity.ok(updatedFilm);
  }

  /**
   * Delete film.
   *
   * @param id the film id
   * @return the responseStatus ok
   * @throws ResourceNotFoundException the exception
   */
  @DeleteMapping("/film/{id}")
  public ResponseEntity<String> deleteFilm(@PathVariable Long id) {
    log.info("FILM - Delete film: " + id);
//      Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//      if (auth != null && auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ADMIN"))) {
    Film film =
      repository
        .findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Film", Long.toString(id), null));
    repository.delete(film);
    return ResponseEntity.ok().body("Film with " + id + " deleted!");
  }
//      return ResponseEntity.status(403).body("Forbidden");
//    }

  /**
   * Check if film exists by number.
   *
   * @param number the film number
   * @return true or false
   */
  @GetMapping("/film")
  public ResponseEntity<Boolean> checkIfFilmExists(@RequestParam("number") String number) {
    boolean test = repository.existsByNumber(number);
    return ResponseEntity.ok().body(test);
  }

  /**
   * Count all positions of film
   *
   * @return Number of films
   */
  @GetMapping("/film/count")
  public ResponseEntity<Long> countFilms() {
    return ResponseEntity.ok().body(repository.count());
  }
}


