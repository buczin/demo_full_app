package pl.demoapp.bm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import pl.demoapp.bm.Users.UserRepository;

@SpringBootApplication
public class HeraklesApplication {
  public static void main(String[] args) {
    SpringApplication.run(HeraklesApplication.class, args);
  }

}
