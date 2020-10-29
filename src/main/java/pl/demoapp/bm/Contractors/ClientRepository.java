package pl.demoapp.bm.Contractors;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClientRepository extends JpaRepository<Client, Long> {
  List<Client> findAllByOrderByNameAsc();

  boolean existsByNip(String nip);
}
