package pl.demoapp.bm.ProfilesCatalog.Profiles;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pl.demoapp.bm.Exeptions.ResourceNotFoundException;
import pl.demoapp.bm.ProfilesCatalog.Systems.SystemProfil;
import pl.demoapp.bm.ProfilesCatalog.Systems.SystemProfilRepository;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@Log4j2
@RequestMapping("/api")
public class ProfileDetailsController {

  @Autowired
  private ProfileDetailsRepository repository;

  @Autowired
  private SystemProfilRepository repositorySystem;

  /**
   * Get list of all profiles in database
   *
   * @return List
   */
  @GetMapping("/catalog/profiles")
  public ResponseEntity<List<ProfileDetails>> getAllProfiles() {
    return ResponseEntity.ok().body(repository.findAll());
  }

  /**
   * Get One by id
   *
   * @return obj
   */
  @GetMapping("/catalog/profil/{id}")
  public ResponseEntity<Optional<ProfileDetails>> getOneById(@PathVariable(value = "id") Long id) {
    return ResponseEntity.ok(repository.findById(id));
  }

  /**
   * Get All by System
   *
   * @return List
   */
  @GetMapping("/catalog/profil/system/{systemId}")
  public ResponseEntity<List<ProfileDetails>> getAllBySystem(@PathVariable(value = "systemId") Long systemId) {
    SystemProfil system = repositorySystem
      .findById(systemId)
      .orElseThrow(() -> new ResourceNotFoundException("System", Long.toString(systemId), null));
    return ResponseEntity.ok(repository.findAllBySystemProfil(system));
  }

  /**
   * Add one new ProfleDetails
   */
  @PostMapping("/catalog/profil")
  public ResponseEntity setProfileDetails(@RequestBody ProfileDetails profileDetails) {
    log.info("ProfileDetails - add new position: " + profileDetails);
    SystemProfil systemX = profileDetails.getSystemProfil();
    if (repositorySystem.existsByName(systemX.getName())) {
      SystemProfil system = repositorySystem
        .findByName(systemX.getName()).orElseThrow(() -> new ResourceNotFoundException("System", systemX.toString(), null));
      profileDetails.setSystemProfil(system);
      repository.save(profileDetails);
      return ResponseEntity.ok().body(profileDetails);
    } else {
      SystemProfil saved = repositorySystem.save(systemX);
      SystemProfil system = repositorySystem
        .findById(saved.getId()).orElseThrow(() -> new ResourceNotFoundException("System", saved.toString(), null));
      profileDetails.setSystemProfil(system);
      repository.save(profileDetails);
      return ResponseEntity.ok().body(profileDetails);
    }
  }

  @PutMapping("/catalog/profil/{id}")
  public ResponseEntity<ProfileDetails> updateCatalog(@RequestBody ProfileDetails newKatalogProfile, @PathVariable Long id) {
    log.info("ProfileDetails - update on ID: " + id + " data: " + newKatalogProfile);
    ProfileDetails katalog =
      repository
        .findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Catalog profile not found", newKatalogProfile.toString(), null));

    SystemProfil systemX = newKatalogProfile.getSystemProfil();

    if (repositorySystem.existsByName(systemX.getName())) {
      SystemProfil system = repositorySystem
        .findByName(systemX.getName()).orElseThrow(() -> new ResourceNotFoundException("System", systemX.toString(), null));
      katalog.setSystemProfil(system);
    } else {
      SystemProfil saved = repositorySystem.save(systemX);
      SystemProfil system = repositorySystem
        .findById(saved.getId()).orElseThrow(() -> new ResourceNotFoundException("System", saved.toString(), null));
      katalog.setSystemProfil(system);
    }

    katalog.setNumber(newKatalogProfile.getNumber());
    katalog.setProfileType(newKatalogProfile.getProfileType());
    katalog.setDimCenterSide(newKatalogProfile.getDimCenterSide());
    katalog.setDimInner(newKatalogProfile.getDimInner());
    katalog.setDimOuter(newKatalogProfile.getDimOuter());
    katalog.setDimOneSide(newKatalogProfile.getDimOneSide());
    katalog.setDimTwoSide(newKatalogProfile.getDimTwoSide());
    katalog.setDimTwoSideInner(newKatalogProfile.getDimTwoSideInner());
    katalog.setDimTwoSideOuter(newKatalogProfile.getDimTwoSideOuter());
    katalog.setActualMeasurement(newKatalogProfile.isActualMeasurement());
    katalog.setOfferName(newKatalogProfile.getOfferName());
    katalog.setComments(newKatalogProfile.getComments());
    katalog.setHard(newKatalogProfile.isHard());
    katalog.setAlu(newKatalogProfile.isAlu());

    final ProfileDetails updatedKatalog = repository.save(katalog);
    return ResponseEntity.ok(updatedKatalog);
  }

  /**
   * Delete system.
   *
   * @param id the system id
   * @return the responseStatus ok
   * @throws ResourceNotFoundException the exception
   */
  @DeleteMapping("/catalog/profil/{id}")
  public ResponseEntity deleteSystem(@PathVariable Long id) {
    log.info("ProfileDetails - delete on ID: " + id);
//    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//    if (auth != null && auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ADMIN"))) {

    ProfileDetails profileDetails =
      repository
        .findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("ProfileDetails", Long.toString(id), null));
    repository.delete(profileDetails);
    return ResponseEntity.ok().body("ProfileDetails with " + id + " deleted!");
  }
//    return ResponseEntity.status(403).body("Forbidden");
  //}

  /**
   * Check if catalog exists by number.
   *
   * @param number the catalog number
   * @return true or false
   */
  @GetMapping("/catalog/profil")
  public ResponseEntity<Boolean> checkIfCatalogExists(@RequestParam("number") String number) {
    boolean test = repository.existsByNumber(number);
    return ResponseEntity.ok().body(test);
  }

  /**
   * Count all positions
   *
   * @return Number of positions
   */
  @GetMapping("/catalog/profil/count")
  public ResponseEntity<Long> countCatalog() {
    return ResponseEntity.ok().body(repository.count());
  }

}
