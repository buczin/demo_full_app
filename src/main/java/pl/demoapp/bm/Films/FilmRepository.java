package pl.demoapp.bm.Films;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FilmRepository extends JpaRepository<Film, Long> {

  Film findByName(String name);

  boolean existsByNumber(String number);
}
