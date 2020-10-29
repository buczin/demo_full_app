package pl.demoapp.bm.Security.Config;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import pl.demoapp.bm.Users.User;
import pl.demoapp.bm.Users.UserRepository;

import java.util.Optional;

@Service
@Log4j2
public class MyUserDetailsService implements UserDetailsService {

  @Autowired
  UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Optional<User> user = userRepository.findByUsername(username);
    user.orElseThrow(() -> new UsernameNotFoundException("Not found: " + username));
    log.info("Load User " + user);
    return user.map(MyUserDetails::new).get();
  }
}
