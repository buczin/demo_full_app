package pl.demoapp.bm.Users;

import lombok.extern.log4j.Log4j2;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import pl.demoapp.bm.Exeptions.ResourceNotFoundException;
import pl.demoapp.bm.MyCompany.MyCompany;

import javax.servlet.http.HttpSession;
import java.security.Principal;
import java.util.*;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@Log4j2
@RequestMapping("/api")
public class UserController {

  @Autowired
  UserRepository userRepository;

  @GetMapping("/login")
  @ResponseBody
  public UserInfo user(Principal user) {
    log.info("USER - login: " + user);
    Optional<User> tmpuser = userRepository.findByUsername(user.getName());

    return tmpuser.map(UserInfo::new).get();
  }

  @GetMapping("/token")
  @ResponseBody
  public Map<String, String> token(HttpSession session) {
    System.out.println(session);
    return Collections.singletonMap("token", session.getId());
  }

  @GetMapping("/users")
  public ResponseEntity<List<UserInfo>> getUsers() {
    log.info("USER - get list of all");
    List<User> tmpUser = userRepository.findAll();
    List<UserInfo> tmp = tmpUser.stream().map(UserInfo::new).collect(Collectors.toList());
    return ResponseEntity.ok().body(tmp);
  }

  @PostMapping("/user")
  public ResponseEntity<String> addUser(@RequestBody User user) {
    log.info("USER - add new user");
    user.setPassword(new BCryptPasswordEncoder(10).encode(user.getPassword()));
    userRepository.save(user);
    return ResponseEntity.ok().body("USER HAS BEEN ADDED");
  }

  @PutMapping("/user/{id}")
  public ResponseEntity<String> updateUser(@PathVariable Long id, @RequestBody User user) {
    log.info("USER - update user, ID: " + id);
    User updateuser =
      userRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("User", Long.toString(id), null));

    updateuser.setName(user.getName());
    updateuser.setUsername(user.getUsername());
    updateuser.setActive(user.isActive());
    updateuser.setRole(user.getRole());

    updateuser.setCatalogRead(user.isCatalogRead());
    updateuser.setCatalogWrite(user.isCatalogWrite());
    updateuser.setCatalogDelete(user.isCatalogDelete());

    updateuser.setSystemRead(user.isSystemRead());
    updateuser.setSystemWrite(user.isSystemWrite());
    updateuser.setSystemDelete(user.isSystemDelete());

    updateuser.setClientRead(user.isClientRead());
    updateuser.setClientWrite(user.isClientWrite());
    updateuser.setClientDelete(user.isClientDelete());

    updateuser.setFilmRead(user.isFilmRead());
    updateuser.setFilmWrite(user.isFilmWrite());
    updateuser.setFilmDelete(user.isFilmDelete());

    updateuser.setProducerRead(user.isProducerRead());
    updateuser.setProducerWrite(user.isProducerWrite());
    updateuser.setProducerDelete(user.isProducerDelete());

    updateuser.setOfferRead(user.isOfferRead());
    updateuser.setOfferWrite(user.isOfferWrite());
    updateuser.setOfferDelete(user.isOfferDelete());


    updateuser.setProductionRead(user.isProductionRead());
    updateuser.setProductionWrite(user.isProductionWrite());
    updateuser.setProductionDelete(user.isProductionDelete());


    userRepository.save(updateuser);
    return ResponseEntity.ok().body("USER UPDATE");
  }

  @DeleteMapping("/user/{id}")
  public ResponseEntity<String> deleteUser(@PathVariable Long id) {
    log.info("USER - delete user, ID: " + id);
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    if (auth != null && auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ADMIN"))) {
      User deleteuser = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", Long.toString(id), null));
      userRepository.delete(deleteuser);
      return ResponseEntity.ok().body("Userm with " + id + " deleted!");
    }
    return ResponseEntity.status(403).body("Forbidden");
  }

  @PutMapping("/user/pass/{id}")
  public ResponseEntity<String> changePass(@PathVariable Long id, @RequestBody Map<String, String> user) {
    log.info("USER - change password, ID: " + id);
    userRepository.findById(id)
      .map(user1 -> {
        user1.setPassword(new BCryptPasswordEncoder(10).encode(user.get("password")));
        return userRepository.save(user1);
      })
      .orElseThrow(() -> new ResourceNotFoundException("User", Long.toString(id), null));
    return ResponseEntity.ok().body("USER UPDATE");
  }
}
