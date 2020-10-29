package pl.demoapp.bm.ProfilesCatalog.Profiles;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.demoapp.bm.ProfilesCatalog.Systems.SystemProfil;

import java.util.List;

public interface ProfileDetailsRepository extends JpaRepository<ProfileDetails, Long> {
  List<ProfileDetails> findAllBySystemProfil(SystemProfil system);

  boolean existsByNumber(String number);
}
