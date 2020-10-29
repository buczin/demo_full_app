package pl.demoapp.bm.Offers.OfferPosition;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OfferPositionRepository extends JpaRepository<OfferPosition, Long> {


  Optional<List<OfferPosition>> findAllByOffer(String id);

  List<OfferPosition> findAllByOfferOfferNumber(String id);
}
