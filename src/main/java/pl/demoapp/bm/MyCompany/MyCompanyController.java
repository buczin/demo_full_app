package pl.demoapp.bm.MyCompany;


import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pl.demoapp.bm.Exeptions.ResourceNotFoundException;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@Log4j2
@RequestMapping("/api")
public class MyCompanyController {

  @Autowired
  MyCompanyRepository repository;

  /**
   * Get all mycompanys list.
   *
   * @return the list
   */
  @GetMapping("/mycompanies")
  public ResponseEntity<List<MyCompany>> getAll() {
    return ResponseEntity
      .ok()
      .body(repository.findAllByOrderByNameAsc());
  }

  /**
   * Gets company by id.
   *
   * @param id the company id
   * @return the company by id
   * @throws ResourceNotFoundException the resource not found exception
   */
  @GetMapping("/mycompany/{id}")
  public ResponseEntity<MyCompany> getOne(@PathVariable Long id) {
    MyCompany myCompany =
      repository
        .findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Company", Long.toString(id), null));
    return ResponseEntity
      .ok()
      .body(myCompany);
  }

  /**
   * Create mycompany.
   *
   * @param newCompany the mycompany
   * @return the response entity
   */
  @PostMapping("/mycompany")
  public ResponseEntity<MyCompany> newCompany(@RequestBody MyCompany newCompany) {
    log.info("MyCompany - add new my company");
    return ResponseEntity
      .ok()
      .body(repository.save(newCompany));
  }

  /**
   * Update mycompany response entity.
   *
   * @param id           the MyCompany id
   * @param newMyCompany the response entity
   * @throws ResourceNotFoundException the resource not found exception
   */
  @PutMapping("/mycompany/{id}")
  public ResponseEntity<MyCompany> update(@Valid @RequestBody MyCompany newMyCompany, @PathVariable Long id) {
    log.info("MyCompany - update data, ID: " + id);
    MyCompany mycompany =
      repository
        .findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("MyCompany", Long.toString(id), null));
    mycompany.setName(newMyCompany.getName());
    mycompany.setEmail(newMyCompany.getEmail());
    mycompany.setShortName(newMyCompany.getShortName());

    mycompany.setTown(newMyCompany.getTown());
    mycompany.setStreet(newMyCompany.getStreet());
    mycompany.setHouseNumber(newMyCompany.getHouseNumber());
    mycompany.setFlatNumber(newMyCompany.getFlatNumber());
    mycompany.setPostalCode(newMyCompany.getPostalCode());
    mycompany.setProvince(newMyCompany.getProvince());
    mycompany.setCountry(newMyCompany.getCountry());

    mycompany.setFvemail(newMyCompany.getFvemail());
    mycompany.setRegon(newMyCompany.getRegon());
    mycompany.setPhonenumber(newMyCompany.getPhonenumber());
    mycompany.setPhonenumber2(newMyCompany.getPhonenumber2());
    mycompany.setLogoLink(newMyCompany.getLogoLink());
    mycompany.setWww(newMyCompany.getWww());
    mycompany.setShortId(newMyCompany.getShortId());

    final MyCompany updatedMyCompany = repository.save(mycompany);
    return ResponseEntity.ok(updatedMyCompany);
  }

  /**
   * Delete mycompany.
   *
   * @param id the mycompany id
   * @return the responseStatus ok
   * @throws ResourceNotFoundException the exception
   */
  @DeleteMapping("/mycompany/{id}")
  public ResponseEntity<String> deleteMyCompany(@PathVariable Long id) {
    log.info("MyCompany - delete my company, ID: " + id);
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    if (auth != null && auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ADMIN"))) {
      MyCompany mycompany =
        repository
          .findById(id)
          .orElseThrow(() -> new ResourceNotFoundException("MyCompany", Long.toString(id), null));
      repository.delete(mycompany);
      return ResponseEntity.ok().body("MyCompany with " + id + " deleted!");
    }
    return ResponseEntity.status(403).body("Forbidden");
  }

  /**
   * Check if producer exists by nip.
   *
   * @param nip the producer name
   * @return true or false
   */
  @GetMapping("/mycompany")
  public ResponseEntity<Boolean> checkIfMyCompanyExists(@RequestParam("nip") String nip) {
    boolean test = repository.existsByNip(nip);
    return ResponseEntity.ok().body(test);
  }

}

