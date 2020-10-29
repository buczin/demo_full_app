package pl.demoapp.bm.Offers.OfferMessages;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.demoapp.bm.Offers.OfferPosition.OfferPosition;

import java.util.List;
import java.util.Optional;

public interface OfferNotesRepository extends JpaRepository<OfferNotes, Long> {
  List<OfferNotes> findAllByOfferOfferNumber(String id);
}
