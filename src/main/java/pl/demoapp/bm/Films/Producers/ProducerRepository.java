package pl.demoapp.bm.Films.Producers;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProducerRepository extends JpaRepository<Producer, Long> {
  boolean existsByProducerName(String name);
}
