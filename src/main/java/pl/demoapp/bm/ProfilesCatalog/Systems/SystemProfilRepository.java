package pl.demoapp.bm.ProfilesCatalog.Systems;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SystemProfilRepository extends JpaRepository<SystemProfil, Long> {
  List<SystemProfil> findAllByOrderByNameAsc();

  boolean existsByName(String name);

  Optional<SystemProfil> findByName(String name);
}
