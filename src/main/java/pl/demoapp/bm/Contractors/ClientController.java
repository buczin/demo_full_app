package pl.demoapp.bm.Contractors;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pl.demoapp.bm.Exeptions.ResourceNotFoundException;
import pl.demoapp.bm.Offers.Helpers.OfferHelper;
import pl.demoapp.bm.Offers.Helpers.OfferHelperRepository;

import javax.validation.Valid;
import java.util.List;


@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api")
public class ClientController {

  @Autowired
  ClientRepository repository;

  @Autowired
  OfferHelperRepository helpersRepository;

  /**
   * Get all clients list.
   *
   * @return the list
   */
  @GetMapping("/clients")
  public ResponseEntity<List<Client>> getAll() {
    return ResponseEntity
      .ok()
      .body(repository.findAllByOrderByNameAsc());
  }

  /**
   * Gets client by id.
   *
   * @param id the client id
   * @return the clients by id
   * @throws ResourceNotFoundException the resource not found exception
   */
  @GetMapping("/client/{id}")
  public ResponseEntity<Client> getOne(@PathVariable Long id) {
    Client client =
      repository
        .findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Client", Long.toString(id), null));
    return ResponseEntity
      .ok()
      .body(client);
  }

  /**
   * Create client.
   *
   * @param newClient the client
   * @return the response entity
   */
  @PostMapping("/client")
  public ResponseEntity<Client> newClient(@RequestBody Client newClient) {

    OfferHelper offerHelper = helpersRepository.getOne(1);

    newClient.setHelper_additional(1);
    newClient.setHelper_cost(0.04);
    newClient.setHelper_setUpCost(offerHelper.getDefaultClientSetUpCost());
    newClient.setHelper_costChangeColor(offerHelper.getDefaultCostChangeColor());

    newClient.setHelper_pcv_mEasyTo50(offerHelper.getDefault_helper_pcv_mEasyTo50());
    newClient.setHelper_pcv_mEasyTo150(offerHelper.getDefault_helper_pcv_mEasyTo150());
    newClient.setHelper_pcv_mEasyTo500(offerHelper.getDefault_helper_pcv_mEasyTo500());
    newClient.setHelper_pcv_mEasyAbove500(offerHelper.getDefault_helper_pcv_mEasyAbove500());
    newClient.setHelper_pcv_mHardTo50(offerHelper.getDefault_helper_pcv_mHardTo50());
    newClient.setHelper_pcv_mHardTo150(offerHelper.getDefault_helper_pcv_mHardTo150());
    newClient.setHelper_pcv_mHardTo500(offerHelper.getDefault_helper_pcv_mHardTo500());
    newClient.setHelper_pcv_mHardAbove500(offerHelper.getDefault_helper_pcv_mHardAbove500());

    newClient.setHelper_alu_mEasyTo50(offerHelper.getDefault_helper_alu_mEasyTo50());
    newClient.setHelper_alu_mEasyTo150(offerHelper.getDefault_helper_alu_mEasyTo150());
    newClient.setHelper_alu_mEasyTo500(offerHelper.getDefault_helper_alu_mEasyTo500());
    newClient.setHelper_alu_mEasyAbove500(offerHelper.getDefault_helper_alu_mEasyAbove500());
    newClient.setHelper_alu_mHardTo50(offerHelper.getDefault_helper_alu_mHardTo50());
    newClient.setHelper_alu_mHardTo150(offerHelper.getDefault_helper_alu_mHardTo150());
    newClient.setHelper_alu_mHardTo500(offerHelper.getDefault_helper_alu_mHardTo500());
    newClient.setHelper_alu_mHardAbove500(offerHelper.getDefault_helper_alu_mHardAbove500());

    return ResponseEntity
      .ok()
      .body(repository.save(newClient));
  }

  /**
   * Update client response entity.
   *
   * @param id        the client id
   * @param newClient the client details
   * @return the response entity
   * @throws ResourceNotFoundException the resource not found exception
   */
  @PutMapping("/client/{id}")
  public ResponseEntity<Client> replace(@Valid @RequestBody Client newClient, @PathVariable Long id) {
    Client client =
      repository
        .findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Client", Long.toString(id), null));

    client.setSymfoniaId(newClient.getSymfoniaId());
    client.setShortName(newClient.getShortName());
    client.setName(newClient.getName());
    client.setTown(newClient.getTown());
    client.setStreet(newClient.getStreet());
    client.setHouseNumber(newClient.getHouseNumber());
    client.setFlatNumber(newClient.getFlatNumber());
    client.setPostalCode(newClient.getPostalCode());
    client.setProvince(newClient.getProvince());
    client.setCountry(newClient.getCountry());
    client.setPhonenumber(newClient.getPhonenumber());
    client.setPhonenumber2(newClient.getPhonenumber2());
    client.setEmail(newClient.getEmail());
    client.setRegon(newClient.getRegon());
    client.setWww(newClient.getWww());

    final Client updatedClient = repository.save(client);
    return ResponseEntity.ok(updatedClient);
  }

  /**
   * Delete client.
   *
   * @param id the client id
   * @return the responseStatus ok
   * @throws ResourceNotFoundException the exception
   */
  @DeleteMapping("/client/{id}")
  public ResponseEntity<String> deleteClient(@PathVariable Long id) {
//    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//    if (auth != null && auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ADMIN"))) {
    Client client =
      repository
        .findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Client", Long.toString(id), null));
    repository.delete(client);
    return ResponseEntity.ok().body("Client with " + id + " deleted!");
  }
//    return ResponseEntity.status(403).body("Forbidden");
//  }

  /**
   * Check if producer exists by name.
   *
   * @param nip the producer name
   * @return true or false
   */
  @GetMapping("/client")
  public ResponseEntity<Boolean> checkIfClientExists(@RequestParam("nip") String nip) {
    boolean test = repository.existsByNip(nip);
    System.out.println("Clients exists: " + test);
    return ResponseEntity.ok().body(test);
  }

  /**
   * Count all producers.
   *
   * @return Number of producers
   */
  @GetMapping("/client/count")
  public ResponseEntity<Long> countClints() {
    return ResponseEntity.ok().body(repository.count());
  }


  /**
   * Update client helpers range response entity.
   *
   * @param id           the client id
   * @param updateHelper the client details
   * @return the response entity
   * @throws ResourceNotFoundException the resource not found exception
   */
  @PutMapping("/client/{id}/helpers-range")
  public ResponseEntity<Client> updateHelpers(@Valid @RequestBody Client updateHelper, @PathVariable Long id) {
    Client client =
      repository
        .findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Client", Long.toString(id), null));

    client.setHelper_pcv_mEasyTo50(updateHelper.getHelper_pcv_mEasyTo50());
    client.setHelper_pcv_mEasyTo150(updateHelper.getHelper_pcv_mEasyTo150());
    client.setHelper_pcv_mEasyTo500(updateHelper.getHelper_pcv_mEasyTo500());
    client.setHelper_pcv_mEasyAbove500(updateHelper.getHelper_pcv_mEasyAbove500());
    client.setHelper_pcv_mHardTo50(updateHelper.getHelper_pcv_mHardTo50());
    client.setHelper_pcv_mHardTo150(updateHelper.getHelper_pcv_mHardTo150());
    client.setHelper_pcv_mHardTo500(updateHelper.getHelper_pcv_mHardTo500());
    client.setHelper_pcv_mHardAbove500(updateHelper.getHelper_pcv_mHardAbove500());

    client.setHelper_alu_mEasyTo50(updateHelper.getHelper_alu_mEasyTo50());
    client.setHelper_alu_mEasyTo150(updateHelper.getHelper_alu_mEasyTo150());
    client.setHelper_alu_mEasyTo500(updateHelper.getHelper_alu_mEasyTo500());
    client.setHelper_alu_mEasyAbove500(updateHelper.getHelper_alu_mEasyAbove500());
    client.setHelper_alu_mHardTo50(updateHelper.getHelper_alu_mHardTo50());
    client.setHelper_alu_mHardTo150(updateHelper.getHelper_alu_mHardTo150());
    client.setHelper_alu_mHardTo500(updateHelper.getHelper_alu_mHardTo500());
    client.setHelper_alu_mHardAbove500(updateHelper.getHelper_alu_mHardAbove500());

    return ResponseEntity.ok(repository.save(client));
  }

  /**
   * Update client helpers response entity.
   *
   * @param id           the client id
   * @param updateHelper the client details
   * @return the response entity
   * @throws ResourceNotFoundException the resource not found exception
   */
  @PutMapping("/client/{id}/helpers")
  public ResponseEntity<Client> updateHelpersRange(@Valid @RequestBody Client updateHelper, @PathVariable Long id) {
    Client client =
      repository
        .findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Client", Long.toString(id), null));

    client.setHelper_additional(updateHelper.getHelper_additional());
    client.setHelper_cost(updateHelper.getHelper_cost());
    client.setHelper_setUpCost(updateHelper.getHelper_setUpCost());
    client.setHelper_costChangeColor(updateHelper.getHelper_costChangeColor());

    return ResponseEntity.ok(repository.save(client));
  }
}

