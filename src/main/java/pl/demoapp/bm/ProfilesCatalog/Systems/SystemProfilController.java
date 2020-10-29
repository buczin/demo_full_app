package pl.demoapp.bm.ProfilesCatalog.Systems;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pl.demoapp.bm.Exeptions.ResourceNotFoundException;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@Log4j2
@RequestMapping("/api")
public class SystemProfilController {

  @Autowired
  private SystemProfilRepository repository;

  /**
   * Get all systems list order by name.
   *
   * @return the list
   */
  @GetMapping("/catalog/systems")
  public ResponseEntity<List<SystemProfil>> allSystemByNames() {
    return ResponseEntity
      .ok()
      .body(repository.findAllByOrderByNameAsc());
  }

  /**
   * Gets System by id.
   *
   * @param id the system id
   * @return the system by id
   * @throws ResourceNotFoundException the resource not found exception
   */
  @GetMapping("/catalog/system/{id}")
  public ResponseEntity<SystemProfil> getOneSystem(@PathVariable Long id) {
    SystemProfil system =
      repository
        .findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("System", Long.toString(id), null));
    return ResponseEntity
      .ok()
      .body(system);
  }

  /**
   * Create system.
   *
   * @param newSystem the system
   * @return the response entity
   */
  @PostMapping("/catalog/system")
  public ResponseEntity<SystemProfil> newKatalogProfileFirmy(@RequestBody SystemProfil newSystem) {
    log.info("SystemProfil - add new system profil");
    return ResponseEntity
      .ok()
      .body(repository.save(newSystem));
  }

  /**
   * Update system response entity.
   *
   * @param id                     the system id
   * @param newKatalogSystemProfil the system details
   * @return the response entity
   * @throws ResourceNotFoundException the resource not found exception
   */
  @PutMapping("/catalog/system/{id}")
  public ResponseEntity<SystemProfil> updateKatalogProfileFirmy(@RequestBody SystemProfil newKatalogSystemProfil, @PathVariable Long id) {
    log.info("SystemProfil - update system, ID: " + id);
    SystemProfil katalogSystemProfil =
      repository
        .findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("System", Long.toString(id), null));

    katalogSystemProfil.setName(newKatalogSystemProfil.getName());
    katalogSystemProfil.setComment(newKatalogSystemProfil.getComment());

    final SystemProfil updatedSystem = repository.save(katalogSystemProfil);
    return ResponseEntity.ok(newKatalogSystemProfil);
  }

  /**
   * Delete system.
   *
   * @param id the system id
   * @return the responseStatus ok
   * @throws ResourceNotFoundException the exception
   */
  @DeleteMapping("/catalog/system/{id}")
  public ResponseEntity<String> deleteSystem(@PathVariable Long id) {
    log.info("SystemProfil - delete system, ID: " + id);
//    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//    if (auth != null && auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ADMIN"))) {
    SystemProfil system =
      repository
        .findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("System", Long.toString(id), null));
    repository.delete(system);
    return ResponseEntity.ok().body("System with " + id + " deleted!");
  }
//    return ResponseEntity.status(403).body("Forbidden");
//  }

  /**
   * Check if system exists by name.
   *
   * @param name the catalog name
   * @return true or false
   */
  @GetMapping("/catalog/system")
  public ResponseEntity<Boolean> checkIfCatalogExists(@RequestParam("name") String name) {
    boolean test = repository.existsByName(name);
    return ResponseEntity.ok().body(test);
  }

  /**
   * Count all systems
   *
   * @return Number of systems
   */
  @GetMapping("/catalog/system/count")
  public ResponseEntity<Long> countSystem() {
    return ResponseEntity.ok().body(repository.count());
  }


}
